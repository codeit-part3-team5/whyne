/**
 * 유효성 검사 결과 타입
 */
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * 빈 값 체크 (null, undefined, 빈 문자열, 공백만 있는 문자열)
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  return false;
};

/**
 * 2글자 이상인지 체크
 */
export const isMinLength = (value: string, minLength: number = 2): boolean => {
  if (isEmpty(value)) return false;
  return value.trim().length >= minLength;
};

/**
 * 최대 길이 체크
 */
export const isMaxLength = (value: string, maxLength: number): boolean => {
  if (isEmpty(value)) return true; // 빈 값은 길이 제한에 걸리지 않음
  return value.trim().length <= maxLength;
};
