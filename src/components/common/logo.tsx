import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** 로고 크기 */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  /** 텍스트 표시 여부 */
  showText?: boolean;
  /** 링크 비활성화 */
  asLink?: boolean;
}

/**
 * 로고 컴포넌트
 * 멋쟁이사자처럼 로고 이미지를 표시합니다. 기본적으로 홈으로 링크됩니다.
 */
export function Logo({
  className,
  size = "md",
  showText = true,
  asLink = true,
}: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 },
    xl: { width: 72, height: 72 },
    "2xl": { width: 96, height: 96 },
    "3xl": { width: 128, height: 128 },
    "4xl": { width: 160, height: 160 },
    "5xl": { width: 200, height: 200 },
  };

  const logoContent = (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/LIKELION LOGO.jpg"
        alt="멋쟁이사자처럼"
        width={sizes[size].width}
        height={sizes[size].height}
        className="rounded transition-transform duration-300 ease-out"
        priority
      />
      {showText && (
        <span className="hidden font-bold sm:inline-block">역량 성장 리포트</span>
      )}
    </div>
  );

  if (!asLink) {
    return logoContent;
  }

  return (
    <Link
      href="/"
      className="transition-all duration-300 hover:scale-105 hover:opacity-90"
    >
      {logoContent}
    </Link>
  );
}
