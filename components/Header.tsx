'use client';

import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[80px] border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto text-4xl flex h-full max-w-[1400px] items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center font-medium gap-3 px-24"
          aria-label="Go to home"
        >
          Ammi
          {/* <Image
            src="/images/logo.svg"
            alt="AMMI Logo"
            width={120}
            height={28}
            priority
          /> */}
        </Link>
        <Nav />
      </div>
    </header>
  );
}
