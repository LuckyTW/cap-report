"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { GrowthSnapshot } from "@/types/intern";
import { format } from "date-fns";

interface LineChartProps {
  /**
   * 성장 이력 데이터
   */
  data: GrowthSnapshot[];
  /**
   * 차트 크기
   */
  size?: "sm" | "md" | "lg";
  /**
   * 표시할 데이터 종류
   */
  dataType?: "overall" | "all";
}

/**
 * 성장 추이 라인 차트 컴포넌트
 * 주차별 역량 점수 변화 시각화
 */
export function LineChart({
  data,
  size = "md",
  dataType = "overall",
}: LineChartProps) {
  // 크기별 높이 설정
  const heights = {
    sm: 250,
    md: 350,
    lg: 450,
  };

  // 차트 데이터 포맷 변환
  const chartData = data.map((snapshot) => {
    if (dataType === "overall") {
      return {
        주차: `${snapshot.week}주차`,
        날짜: format(snapshot.date, "MM/dd"),
        점수: snapshot.overallScore,
      };
    }

    // 모든 역량 표시
    const skillsData: Record<string, number | string> = {
      주차: `${snapshot.week}주차`,
      날짜: format(snapshot.date, "MM/dd"),
    };

    snapshot.skills.forEach((skill) => {
      skillsData[skill.category] = skill.score;
    });

    return skillsData;
  });

  return (
    <ResponsiveContainer width="100%" height={heights[size]}>
      <RechartsLineChart data={chartData}>
        {/* 그라데이션 정의 */}
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.65 0.22 41.12)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="oklch(0.65 0.22 41.12)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--border))"
          strokeOpacity={0.3}
          vertical={false}
        />
        <XAxis
          dataKey="주차"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={{ strokeWidth: 1.5 }}
        />
        <YAxis
          domain={[0, 100]}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={{ strokeWidth: 1.5 }}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
            color: "hsl(var(--popover-foreground))",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          labelStyle={{
            color: "hsl(var(--foreground))",
            fontWeight: 600,
          }}
          animationDuration={200}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
          }}
        />

        {dataType === "overall" ? (
          <>
            <Area
              type="monotone"
              dataKey="점수"
              stroke="none"
              fill="url(#lineGradient)"
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="점수"
              stroke="oklch(0.65 0.22 41.12)"
              strokeWidth={3}
              dot={{
                fill: "oklch(0.65 0.22 41.12)",
                r: 5,
                strokeWidth: 2,
                stroke: "#ffffff"
              }}
              activeDot={{
                r: 8,
                strokeWidth: 2,
                fill: "oklch(0.65 0.22 41.12)",
                stroke: "#ffffff"
              }}
              animationBegin={300}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
          </>
        ) : (
          <>
            <Line
              type="monotone"
              dataKey="technical"
              stroke="oklch(0.65 0.22 41)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "oklch(0.65 0.22 41)",
                strokeWidth: 1.5,
                stroke: "hsl(var(--background))"
              }}
              activeDot={{ r: 6 }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="project"
              stroke="oklch(0.75 0.18 45)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "oklch(0.75 0.18 45)",
                strokeWidth: 1.5,
                stroke: "hsl(var(--background))"
              }}
              activeDot={{ r: 6 }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="collaboration"
              stroke="oklch(0.55 0.25 38)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "oklch(0.55 0.25 38)",
                strokeWidth: 1.5,
                stroke: "hsl(var(--background))"
              }}
              activeDot={{ r: 6 }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="communication"
              stroke="oklch(0.70 0.20 43)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "oklch(0.70 0.20 43)",
                strokeWidth: 1.5,
                stroke: "hsl(var(--background))"
              }}
              activeDot={{ r: 6 }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="problemSolving"
              stroke="oklch(0.60 0.24 40)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "oklch(0.60 0.24 40)",
                strokeWidth: 1.5,
                stroke: "hsl(var(--background))"
              }}
              activeDot={{ r: 6 }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="learning"
              stroke="oklch(0.80 0.15 47)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "oklch(0.80 0.15 47)",
                strokeWidth: 1.5,
                stroke: "hsl(var(--background))"
              }}
              activeDot={{ r: 6 }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="creativity"
              stroke="oklch(0.50 0.26 36)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "oklch(0.50 0.26 36)",
                strokeWidth: 1.5,
                stroke: "hsl(var(--background))"
              }}
              activeDot={{ r: 6 }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="professionalism"
              stroke="oklch(0.68 0.21 42)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "oklch(0.68 0.21 42)",
                strokeWidth: 1.5,
                stroke: "hsl(var(--background))"
              }}
              activeDot={{ r: 6 }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
          </>
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
