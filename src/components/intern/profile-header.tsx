import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Mail, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import type { Intern } from "@/types/intern";
import { POSITIONS } from "@/lib/mock-data";

interface ProfileHeaderProps {
  /**
   * 인턴 정보
   */
  intern: Intern;
}

/**
 * 인턴 프로필 헤더 컴포넌트
 * 인턴 상세 페이지 상단의 프로필 정보 표시
 */
export function ProfileHeader({ intern }: ProfileHeaderProps) {
  const positionMeta = POSITIONS.find((p) => p.key === intern.position);

  // 주간 성장률 계산
  const latestSnapshot = intern.growthHistory[intern.growthHistory.length - 1];
  const previousSnapshot = intern.growthHistory[intern.growthHistory.length - 2];
  const weeklyGrowth = previousSnapshot
    ? ((latestSnapshot.overallScore - previousSnapshot.overallScore) /
        previousSnapshot.overallScore) *
      100
    : 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* 아바타 */}
          <Avatar className="h-24 w-24 md:h-32 md:w-32 transition-all duration-500 hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:ring-4 hover:ring-likelion-primary/30">
            <AvatarImage src={intern.avatarUrl} alt={intern.name} />
            <AvatarFallback className="bg-likelion-primary/10 text-3xl text-likelion-primary">
              {intern.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* 기본 정보 */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {intern.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className={positionMeta?.color}>
                  {positionMeta?.name}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    입사: {format(intern.startDate, "yyyy년 MM월 dd일")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a
                href={`mailto:${intern.email}`}
                className="hover:text-likelion-primary"
              >
                {intern.email}
              </a>
            </div>
          </div>

          {/* 점수 및 통계 */}
          <div className="flex gap-6 md:flex-col md:items-end">
            <div className="text-center md:text-right">
              <div className="text-5xl font-bold text-likelion-primary">
                {intern.overallScore}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                전체 점수
              </div>
            </div>

            {weeklyGrowth !== 0 && (
              <div className="text-center md:text-right">
                <div
                  className={`flex items-center gap-1 text-xl font-semibold ${
                    weeklyGrowth > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>
                    {weeklyGrowth > 0 && "+"}
                    {weeklyGrowth.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  주간 성장률
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
