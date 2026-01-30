"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadarChart } from "@/components/charts/radar-chart";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { SkillScore } from "@/types/intern";
import { SKILL_CATEGORIES } from "@/lib/mock-data";

interface SkillOverviewProps {
  /**
   * 현재 역량 점수
   */
  currentSkills: SkillScore[];
  /**
   * 비교 데이터 (예: 이전 주차)
   */
  compareSkills?: SkillScore[];
}

/**
 * 역량 개요 컴포넌트
 * 레이더 차트와 점수 테이블을 함께 표시
 */
export function SkillOverview({
  currentSkills,
  compareSkills,
}: SkillOverviewProps) {
  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 레이더 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>역량 레이더</CardTitle>
        </CardHeader>
        <CardContent>
          <RadarChart
            data={currentSkills}
            compareData={compareSkills}
            compareLabel="이전 주차"
          />
        </CardContent>
      </Card>

      {/* 점수 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>역량별 점수</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>역량</TableHead>
                <TableHead className="text-right">점수</TableHead>
                <TableHead className="text-right">변화</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSkills.map((skill) => {
                const categoryMeta = SKILL_CATEGORIES.find(
                  (c) => c.key === skill.category
                );
                const scoreChange = skill.previousScore
                  ? skill.score - skill.previousScore
                  : 0;

                return (
                  <TableRow key={skill.category}>
                    <TableCell className="font-medium">
                      {categoryMeta?.name || skill.category}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-lg font-semibold">
                        {skill.score}
                      </span>
                      <span className="text-muted-foreground">/100</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {getTrendIcon(skill.trend)}
                        {scoreChange !== 0 && (
                          <span
                            className={`text-sm font-medium ${
                              scoreChange > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {scoreChange > 0 && "+"}
                            {scoreChange}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
