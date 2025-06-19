/**
 * Input 컴포넌트 타입 정의
 */

/** 아이콘 위치 타입 */
export type IconPosition = "left" | "right";

/** 입력 필드 타입 */
export type InputType = "text" | "email" | "password" | "search" | "number";

/** 입력 필드 상태 타입 */
export type InputState = "default" | "error" | "disabled";

/**
 * Input Props 인터페이스
 * 모든 Input 컴포넌트에서 사용하는 통합 인터페이스
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  /** 입력 필드 위에 표시될 라벨 텍스트 */
  label?: string;
  /** 입력 필드 타입 */
  type?: InputType;
  /** 검증 실패 시 표시될 에러 메시지 */
  error?: string;
  /** 커스텀 CSS 클래스명 (Tailwind CSS) */
  className?: string;
  /** 아이콘 표시 위치 (search 타입에서만 사용) */
  iconPosition?: IconPosition;
}
