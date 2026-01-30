import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 인턴 상세 페이지 로딩 상태
 */
export default function InternLoading() {
  return (
    <Container>
      <Section>
        <div className="space-y-8">
          {/* 헤더 스켈레톤 */}
          <div>
            <Skeleton className="h-12 w-48" />
            <Skeleton className="mt-2 h-6 w-96" />
          </div>

          {/* 프로필 헤더 스켈레톤 */}
          <Skeleton className="h-32 w-full" />

          {/* 탭 영역 스켈레톤 */}
          <Skeleton className="h-96 w-full" />
        </div>
      </Section>
    </Container>
  );
}
