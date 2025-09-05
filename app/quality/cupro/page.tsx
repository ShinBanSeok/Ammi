'use client';

import Container from '@/components/Container';
import SubPageSidebar from '@/components/SubPageSidebar';
import { useState, useEffect, useRef } from 'react';

interface VideoCardProps {
  src: string;
  title: string;
  description: string[];
}

function VideoCard({ src, title, description }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePlayPause = (videoElement: HTMLVideoElement) => {
    if (videoElement.paused) {
      videoElement.play().catch(() => {
        // 재생 실패 시 음소거 후 재시도
        videoElement.muted = true;
        videoElement.play();
      });
      setIsPlaying(true);
      // 재생 시작하면 2초 후 컨트롤 숨기기
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    } else {
      videoElement.pause();
      setIsPlaying(false);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      setShowControls(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const currentPos = { x: e.clientX, y: e.clientY };
    const distance = Math.sqrt(
      Math.pow(currentPos.x - lastMousePos.current.x, 2) +
        Math.pow(currentPos.y - lastMousePos.current.y, 2)
    );

    if (distance > 5) {
      setShowControls(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    }

    lastMousePos.current = currentPos;
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setShowControls(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setShowControls(false);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleScroll = () => {
      const scrollContainer = card.closest('.overflow-x-auto');
      if (!scrollContainer) return;

      const containerRect = scrollContainer.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      // 카드의 중앙점이 컨테이너 중앙에서 얼마나 떨어져 있는지 계산
      const containerCenter = containerRect.left + containerRect.width / 2;
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distanceFromCenter = Math.abs(containerCenter - cardCenter);
      const maxDistance = containerRect.width / 2;

      // 거리에 따른 opacity와 scale 계산 (중앙에 가까울수록 1에 가까워짐)
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
      const opacity = Math.max(0.4, 1 - normalizedDistance * 0.6);
      const scale = Math.max(0.85, 1 - normalizedDistance * 0.15);

      card.style.transform = `scale(${scale})`;
      card.style.opacity = `${opacity}`;
    };

    const scrollContainer = card.closest('.overflow-x-auto');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // 초기 상태 설정

      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center flex-shrink-0 w-[250px] md:w-auto transition-all duration-500 ease-out"
      style={{ scrollSnapAlign: 'center' }}
    >
      <div
        className="relative w-full md:max-w-sm rounded-lg overflow-hidden shadow-lg mb-4 cursor-pointer transition-all duration-500 hover:shadow-xl"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          const video = e.currentTarget.querySelector(
            'video'
          ) as HTMLVideoElement;
          if (video) {
            // 모바일에서는 단순히 재생/정지만
            handlePlayPause(video);

            // 데스크탑에서만 컨트롤 표시 로직 실행
            const isMobile = window.innerWidth < 768;
            if (!isMobile) {
              setShowControls(true);
              if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
              }
              hideTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
              }, 1000);
            }
          }
        }}
      >
        <video
          ref={videoRef}
          className="w-full"
          preload="auto"
          playsInline
          muted
          style={
            {
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              objectFit: 'contain',
            } as React.CSSProperties
          }
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onCanPlay={() => {
            // 재생 가능할 때 첫 프레임 강제 표시
            const video = videoRef.current;
            if (video && video.readyState >= 2) {
              video.currentTime = 0;
            }
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Mobile Only - Tap to Play Hint */}
        <div className="md:hidden absolute inset-0 flex items-end justify-center  pointer-events-none">
          <div
            className={`bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs transition-opacity duration-500 ${
              !isPlaying ? 'opacity-70' : 'opacity-0'
            }`}
          >
            탭하여 재생
          </div>
        </div>

        {/* Desktop Only - Custom Play Button Overlay */}
        <div
          className={`hidden md:block absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            pointerEvents: showControls || !isPlaying ? 'auto' : 'none',
          }}
        >
          {/* Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                const video = videoRef.current;
                if (video) handlePlayPause(video);
              }}
            >
              {isPlaying ? (
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m7 4 13 8-13 8V4z" />
                </svg>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-30">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        {description.map((desc, index) => (
          <p key={index} className="text-gray-700">
            {desc}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function CuproPage() {
  return (
    <Container>
      <div className="flex gap-8 py-4 md:py-20">
        <SubPageSidebar />
        <main className="flex-1">
          <h1 className="block md:hidden text-2xl sm:text-3xl font-extrabold text-center mb-10 uppercase tracking-wider">
            CUPRO
          </h1>

          {/* Mobile: Premium carousel with side previews */}
          <div className="md:hidden mt-8 -mx-4">
            <div
              className="overflow-x-auto scrollbar-hide w-screen"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <div className="flex gap-6">
                {/* 왼쪽 여백 */}
                <div className="w-12 flex-shrink-0"></div>

                <VideoCard
                  src="/video/ak3000.mp4"
                  title="AK3000"
                  description={['CUPRO 100', '48인치']}
                />
                <VideoCard
                  src="/video/ak2000.mp4"
                  title="AK2000"
                  description={['CUPRO 100', '48인치']}
                />
                <VideoCard
                  src="/video/ak1000.mp4"
                  title="AK1000"
                  description={['CUPRO 100', '48인치']}
                />

                {/* 오른쪽 여백 */}
                <div className="w-32 flex-shrink-0"></div>
              </div>
            </div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-20 mt-8">
            <VideoCard
              src="/video/ak3000.mp4"
              title="AK3000"
              description={['CUPRO 100', '48인치']}
            />
            <VideoCard
              src="/video/ak2000.mp4"
              title="AK2000"
              description={['CUPRO 100', '48인치']}
            />
            <VideoCard
              src="/video/ak1000.mp4"
              title="AK1000"
              description={['CUPRO 100', '48인치']}
            />
          </div>
        </main>
      </div>
    </Container>
  );
}
