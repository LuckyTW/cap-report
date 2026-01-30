"use client";

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { SkillScore } from "@/types/intern";
import { SKILL_CATEGORIES } from "@/lib/mock-data";

interface RadarChartProps {
  /**
   * 역량 점수 데이터
   */
  data: SkillScore[];
  /**
   * 비교 데이터 (예: 이전 주차, 팀 평균)
   */
  compareData?: SkillScore[];
  /**
   * 차트 크기
   */
  size?: "sm" | "md" | "lg";
  /**
   * 비교 데이터 레이블
   */
  compareLabel?: string;
}

/**
 * 역량 레이더 차트 컴포넌트
 * Recharts를 활용한 8개 역량 시각화
 */
export function RadarChart({
  data,
  compareData,
  size = "md",
  compareLabel = "이전",
}: RadarChartProps) {
  // 크기별 높이 설정
  const heights = {
    sm: 300,
    md: 400,
    lg: 500,
  };

  // 차트 데이터 포맷 변환
  const chartData = data.map((skill) => {
    const categoryMeta = SKILL_CATEGORIES.find((c) => c.key === skill.category);
    const compareScore = compareData?.find((c) => c.category === skill.category);

    return {
      category: categoryMeta?.name || skill.category,
      현재: skill.score,
      ...(compareScore && { [compareLabel]: compareScore.score }),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={heights[size]}>
      <RechartsRadarChart data={chartData}>
        {/* 그라데이션 정의 */}
        <defs>
          <linearGradient id="radarGradientCurrent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.65 0.22 41.12)" stopOpacity={0.9} />
            <stop offset="50%" stopColor="oklch(0.75 0.18 45)" stopOpacity={0.6} />
            <stop offset="100%" stopColor="oklch(0.65 0.22 41.12)" stopOpacity={0.3} />
          </linearGradient>
          <linearGradient id="radarGradientCompare" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.75 0.15 50)" stopOpacity={0.6} />
            <stop offset="100%" stopColor="oklch(0.75 0.15 50)" stopOpacity={0.3} />
          </linearGradient>
        </defs>

        <PolarGrid
          stroke="hsl(var(--border))"
          strokeOpacity={0.5}
          strokeWidth={0.5}
        />
        <PolarAngleAxis
          dataKey="category"
          tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
        />
        <Radar
          name="현재"
          dataKey="현재"
          stroke="oklch(0.65 0.22 41.12)"
          fill="url(#radarGradientCurrent)"
          fillOpacity={1}
          strokeWidth={3}
          animationBegin={0}
          animationDuration={1200}
          animationEasing="ease-in-out"
          dot={{
            fill: "oklch(0.65 0.22 41.12)",
            r: 5,
            strokeWidth: 2,
            stroke: "#ffffff"
          }}
          activeDot={{ r: 7, strokeWidth: 2 }}
        />
        {compareData && (
          <Radar
            name={compareLabel}
            dataKey={compareLabel}
            stroke="oklch(0.75 0.15 50)"
            fill="url(#radarGradientCompare)"
            fillOpacity={1}
            strokeWidth={2.5}
            strokeDasharray="5 5"
            animationBegin={200}
            animationDuration={1200}
            animationEasing="ease-in-out"
            dot={{ fill: "oklch(0.75 0.15 50)", r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
            color: "hsl(var(--popover-foreground))",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          cursor={{
            stroke: "hsl(var(--border))",
            strokeWidth: 1,
            strokeDasharray: "3 3"
          }}
          animationDuration={200}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
          }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
