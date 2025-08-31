import Container from '@/components/Container';
import SubPageSidebar from '@/components/SubPageSidebar';
import NaverMap from '@/components/NaverMap';
import Image from 'next/image';
import { SITE_INFO } from '@/lib/site.config';

export default function LocationPage() {
  const { address } = SITE_INFO;

  return (
    <Container>
      <div className="flex gap-8 py-20">
        <SubPageSidebar />
        <main className="flex-1">
          <div className="space-y-16">
            {/* 지도 영역 - 좌우로 넓게 */}
            <div>
              <div className="aspect-video">
                <NaverMap width="100%" height="100%" />
              </div>
              <p className="mt-2 text-sm text-gray-500 text-center">
                지도를 클릭하면 네이버지도로 이동합니다
              </p>
            </div>

            {/* 정보 영역 - 지도 아래 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-2 space-y-10">
                <div>
                  <h2 className="text-lg font-semibold mb-3">본사</h2>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <span className="font-small">{address.main}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-3">
                    동대문종합시장 사무실
                  </h2>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>
                      <span className="font-small">{address.office}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <h2 className="text-lg font-semibold mb-3">오시는 길</h2>
                <div className="space-y-2 text-gray-700 text-sm">
                  <div>
                    <span className="text-xl">🚆</span> 신당역 4번 출구, 도보
                    6분 / 청구역 2번 출구 도보 8분
                  </div>
                  <div>
                    <span className="text-xl">🚌</span> 142 / 147 / 2233 / 6211
                    / 2012 / 2013 / 2014 / 2015 / 202 / 421 / 463 / 2233 / 7212
                  </div>
                  <div>
                    <span className="text-xl">🚘</span> 건물 기계주차장 이용
                    가능
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Container>
  );
}
