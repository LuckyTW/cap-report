"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProfileHeader } from "@/components/intern/profile-header";
import { SkillOverview } from "@/components/intern/skill-overview";
import { LineChart } from "@/components/charts/line-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInternById } from "@/lib/mock-data";

interface InternPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * 개별 인턴 상세 리포트 페이지
 * 역량 분석, 성장 추이, 배지 & 마일스톤 표시
 */
export default function InternPage({ params }: InternPageProps) {
  const { id } = use(params);
  const intern = getInternById(id);

  if (!intern) {
    notFound();
  }

  // 이전 주차 역량 데이터
  const previousSnapshot =
    intern.growthHistory[intern.growthHistory.length - 2];

  return (
    <Container>
      <Section>
        <div className="space-y-8">
          {/* 프로필 헤더 */}
          <ProfileHeader intern={intern} />

          {/* 탭 네비게이션 */}
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="skills">역량 분석</TabsTrigger>
              <TabsTrigger value="growth">성장 추이</TabsTrigger>
            </TabsList>

            {/* 역량 분석 탭 */}
            <TabsContent value="skills" className="space-y-6">
              <SkillOverview
                currentSkills={intern.currentSkills}
                compareSkills={previousSnapshot?.skills}
              />
            </TabsContent>

            {/* 성장 추이 탭 */}
            <TabsContent value="growth" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>주차별 전체 점수 추이</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart data={intern.growthHistory} dataType="overall" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>주간 성취 내역</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {intern.growthHistory
                      .slice()
                      .reverse()
                      .map((snapshot) => (
                        <div
                          key={snapshot.week}
                          className="border-l-4 border-likelion-primary pl-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">
                              {snapshot.week}주차
                            </div>
                            <div className="text-sm text-muted-foreground">
                              점수: {snapshot.overallScore}
                            </div>
                          </div>
                          <ul className="mt-2 space-y-1">
                            {snapshot.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-muted-foreground"
                              >
                                • {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Section>
    </Container>
  );
}
