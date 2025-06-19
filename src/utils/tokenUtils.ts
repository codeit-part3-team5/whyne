import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id?: number;
  userId?: number;
  sub?: string;
  exp?: number;
  iat?: number;
  email?: string;
  nickname?: string;
  // 기타 토큰에 포함된 필드들
}

/**
 * 토큰이 만료되었는지 확인
 * @param token JWT 토큰
 * @returns 만료되었으면 true, 아니면 false
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (!decoded.exp) return false;

    // 현재 시간과 만료 시간 비교
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("토큰 디코딩 오류:", error);
    return true; // 디코딩 실패 시 만료된 것으로 간주
  }
};

/**
 * 토큰에서 사용자 ID 추출
 * @param token JWT 토큰
 * @returns 사용자 ID 또는 null
 */
export const extractUserIdFromToken = (token: string): number | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    // 토큰에서 사용자 ID를 추출 (토큰 구조에 따라 다를 수 있음)
    const userId = decoded.id || decoded.userId || Number(decoded.sub);
    return userId ? Number(userId) : null;
  } catch (error) {
    console.error("토큰에서 사용자 ID 추출 오류:", error);
    return null;
  }
};
