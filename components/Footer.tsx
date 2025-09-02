import Container from './Container';
import { SITE_INFO } from '@/lib/site.config';

export default function Footer() {
  const { companyName, ceo, address, phone, bizRegNo, copyright } = SITE_INFO;

  return (
    <footer className="my-3 md:my-0 bg-white border-t border-black/10">
      <Container>
        <div className="flex flex-wrap items-center py-4 md:py-8 text-xs md:text-sm leading-5 md:leading-6 text-gray-600">
          <div className="pr-3 md:pr-6 mb-1 md:mb-0">회사명: {companyName}</div>
          <div className="border-r border-gray-400 h-3 hidden md:block"></div>
          <div className="px-3 md:px-6 mb-1 md:mb-0">대표자: {ceo}</div>
          <div className="border-r border-gray-400 h-3 hidden md:block"></div>
          <div className="px-0 md:px-6 mb-1 md:mb-0">주소: {address.main}</div>
          <div className="border-r border-gray-400 h-3 hidden md:block"></div>
          <div className="px-0 md:px-6 mb-1 md:mb-0">전화번호: {phone}</div>
          <div className="border-r border-gray-400 h-3 hidden md:block"></div>
          <div className="pl-3 md:pl-6 mb-1 md:mb-0">
            사업자등록번호: {bizRegNo}
          </div>
          <div className="w-full mt-2 text-gray-500 text-xs">{copyright}</div>
        </div>
      </Container>
    </footer>
  );
}
