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
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = (videoElement: HTMLVideoElement) => {
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
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

      setIsVisible(opacity);
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          const video = e.currentTarget.querySelector(
            'video'
          ) as HTMLVideoElement;
          if (video) handlePlayPause(video);
        }}
      >
        <video
          className="w-full"
          preload="metadata"
          playsInline
          style={
            {
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              objectFit: 'contain',
            } as React.CSSProperties
          }
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Custom Play Button Overlay */}
        {(isHovered || !isPlaying) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200">
              {isPlaying ? (
                <svg
                  className="w-8 h-8 text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-gray-800 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
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
