/**
 * 인턴 역량 리포트 시스템 타입 정의
 * 멋쟁이사자처럼 인턴 성장 추적을 위한 데이터 모델
 */

/**
 * 역량 카테고리
 * 8개 핵심 역량 영역 정의
 */
export type SkillCategory =
  | "technical" // 기술 스킬
  | "project" // 프로젝트 수행
  | "collaboration" // 협업
  | "communication" // 커뮤니케이션
  | "problemSolving" // 문제 해결
  | "learning" // 학습 능력
  | "creativity" // 창의성
  | "professionalism"; // 전문성

/**
 * 역량 카테고리 메타데이터
 * 각 역량의 표시명과 설명
 */
export interface SkillCategoryMeta {
  key: SkillCategory;
  name: string;
  description: string;
}

/**
 * 역량 점수
 * 각 역량 영역의 점수와 추세 정보
 */
export interface SkillScore {
  category: SkillCategory;
  score: number; // 0-100
  previousScore?: number; // 이전 평가 점수
  trend: "up" | "down" | "stable"; // 추세
}

/**
 * 역량 세부 항목
 * 시간별 평가 기록 포함
 */
export interface SkillDetail {
  category: SkillCategory;
  name: string;
  description: string;
  scores: {
    week: number; // 주차
    score: number;
    note?: string; // 평가 메모
  }[];
}

/**
 * 배지 타입
 * 다양한 성취를 나타내는 배지 종류
 */
export type BadgeType =
  | "first_project" // 첫 프로젝트 완수
  | "team_player" // 팀 플레이어
  | "fast_learner" // 빠른 학습자
  | "code_master" // 코드 마스터
  | "design_wizard" // 디자인 위저드
  | "perfect_attendance" // 완벽한 출석
  | "mentor_choice" // 멘토의 선택
  | "problem_solver" // 문제 해결사
  | "creative_thinker" // 창의적 사고자
  | "communication_pro"; // 커뮤니케이션 전문가

/**
 * 배지 희귀도
 */
export type BadgeRarity = "common" | "rare" | "epic" | "legendary";

/**
 * 배지
 * 인턴의 성취를 나타내는 배지 정보
 */
export interface Badge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  iconUrl: string; // 배지 아이콘 경로
  earnedAt?: Date; // 획득일 (undefined면 미획득)
  rarity: BadgeRarity;
}

/**
 * 마일스톤
 * 목표 달성 진행 상황
 */
export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetValue: number; // 목표치
  currentValue: number; // 현재 진행도
  unit: string; // 단위 (예: '개', '시간', '점')
  category: SkillCategory;
  deadline?: Date;
  completedAt?: Date;
}

/**
 * 피드백
 * 멘토가 남긴 피드백 정보
 */
export interface Feedback {
  id: string;
  mentorName: string;
  mentorAvatar?: string;
  content: string;
  category: SkillCategory;
  rating: number; // 1-5
  createdAt: Date;
}

/**
 * 성장 스냅샷
 * 특정 시점의 역량 상태 기록
 */
export interface GrowthSnapshot {
  week: number; // 주차
  date: Date;
  overallScore: number; // 전체 평균 점수
  skills: SkillScore[];
  achievements: string[]; // 해당 주에 달성한 것들
}

/**
 * 직무 타입
 */
export type Position = "designer" | "frontend" | "backend" | "pm";

/**
 * 직무 메타데이터
 */
export interface PositionMeta {
  key: Position;
  name: string;
  color: string; // Tailwind 클래스
}

/**
 * 인턴 정보
 * 인턴의 전체 프로필 및 성장 데이터
 */
export interface Intern {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  position: Position; // 직무
  cohort: number; // 기수 (예: 12)
  startDate: Date;

  // 현재 역량 상태
  currentSkills: SkillScore[];
  overallScore: number; // 전체 평균 점수 (0-100)

  // 성장 이력
  growthHistory: GrowthSnapshot[];

  // 배지 & 마일스톤
  badges: Badge[];
  milestones: Milestone[];

  // 피드백
  feedbacks: Feedback[];

  // 메타 정보
  lastUpdated: Date;
}

/**
 * 팀 통계
 * 전체 인턴 팀의 통계 정보
 */
export interface TeamAnalytics {
  totalInterns: number;
  averageScore: number;
  topPerformers: Pick<
    Intern,
    "id" | "name" | "avatarUrl" | "overallScore" | "position"
  >[];
  skillAverages: SkillScore[];
  weeklyGrowthRate: number; // %
}

/**
 * 필터 옵션
 * 대시보드 필터링을 위한 옵션
 */
export interface FilterOptions {
  positions: Position[];
  cohorts: number[];
  sortBy: "name" | "score" | "growth";
  sortOrder: "asc" | "desc";
}
