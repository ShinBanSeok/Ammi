'use client';

import Link from 'next/link';
import { NAV } from '@/lib/site.config';
import { useState } from 'react';

type MenuKey = keyof typeof NAV;

export default function Nav() {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<MenuKey | null>(
    null
  );

  const menus = Object.keys(NAV) as MenuKey[];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSubmenuOpen(null);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="relative hidden md:block">
        <ul className="flex items-center gap-4 md:gap-6 lg:gap-10 text-sm md:text-base lg:text-lg uppercase tracking-wider">
          {menus.map((k) => {
            const item = NAV[k];
            return (
              <li
                key={k}
                className="group relative"
                onMouseEnter={() => setOpen(k)}
                onMouseLeave={() =>
                  setOpen((prev) => (prev === k ? null : prev))
                }
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

      {/* Mobile Hamburger Icon */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <span className="w-6 h-0.5 bg-black transition-all duration-300"></span>
        <span className="w-6 h-0.5 bg-black transition-all duration-300"></span>
        <span className="w-6 h-0.5 bg-black transition-all duration-300"></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Background overlay - covers entire screen */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMobileMenu}
        ></div>

        {/* Menu content - slides from left, covers 4/5 of screen */}
        <div
          className={`fixed top-0 left-0 h-full w-4/5 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-60 opacity-100 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header with close button */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <span className="text-xl font-bold">MENU</span>
            <button
              onClick={closeMobileMenu}
              className="w-8 h-8 flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <div className="px-6 py-4">
            {menus.map((k) => {
              const item = NAV[k];
              const isSubmenuOpen = mobileSubmenuOpen === k;

              return (
                <div
                  key={k}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <button
                    className="w-full py-4 text-left flex justify-between items-center text-lg font-semibold uppercase tracking-wider"
                    onClick={() =>
                      setMobileSubmenuOpen(isSubmenuOpen ? null : k)
                    }
                  >
                    {item.label}
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isSubmenuOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isSubmenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
                    }`}
                  >
                    <ul className="pl-4 space-y-2">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            className="block py-2 text-gray-600 capitalize text-base hover:text-black"
                            href={c.href}
                            onClick={closeMobileMenu}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
