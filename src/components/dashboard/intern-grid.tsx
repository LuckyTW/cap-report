import { InternCard } from "./intern-card";
import type { Intern } from "@/types/intern";

interface InternGridProps {
  /**
   * 인턴 목록
   */
  interns: Intern[];
}

/**
 * 인턴 카드 그리드 레이아웃
 * 반응형 그리드: 1열(모바일) → 2열(태블릿) → 3열(데스크탑) → 4열(대형 화면)
 */
export function InternGrid({ interns }: InternGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {interns.map((intern) => {
        // 이전 주차와 현재 점수 차이 계산
        const latestSnapshot = intern.growthHistory[intern.growthHistory.length - 1];
        const previousSnapshot = intern.growthHistory[intern.growthHistory.length - 2];
        const scoreChange = previousSnapshot
          ? latestSnapshot.overallScore - previousSnapshot.overallScore
          : 0;

        return (
          <InternCard
            key={intern.id}
            intern={{
              id: intern.id,
              name: intern.name,
              avatarUrl: intern.avatarUrl,
              position: intern.position,
              overallScore: intern.overallScore,
              cohort: intern.cohort,
            }}
            scoreChange={scoreChange}
          />
        );
      })}
    </div>
  );
}
