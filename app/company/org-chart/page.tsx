import Container from '@/components/Container';
import SubPageSidebar from '@/components/SubPageSidebar';
import React from 'react';

/**
 * 반응형 SVG 커넥터
 * - 부서 하단 중앙 세로선 + (첫 팀 중앙 ↔ 마지막 팀 중앙) 가로선 + 각 팀 세로선
 * - 팀 n개일 때 각 팀 중앙 x% = ((2*i+1)/(2n))*100
 * - grid는 gap-0으로 두고, 카드 래퍼에 mx로 간격을 줘야 퍼센트 좌표와 정확히 일치합니다.
 */
function GridConnector({
  count,
  meetY = 24, // 부서 세로선이 내려오는 y (px)
  down = 24, // 가로선에서 팀 쪽으로 내려가는 길이 (px)
  stroke = '#9CA3AF',
  strokeWidth = 2, // 선 굵기
}: {
  count: number;
  meetY?: number;
  down?: number;
  stroke?: string;
  strokeWidth?: number;
}) {
  const xs = Array.from(
    { length: count },
    (_, i) => ((2 * i + 1) / (2 * count)) * 100
  );

  return (
    <svg className="w-full" style={{ height: meetY + down }}>
      {/* 부서에서 내려오는 세로선 (중앙) */}
      <line
        x1="50%"
        y1={0}
        x2="50%"
        y2={meetY}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {/* 가로선: 첫 팀 중앙 ~ 마지막 팀 중앙까지만 */}
      <line
        x1={`${xs[0]}%`}
        y1={meetY}
        x2={`${xs[xs.length - 1]}%`}
        y2={meetY}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {/* 팀으로 내려가는 세로선 */}
      {xs.map((x, i) => (
        <line
          key={i}
          x1={`${x}%`}
          y1={meetY}
          x2={`${x}%`}
          y2={meetY + down}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
}

export default function OrgChartPage() {
  // 섹션별 선 높이 (원하면 살짝 조절 가능)
  const meetY2 = 24; // 2팀 섹션
  const meetY3 = 24; // 3팀 섹션 (조금 낮게)

  return (
    <Container>
      <div className="flex gap-8 py-4 md:py-20">
        <SubPageSidebar />
        <main className="flex-1 relative">
          <h1 className="block md:hidden text-2xl sm:text-3xl font-extrabold text-center mb-10 uppercase tracking-wider">
            <div>ORGANIZATIONAL</div>
            <div>CHART</div>
          </h1>
          {/* 조직도 */}
          <div className="relative max-w-full lg:max-w-5xl mx-auto px-4 lg:px-0">
            {/* 좌우 배치 - 모바일에서는 세로 스택 */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-16 justify-start">
              {/* 왼쪽 열: 재경부 / 영업부 / 구매부 */}
              <div className="flex flex-col items-center">
                {/* 재경부 */}
                <div className="bg-blue-900 text-white px-4 py-3 min-w-[180px] text-center rounded-md shadow-lg">
                  <div className="font-bold text-base md:text-lg">재경부</div>
                  <div className="text-xs md:text-sm opacity-80">
                    Finance Department
                  </div>
                </div>
                <div className="w-full max-w-[480px] shrink-0">
                  <GridConnector count={2} meetY={meetY2} down={meetY2 + 10} />
                </div>
                {/* 팀 그리드: gap-0, 각 카드 래퍼에 mx로 간격 부여 */}
                <div className="grid grid-cols-2 gap-0 w-full max-w-[480px] shrink-0 justify-items-center">
                  <div className="relative mx-5">
                    <div className="bg-blue-200 text-blue-900 px-3 py-2 min-w-[120px] text-center rounded shadow">
                      <div className="font-semibold text-sm md:text-base">
                        회계팀
                      </div>
                      <div className="text-xs">accounting</div>
                    </div>
                  </div>
                  <div className="relative mx-5">
                    <div className="bg-blue-200 text-blue-900 px-3 py-2 min-w-[120px] text-center rounded shadow">
                      <div className="font-semibold text-sm md:text-base">
                        재경팀
                      </div>
                      <div className="text-xs">finance</div>
                    </div>
                  </div>
                </div>

                {/* 영업부 */}
                <div className="flex flex-col items-center mt-16 lg:mt-32">
                  <div className="bg-blue-900 text-white px-4 py-3 min-w-[180px] text-center rounded-md shadow-lg">
                    <div className="font-bold text-base md:text-lg">영업부</div>
                    <div className="text-xs md:text-sm opacity-80">
                      Sales Department
                    </div>
                  </div>
                  <div className="w-full max-w-[320px] md:max-w-[560px] shrink-0">
                    <GridConnector
                      count={3}
                      meetY={meetY3}
                      down={meetY3 + 10}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-0 w-full max-w-[320px] md:max-w-[560px] shrink-0 justify-items-center">
                    <div className="relative mx-2 md:mx-5">
                      <div className="bg-blue-200 text-blue-900 px-2 md:px-3 py-2 min-w-[80px] md:min-w-[120px] text-center rounded shadow">
                        <div className="font-semibold text-xs md:text-base">
                          영업 1팀
                        </div>
                        <div className="text-xs">sales team 1</div>
                      </div>
                    </div>
                    <div className="relative mx-2 md:mx-5">
                      <div className="bg-blue-200 text-blue-900 px-2 md:px-3 py-2 min-w-[80px] md:min-w-[120px] text-center rounded shadow">
                        <div className="font-semibold text-xs md:text-base">
                          영업 2팀
                        </div>
                        <div className="text-xs">sales team 2</div>
                      </div>
                    </div>
                    <div className="relative mx-2 md:mx-5">
                      <div className="bg-blue-200 text-blue-900 px-2 md:px-3 py-2 min-w-[80px] md:min-w-[120px] text-center rounded shadow">
                        <div className="font-semibold text-xs md:text-base">
                          영업 3팀
                        </div>
                        <div className="text-xs">sales team 3</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 구매부 */}
                <div className="flex flex-col items-center mt-16 lg:mt-32">
                  <div className="bg-blue-900 text-white px-4 py-3 min-w-[180px] text-center rounded-md shadow-lg">
                    <div className="font-bold text-base md:text-lg">구매부</div>
                    <div className="text-xs md:text-sm opacity-80">
                      Purchasing Department
                    </div>
                  </div>
                  <div className="w-full max-w-[320px] md:max-w-[560px] shrink-0">
                    <GridConnector
                      count={3}
                      meetY={meetY3}
                      down={meetY3 + 10}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-0 w-full max-w-[320px] md:max-w-[560px] shrink-0 justify-items-center">
                    <div className="relative mx-2 md:mx-5">
                      <div className="bg-blue-200 text-blue-900 px-2 md:px-3 py-2 min-w-[80px] md:min-w-[120px] text-center rounded shadow">
                        <div className="font-semibold text-xs md:text-base">
                          구매 1팀
                        </div>
                        <div className="text-xs">purchasing team 1</div>
                      </div>
                    </div>
                    <div className="relative mx-2 md:mx-5">
                      <div className="bg-blue-200 text-blue-900 px-2 md:px-3 py-2 min-w-[80px] md:min-w-[120px] text-center rounded shadow">
                        <div className="font-semibold text-xs md:text-base">
                          구매 2팀
                        </div>
                        <div className="text-xs">purchasing team 2</div>
                      </div>
                    </div>
                    <div className="relative mx-2 md:mx-5">
                      <div className="bg-blue-200 text-blue-900 px-2 md:px-3 py-2 min-w-[80px] md:min-w-[120px] text-center rounded shadow">
                        <div className="font-semibold text-xs md:text-base">
                          구매 3팀
                        </div>
                        <div className="text-xs">purchasing team 3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 오른쪽 열: 자재부 */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-blue-900 text-white px-4 py-3 min-w-[180px] text-center rounded-md shadow-lg">
                  <div className="font-bold text-base md:text-lg">자재부</div>
                  <div className="text-xs md:text-sm opacity-80">
                    Material Department
                  </div>
                </div>
                <div className="w-full max-w-[480px] shrink-0">
                  <GridConnector count={2} meetY={meetY2} down={meetY2 + 10} />
                </div>
                <div className="grid grid-cols-2 gap-0 w-full max-w-[480px] shrink-0 justify-items-center">
                  <div className="relative mx-5">
                    <div className="bg-blue-200 text-blue-900 px-3 py-2 min-w-[120px] text-center rounded shadow">
                      <div className="font-semibold text-sm md:text-base">
                        자재관리팀
                      </div>
                      <div className="text-xs">material management</div>
                    </div>
                  </div>
                  <div className="relative mx-5">
                    <div className="bg-blue-200 text-blue-900 px-3 py-2 min-w-[120px] text-center rounded shadow">
                      <div className="font-semibold text-sm md:text-base">
                        납품팀
                      </div>
                      <div className="text-xs">delivery</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 오른쪽 열 끝 */}
            </div>
          </div>
        </main>
      </div>
    </Container>
  );
}
