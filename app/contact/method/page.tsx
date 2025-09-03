import Container from '@/components/Container';
import SubPageSidebar from '@/components/SubPageSidebar';
import { SITE_INFO } from '@/lib/site.config';
import Image from 'next/image';

export default function MethodPage() {
  return (
    <Container>
      <div className="flex gap-8 py-4 md:py-20">
        <SubPageSidebar />
        <main className="flex-1">
          <h1 className="block md:hidden text-2xl sm:text-3xl font-extrabold text-center mb-10 uppercase tracking-wider">
            METHOD
          </h1>
          <div className="max-w-3xl">
            <div className="space-y-16">
              {/* 이메일 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-brand-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      E-mail
                    </h2>
                    <p className="text-gray-600 mb-3">
                      이메일을 통해 언제든지 연락 주세요.
                    </p>
                    <a
                      href={`mailto:${SITE_INFO.email}`} // mailto를 통해 이메일 연동
                      className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
                    >
                      {SITE_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* 전화번호 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-brand-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Tel
                    </h2>
                    <p className="text-gray-600 mb-3">
                      평일 오전 9시부터 오후 6시까지 연락 가능합니다.
                    </p>
                    <a
                      href={`tel:${SITE_INFO.phone}`} // tel을 통해 전화 연동
                      className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
                    >
                      {SITE_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* 인스타그램 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                    <Image
                      src="/images/icons/insta_free.png"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Instagram
                    </h2>
                    <p className="text-gray-600 mb-3">
                      최신 소식과 제품 정보를 인스타그램에서 확인하세요.
                    </p>
                    <a
                      href={SITE_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors"
                    >
                      @ammi_ltd
                    </a>
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
