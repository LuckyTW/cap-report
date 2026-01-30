import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { StatsCard } from "@/components/dashboard/stats-card";
import { InternGrid } from "@/components/dashboard/intern-grid";
import { Users, TrendingUp, Award } from "lucide-react";
import { mockInterns, getTeamAnalytics } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "인턴 대시보드 | 멋쟁이사자처럼 역량 성장 리포트",
  description: "인턴 역량 성장 현황을 한눈에 확인하세요",
};

/**
 * 메인 대시보드 페이지
 * 인턴 목록 및 팀 KPI 표시
 */
export default function DashboardPage() {
  const teamAnalytics = getTeamAnalytics();

  return (
    <Container>
      <Section>
        <div className="space-y-8">
          {/* 헤더 */}
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              대시보드
            </h1>
            <p className="mt-2 text-muted-foreground">
              멋쟁이사자처럼 인턴들의 성장을 확인하고 관리하세요.
            </p>
          </div>

          {/* 팀 KPI 통계 */}
          <div className="grid gap-4 md:grid-cols-3">
            <StatsCard
              title="전체 인턴"
              value={teamAnalytics.totalInterns}
              description="현재 활동 중인 인턴 수"
              icon={Users}
            />
            <StatsCard
              title="평균 점수"
              value={teamAnalytics.averageScore}
              description="전체 인턴 평균 역량 점수"
              icon={Award}
              change={teamAnalytics.weeklyGrowthRate}
              trend="up"
            />
            <StatsCard
              title="주간 성장률"
              value={`+${teamAnalytics.weeklyGrowthRate}%`}
              description="지난 주 대비 성장률"
              icon={TrendingUp}
              change={2.1}
              trend="up"
            />
          </div>

          {/* 인턴 카드 그리드 */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">인턴 목록</h2>
            <InternGrid interns={mockInterns} />
          </div>
        </div>
      </Section>
    </Container>
  );
}
