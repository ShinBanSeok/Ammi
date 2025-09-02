'use client';

import Link from 'next/link';
import { NAV } from '@/lib/site.config';
import { useState } from 'react';

type MenuKey = keyof typeof NAV;

export default function Nav() {
  const [open, setOpen] = useState<MenuKey | null>(null);

  const menus = Object.keys(NAV) as MenuKey[];

  return (
    <nav className="relative">
      <ul className="flex items-center gap-4 md:gap-6 lg:gap-10 text-sm md:text-base lg:text-lg uppercase tracking-wider">
        {menus.map((k) => {
          const item = NAV[k];
          return (
            <li
              key={k}
              className="group relative"
              onMouseEnter={() => setOpen(k)}
              onMouseLeave={() => setOpen((prev) => (prev === k ? null : prev))}
            >
              <button className="cursor-pointer select-none py-1 transition-colors hover:text-gray-600">
                {item.label}
              </button>

              {/* 드롭다운 */}
              <div
                className={`pointer-events-auto absolute mt-2 min-w-[180px] rounded-xl border border-black/10 bg-white p-2 shadow-lg transition-opacity duration-200 ${
                  open === k ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <ul className="flex flex-col">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        className="block rounded-lg px-4 py-1 text-xs md:text-sm capitalize hover:bg-gray-50"
                        href={c.href}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
