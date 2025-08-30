import Container from './Container';
import { SITE_INFO } from '@/lib/site.config';

export default function Footer() {
  const { companyName, ceo, address, phone, bizRegNo, copyright } = SITE_INFO;

  return (
    <footer className="bg-white">
      <Container>
        <div className="flex flex-wrap gap-11 py-8 text-[14px] leading-6 text-gray-600">
          <div>회사명: {companyName}</div>
          <div>대표자: {ceo}</div>
          <div>주소: {address}</div>
          <div>전화번호: {phone}</div>
          <div>사업자등록번호: {bizRegNo}</div>
          <div className="w-full mt-1 text-gray-500">{copyright}</div>
        </div>
      </Container>
    </footer>
  );
}
