import { type IconPosition, type InputState, type InputType } from "@/components/input/types";
/**
 * Input 컴포넌트 스타일 정의
 *
 * 입력 필드의 크기, 스타일, 모양, 상태 등을 정의하는 상수들을 포함합니다.
 * 각 타입별로 Record를 사용하여 타입 안전성을 보장합니다.
 */

// ========================
// 스타일 상수 정의
// ========================

/**
 * 아이콘이 있는 입력 필드 타입들
 * - 새로운 아이콘 타입 추가 시 이 배열에 추가하면 됨
 */
export const INPUT_TYPES_WITH_ICON: InputType[] = ["search", "password"] as const;

/**
 * 입력 필드 타입별 스타일
 */
const DEFAULT_INPUT_STYLE = "h-[2.625rem] rounded-[.75rem] md:h-[3rem] md:rounded-[1rem]";
export const INPUT_TYPE_STYLES: Record<InputType, string> = {
  text: DEFAULT_INPUT_STYLE,
  email: DEFAULT_INPUT_STYLE,
  password: DEFAULT_INPUT_STYLE,
  search: "h-[2.375rem] rounded-[3.125rem] md:h-[3rem] md:rounded-[3.125rem]",
  number: DEFAULT_INPUT_STYLE, // 'number' 타입도 명확히 추가
} as const;

/**
 * 아이콘 위치별 패딩 스타일 (반응형)
 */
export const INPUT_PADDING_STYLES = {
  default: "px-4 md:px-5", // 아이콘 없을 때
  withLeftIcon: "pl-10 pr-4 md:pl-12 md:pr-5", // 왼쪽 아이콘 있을 때
  withRightIcon: "pr-10 pl-4 md:pr-12 md:pl-5", // 오른쪽 아이콘 있을 때
} as const;

/**
 * 아이콘 위치 스타일 (반응형)
 */
export const INPUT_ICON_POSITIONS: Record<IconPosition, string> = {
  left: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 md:left-4",
  right: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 md:right-4",
} as const;

/**
 * 입력 필드 상태별 테두리 및 배경 스타일
 * - default: 기본 상태 (회색 테두리, 포커스 시 보라색)
 * - error: 에러 상태 (빨간색 테두리 및 포커스 링)
 * - disabled: 비활성화 상태 (회색 배경, 텍스트 색상 변경)
 */
export const INPUT_STATE_STYLES: Record<InputState, string> = {
  default:
    "border-gray-300 focus:border-2 focus:border-[var(--color-purple)] focus:ring-2 focus:ring-[var(--color-light-purple)] bg-white hover:border-gray-400",
  error: "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white",
  disabled: "bg-gray-100 cursor-not-allowed text-gray-500 border-gray-300",
} as const;

/**
 * 라벨 스타일
 */
export const INPUT_LABEL_STYLES = "block text-sm font-medium text-gray-800 mb-[.625rem]";

/**
 * 에러 메시지 스타일
 */
export const INPUT_ERROR_STYLES = "pl-5 mt-2 text-xs text-red-600 flex items-center";

// ========================
// 공통 스타일
// ========================

/**
 * 모든 입력 필드의 기본 스타일
 */
export const INPUT_BASE_STYLES =
  "w-full border transition-all duration-200 placeholder:text-gray-400 text-gray-900 outline-none text-sm md:text-base";

/**
 * 입력 필드 컨테이너 기본 스타일
 * - 상대 위치 지정 (아이콘 배치용)
 */
export const INPUT_CONTAINER_STYLES = "relative";

// ========================
// 유틸리티 함수
// ========================

/**
 * 입력 필드 상태를 결정하는 함수
 */
export const getInputState = (error?: string, disabled?: boolean): InputState => {
  if (disabled) return "disabled";
  if (error) return "error";
  return "default";
};

/**
 * 패딩 스타일을 결정하는 함수
 */
export const getPaddingStyle = (hasIcon: boolean, iconPosition: IconPosition) => {
  if (!hasIcon) return INPUT_PADDING_STYLES.default;
  return iconPosition === "left"
    ? INPUT_PADDING_STYLES.withLeftIcon
    : INPUT_PADDING_STYLES.withRightIcon;
};

/**
 * 해당 타입에 아이콘이 있는지 확인하는 함수
 */
export const hasIconForType = (type: InputType): boolean => {
  return INPUT_TYPES_WITH_ICON.includes(type);
};
