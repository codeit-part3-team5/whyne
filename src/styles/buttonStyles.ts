/**
 * Button 컴포넌트 스타일 정의
 *
 * 버튼의 크기, 스타일, 모양, 테두리 등을 정의하는 상수들을 포함합니다.
 * 각 타입별로 Record를 사용하여 타입 안전성을 보장합니다.
 */

// ========================
// 타입 정의
// ========================
/** 버튼 크기 타입 */
export type ButtonSize = "xl" | "lg" | "md" | "sm" | "fit";

/** 버튼 스타일 variant 타입 */
export type ButtonVariant = "primary" | "secondary" | "social" | "cancel";

/** 버튼 모서리 스타일 타입 */
export type ButtonRound = "rounded" | "circle" | "square";

/** 버튼 테두리 스타일 타입 */
export type ButtonBorder = "none" | "default";

/** 소셜 로그인 아이콘 타입 */
export type SocialType = "google" | "kakao";

// ========================
// 스타일 상수 정의
// ========================
/**
 * 버튼 크기별 스타일
 * - xl: 대형 버튼 (480px × 64px)
 * - lg: 중형 버튼 (320px × 64px)
 * - md: 중간 버튼 (168px × 50px)
 * - sm: 소형 버튼 (100px × 50px)
 * - fit: 내용에 맞춤 버튼 (패딩만 적용)
 */
export const BUTTON_SIZES: Record<ButtonSize, string> = {
  xl: "w-[25rem] py-[0.875rem]", // 480px × 14px
  lg: "w-[20rem] py-[0.875rem]", // 320px × 14px
  md: "w-[10.5rem] py-[0.625rem]", // 168px × 10px
  sm: "w-[6.25rem] py-[0.625rem]", // 100px × 10px
  fit: "px-[1.25rem] py-[0.3rem]", // 20px × 5px
} as const;

/**
 * 버튼 테두리 스타일
 * - none: 테두리 없음
 * - default: 기본 회색 테두리 (1px)
 */
export const BUTTON_BORDERS: Record<ButtonBorder, string> = {
  none: "border-0",
  default: "border border-gray-300",
} as const;

/**
 * 버튼 variant별 스타일 (배경색, 텍스트 색상, 호버 효과)
 * - primary: 메인 브랜드 컬러 (보라색)
 * - secondary: 서브 브랜드 컬러 (연한 보라색)
 * - social: 소셜 로그인용 (흰색 배경)
 * - cancel: 취소/삭제용 (회색 텍스트)
 */
export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-[var(--color-purple)] text-white hover:enabled:bg-[var(--color-dark-purple)]",
  secondary:
    "bg-[var(--color-light-purple)] text-[var(--color-purple)] hover:enabled:bg-[var(--color-purple-200)]",
  social: "bg-[var(--color-white)] text-gray-800 hover:enabled:bg-[var(--color-gray100)]",
  cancel:
    "bg-[var(--color-white)] text-[var(--color-gray500)] min-w-[108px] hover:enabled:bg-[var(--color-gray100)]",
} as const;

/**
 * 버튼 모서리 스타일
 * - rounded: 둥근 모서리 (기본값)
 * - circle: 완전히 둥근 모서리
 * - square: 각진 모서리
 */
export const BUTTON_ROUNDS: Record<ButtonRound, string> = {
  rounded: "rounded-lg",
  circle: "rounded-full",
  square: "rounded-none",
} as const;

// ========================
// 공통 스타일
// ========================
/**
 * 모든 버튼의 기본 스타일
 * - 플렉스 레이아웃, 중앙 정렬
 * - 기본 폰트 스타일 및 커서
 * - 트랜지션 효과 (300ms)
 * - 최소 높이 50px, 아이템 간격 12px
 */
export const BUTTON_BASE_STYLES =
  "flex justify-center items-center font-medium cursor-pointer transition-colors duration-300 min-h-[50px] gap-3";

/**
 * 비활성화(disabled) 상태 스타일
 * - 투명도 50% 적용
 * - 커서를 not-allowed로 변경
 */
export const BUTTON_DISABLED_STYLES = "opacity-50 cursor-not-allowed";
