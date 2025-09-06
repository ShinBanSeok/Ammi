'use client';

import Container from '@/components/Container';
import SubPageSidebar from '@/components/SubPageSidebar';
import { useState, useRef, useEffect } from 'react';

// 모바일 전용 비디오 카드
function MobileVideoCard({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string[];
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center flex-shrink-0 w-[250px] transition-all duration-500 ease-out">
      <div
        className="relative w-full rounded-lg overflow-hidden shadow-lg mb-4 cursor-pointer"
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          className="w-full"
          preload="metadata"
          playsInline
          muted
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* 탭하여 재생 힌트 */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/30 px-2 py-0.5 rounded text-white text-xs mt-24">
              터치하여 재생
            </div>
          </div>
        )}
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

// 데스크탑 전용 비디오 카드
function DesktopVideoCard({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string[];
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    // 마우스가 올라가 있어도 1초 후 자동 숨김
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    // 마우스 움직일 때마다 타이머 재시작
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
    if (video && video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-full max-w-sm rounded-lg overflow-hidden shadow-lg mb-4 cursor-pointer transition-all duration-300 hover:shadow-xl"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handlePlayPause}
      >
        <video
          ref={videoRef}
          className="w-full"
          preload="metadata"
          playsInline
          muted
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* 컨트롤 오버레이 */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* 재생 버튼 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-200">
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

          {/* 진행률 바 */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-30">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
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

// 스크롤 애니메이션을 위한 모바일 카드 래퍼
function MobileVideoCardWithScroll({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string[];
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleScroll = () => {
      const scrollContainer = card.closest('.overflow-x-auto');
      if (!scrollContainer) return;

      const containerRect = scrollContainer.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const containerCenter = containerRect.left + containerRect.width / 2;
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distanceFromCenter = Math.abs(containerCenter - cardCenter);
      const maxDistance = containerRect.width / 2;

      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
      const opacity = Math.max(0.4, 1 - normalizedDistance * 0.6);
      const scale = Math.max(0.85, 1 - normalizedDistance * 0.15);

      card.style.transform = `scale(${scale})`;
      card.style.opacity = `${opacity}`;
    };

    const scrollContainer = card.closest('.overflow-x-auto');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div ref={cardRef} style={{ scrollSnapAlign: 'center' }}>
      <MobileVideoCard src={src} title={title} description={description} />
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

          {/* 모바일: 가로 스크롤 캐러셀 */}
          <div className="md:hidden mt-8 -mx-4">
            <div
              className="overflow-x-auto scrollbar-hide w-screen"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <div className="flex gap-6">
                <div className="w-12 flex-shrink-0" />
                <MobileVideoCardWithScroll
                  src="/video/ak3000.mp4"
                  title="AK3000"
                  description={['CUPRO 100', '48인치']}
                />
                <MobileVideoCardWithScroll
                  src="/video/ak2000.mp4"
                  title="AK2000"
                  description={['CUPRO 100', '48인치']}
                />
                <MobileVideoCardWithScroll
                  src="/video/ak1000.mp4"
                  title="AK1000"
                  description={['CUPRO 100', '48인치']}
                />
                <div className="w-32 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* 데스크탑: 3컬럼 그리드 */}
          <div className="hidden md:grid md:grid-cols-3 gap-20 mt-8">
            <DesktopVideoCard
              src="/video/ak3000.mp4"
              title="AK3000"
              description={['CUPRO 100', '48인치']}
            />
            <DesktopVideoCard
              src="/video/ak2000.mp4"
              title="AK2000"
              description={['CUPRO 100', '48인치']}
            />
            <DesktopVideoCard
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
