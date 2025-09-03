'use client';

import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[60px] md:h-[80px] md:border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto text-2xl md:text-3xl lg:text-4xl flex h-full max-w-[1400px] items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center font-medium gap-3 px-4 md:px-12 lg:px-24"
          aria-label="Go to home"
        >
          <Image
            src="/images/ammi_logo.png"
            alt="AMMI Logo"
            width={40}
            height={40}
            priority
          />
          Ammi
        </Link>
        <Nav />
      </div>
    </header>
  );
}
