import Container from './Container';
import { SITE_INFO } from '@/lib/site.config';

export default function Footer() {
  const { companyName, ceo, address, phone, bizRegNo, copyright } = SITE_INFO;

  return (
    <footer className="bg-white">
      <Container>
        <div className="flex flex-wrap items-center py-8 text-[14px] leading-6 text-gray-600">
          <div className="pr-6">회사명: {companyName}</div>
          <div className="border-r border-gray-400 h-3"></div>
          <div className="px-6">대표자: {ceo}</div>
          <div className="border-r border-gray-400 h-3"></div>
          <div className="px-6">주소: {address}</div>
          <div className="border-r border-gray-400 h-3"></div>
          <div className="px-6">전화번호: {phone}</div>
          <div className="border-r border-gray-400 h-3"></div>
          <div className="pl-6">사업자등록번호: {bizRegNo}</div>
          <div className="w-full mt-2 text-gray-500 text-[10px]">
            {copyright}
          </div>
        </div>
      </Container>
    </footer>
  );
}
