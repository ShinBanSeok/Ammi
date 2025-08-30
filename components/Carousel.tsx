'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Slide = { src: string; alt?: string };

interface Props {
  slides: Slide[];
  autoMs?: number; // 기본 6000ms
  fadeMs?: number; // 기본 3000ms
  showDots?: boolean; // 하단 동그라미
}

export default function Carousel({
  slides,
  autoMs = 6000, // 자동을 슬라이드 넘어가는 시간, 1000당 1초
  fadeMs = 3000, // 슬라이드 넘어갈 때 걸리는 시간, 1000당 1초
  showDots = true,
}: Props) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (to: number) => {
    setIdx((to + slides.length) % slides.length);
  };

  const next = () => go(idx + 1);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(next, autoMs);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, autoMs]);

  return (
    <div className="relative h-[88vh] w-full overflow-hidden">
      {slides.map((s, i) => {
        const active = i === idx;
        return (
          <div
            key={s.src + i}
            className="absolute inset-0"
            aria-hidden={!active}
            style={{
              transition: `opacity ${fadeMs}ms ease`,
              opacity: active ? 1 : 0,
            }}
          >
            <Image
              src={s.src}
              alt={s.alt || `Slide ${i + 1}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        );
      })}

      {/* 중앙 오버레이 타이포(옵션) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h1 className="select-none text-center text-5xl font-extrabold tracking-tight text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:text-7xl">
          Ammi
          <span className="block text-2xl font-semibold md:text-3xl">
            Comfortable lining
          </span>
        </h1>
      </div>

      {/* 점 네비게이션 */}
      {showDots && (
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3">
          {slides.map((_, i) => {
            const active = i === idx;
            return (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-3 w-3 rounded-full border border-white/70 transition-all ${
                  active ? 'bg-white' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
