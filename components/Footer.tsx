import Container from './Container';
import { SITE_INFO } from '@/lib/site.config';

export default function Footer() {
  const { companyName, ceo, address, phone, bizRegNo, copyright } = SITE_INFO;

  return (
    <footer className="my-3 md:my-0 bg-white border-t border-black/10">
      <Container>
        {/* 모바일 전용 3줄 레이아웃 */}
        <div className="block md:hidden py-4 text-xs leading-5 text-gray-600 space-y-2">
          <div className="flex items-center">
            <span className="pr-3">회사명: {companyName}</span>
            <div className="border-r border-gray-400 h-3"></div>
            <span className="px-3">대표자: {ceo}</span>
          </div>
          <div>주소: {address.main}</div>
          <div className="flex items-center">
            <span className="pr-3">전화번호: {phone}</span>
            <div className="border-r border-gray-400 h-3"></div>
            <span className="px-3">사업자등록번호: {bizRegNo}</span>
          </div>
          <div className="mt-4 text-gray-500 text-xs">{copyright}</div>
        </div>

        {/* 데스크톱 기존 레이아웃 */}
        <div className="hidden md:flex flex-wrap items-center py-8 text-sm leading-6 text-gray-600">
          <div className="pr-6">회사명: {companyName}</div>
          <div className="border-r border-gray-400 h-3"></div>
          <div className="px-6">대표자: {ceo}</div>
          <div className="border-r border-gray-400 h-3"></div>
          <div className="px-6">주소: {address.main}</div>
          <div className="border-r border-gray-400 h-3"></div>
          <div className="px-6">전화번호: {phone}</div>
          <div className="border-r border-gray-400 h-3"></div>
          <div className="pl-6">사업자등록번호: {bizRegNo}</div>
          <div className="w-full mt-2 text-gray-500 text-xs">{copyright}</div>
        </div>
      </Container>
    </footer>
  );
}
