'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BACKGROUND_IMAGES = [
  '/images/slide-1.jpg',
  '/images/slide-2.jpg',
  '/images/slide-3.jpg',
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

export default function EntryPage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = () => {
    router.push('/main');
  };

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden z-50">
      {/* Background Images Grid */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1">
        {BACKGROUND_IMAGES.map((src, index) => (
          <div key={index} className="relative overflow-hidden">
            <Image
              src={src}
              alt={`Background ${index + 1}`}
              fill
              className="object-cover"
              priority={index < 3}
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Enter Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={handleEnter}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group border-2 border-white px-8 py-4 bg-transparent text-white font-bold text-2xl tracking-wider overflow-hidden transition-all duration-300 hover:scale-105"
        >
          {/* Animated Fill Effect */}
          <div
            className={`absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out ${
              isHovered ? 'w-full' : 'w-0'
            }`}
          />

          {/* Button Text */}
          <span
            className={`relative z-10 transition-colors duration-300 ${
              isHovered ? 'text-black' : 'text-white'
            }`}
          >
            ENTER
          </span>
        </button>
      </div>
    </div>
  );
}
