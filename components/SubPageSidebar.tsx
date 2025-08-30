'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/site.config';

export default function SubPageSidebar() {
  const pathname = usePathname();
  
  // Extract section from pathname (e.g., "/company/culture" -> "company")
  const section = pathname.split('/')[1];
  
  // Get navigation data for current section
  const navData = NAV[section as keyof typeof NAV];
  
  if (!navData) return null;

  return (
    <div className="w-48 flex-shrink-0">
      <div className="sticky top-24">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {navData.label}
        </h3>
        <hr className="border-gray-300 mb-4" />
        <nav className="space-y-2">
          {navData.children.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-sm transition-colors hover:text-gray-900 ${
                  isActive 
                    ? 'font-bold text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}