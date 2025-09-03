'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EntryPage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = () => {
    router.push('/main');
  };

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden z-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/entry.png"
          alt="Entry Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Enter Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={handleEnter}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group border-2 border-white px-4 py-2 md:px-6 md:py-3 bg-transparent text-white font-medium text-lg md:text-xl lg:text-2xl tracking-wider overflow-hidden transition-all duration-300 hover:scale-105"
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
