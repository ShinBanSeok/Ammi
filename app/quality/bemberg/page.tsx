'use client';

import Container from '@/components/Container';
import SubPageSidebar from '@/components/SubPageSidebar';
import { useState } from 'react';

interface VideoCardProps {
  src: string;
  title: string;
  description: string[];
}

function VideoCard({ src, title, description }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = (videoElement: HTMLVideoElement) => {
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-full max-w-sm rounded-lg overflow-hidden shadow-md mb-4 cursor-pointer"
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

export default function BembergPage() {
  return (
    <Container>
      <div className="flex gap-8 py-4 md:py-20">
        <SubPageSidebar />
        <main className="flex-1">
          <h1 className="block md:hidden text-2xl sm:text-3xl font-extrabold text-center mb-10 uppercase tracking-wider">
            BEMBERG
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-8">
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
