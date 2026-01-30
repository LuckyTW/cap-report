import type { SiteConfig, NavConfig, FooterLinkGroup } from "@/types";

/**
 * 사이트 기본 설정
 * 멋쟁이사자처럼 인턴 역량 리포트 시스템
 */
export const siteConfig: SiteConfig = {
  name: "멋쟁이사자처럼 역량 성장 리포트",
  description: "인턴의 역량 성장을 측정하고 트래킹하는 멋쟁이사자처럼 인턴 역량 리포트 시스템",
  url: "https://likelion.net",
  ogImage: "https://likelion.net/og.jpg",
  links: {
    github: "https://github.com/likelion",
    twitter: "https://twitter.com/likelion",
  },
};

/**
 * 네비게이션 설정
 */
export const navConfig: NavConfig = {
  mainNav: [],
};

/**
 * 푸터 링크 그룹 설정
 */
export const footerLinks: FooterLinkGroup[] = [
  {
    title: "멋쟁이사자처럼",
    links: [
      { title: "소개", href: "https://likelion.net/about" },
      { title: "프로그램", href: "https://likelion.net/programs" },
    ],
  },
  {
    title: "리소스",
    links: [
      { title: "블로그", href: "https://likelion.net/blog" },
      { title: "커뮤니티", href: "https://likelion.net/community" },
    ],
  },
  {
    title: "지원",
    links: [
      { title: "FAQ", href: "#" },
      { title: "문의하기", href: "#" },
    ],
  },
  {
    title: "법적 고지",
    links: [
      { title: "개인정보처리방침", href: "#" },
      { title: "이용약관", href: "#" },
    ],
  },
];
