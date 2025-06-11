/**
 * Input 컴포넌트 상수
 */

// Input 타입 상수
export const INPUT_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  SEARCH: "search",
} as const;

// 아이콘 위치 상수
export const ICON_POSITIONS = {
  LEFT: "left",
  RIGHT: "right",
} as const;

// 접근성 라벨 상수
export const ARIA_LABELS = {
  SHOW_PASSWORD: "비밀번호 보기",
  HIDE_PASSWORD: "비밀번호 숨기기",
} as const;
