import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '(주)암미',
  description: 'Modern corporate website (Next.js + TypeScript)',
  other: {
    'naver-site-verification': '19c31a55dd6e7636a32bc812f5bd53d2f',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="main-padding">{children}</main>
        <Footer />
      </body>
    </html>
  );
}