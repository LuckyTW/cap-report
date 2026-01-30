import Link from "next/link";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Intern } from "@/types/intern";
import { POSITIONS } from "@/lib/mock-data";

interface InternCardProps {
  /**
   * 인턴 정보
   */
  intern: Pick<
    Intern,
    "id" | "name" | "avatarUrl" | "position" | "overallScore" | "cohort"
  >;
  /**
   * 점수 변화 (이전 주차 대비)
   */
  scoreChange?: number;
}

/**
 * 인턴 요약 카드 컴포넌트
 * 대시보드에서 인턴 정보를 간략하게 표시
 */
export function InternCard({ intern, scoreChange = 0 }: InternCardProps) {
  const positionMeta = POSITIONS.find((p) => p.key === intern.position);

  // 추세 아이콘 및 색상
  const getTrendIcon = () => {
    if (scoreChange > 0) {
      return <ArrowUp className="h-4 w-4 text-green-500" />;
    } else if (scoreChange < 0) {
      return <ArrowDown className="h-4 w-4 text-red-500" />;
    } else {
      return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    if (scoreChange > 0) return "text-green-500";
    if (scoreChange < 0) return "text-red-500";
    return "text-muted-foreground";
  };

  return (
    <Link href={`/intern/${intern.id}`}>
      <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 group">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* 아바타 */}
            <Avatar className="h-16 w-16 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-likelion-primary/50">
              <AvatarImage src={intern.avatarUrl} alt={intern.name} />
              <AvatarFallback className="bg-likelion-primary/10 text-likelion-primary">
                {intern.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* 정보 */}
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="font-semibold text-foreground">{intern.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge
                    variant="secondary"
                    className={positionMeta?.color}
                  >
                    {positionMeta?.name}
                  </Badge>
                </div>
              </div>

              {/* 점수 */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-likelion-primary transition-all duration-300 group-hover:scale-105 group-hover:text-shadow-glow">
                    {intern.overallScore}
                  </div>
                  <div className="text-xs text-muted-foreground">전체 점수</div>
                </div>

                {/* 추세 */}
                <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span className="text-sm font-medium">
                    {scoreChange > 0 && "+"}
                    {scoreChange !== 0 && scoreChange}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
