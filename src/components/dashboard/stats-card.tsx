import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus, type LucideIcon } from "lucide-react";

interface StatsCardProps {
  /**
   * 카드 제목
   */
  title: string;
  /**
   * 주요 값
   */
  value: string | number;
  /**
   * 설명 텍스트
   */
  description?: string;
  /**
   * 아이콘
   */
  icon?: LucideIcon;
  /**
   * 변화율 (%)
   */
  change?: number;
  /**
   * 추세 방향
   */
  trend?: "up" | "down" | "neutral";
}

/**
 * KPI 통계 카드 컴포넌트
 * 대시보드 상단에 주요 지표 표시
 */
export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  change,
  trend = "neutral",
}: StatsCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-foreground">{value}</div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="font-medium">
                {change > 0 && "+"}
                {change}%
              </span>
              <span className="text-muted-foreground">지난 주 대비</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
