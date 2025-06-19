import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import { extractUserIdFromToken, isTokenExpired } from "@/utils/tokenUtils";
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

interface AuthUser {
  id: number | null;
  email: string | null;
  nickname: string | null;
  isAuthenticated: boolean;
}

/**
 * 인증 관련 정보를 제공하는 커스텀 훅
 *
 * 사용 예시:
 * ```
 * const { user, isAuthenticated, isLoading, checkIsOwnContent, getToken } = useAuth();
 *
 * // 사용자 ID 확인
 * console.log(user.id);
 *
 * // 인증 여부 확인
 * if (isAuthenticated) {
 *   // 인증된 사용자만 접근 가능
 * }
 *
 * // 본인 콘텐츠 확인
 * if (checkIsOwnContent(authorId)) {
 *   // 본인 콘텐츠인 경우
 * }
 * ```
 */
export function useAuth() {
  const [user, setUser] = useState<AuthUser>({
    id: null,
    email: null,
    nickname: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // 토큰 디코딩 및 사용자 정보 추출
  useEffect(() => {
    const loadUserFromToken = () => {
      setIsLoading(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        setToken(accessToken);

        if (!accessToken) {
          setUser({
            id: null,
            email: null,
            nickname: null,
            isAuthenticated: false,
          });
          return;
        }

        if (isTokenExpired(accessToken)) {
          console.warn("토큰이 만료되었습니다.");
          localStorage.removeItem("accessToken");
          setUser({
            id: null,
            email: null,
            nickname: null,
            isAuthenticated: false,
          });
          return;
        }
        const decoded = jwtDecode<DecodedToken>(accessToken);
        const userId = extractUserIdFromToken(accessToken);
        setUser({
          id: userId ? Number(userId) : null,
          email: decoded.email || null,
          nickname: decoded.nickname || null,
          isAuthenticated: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromToken();

    // 로컬 스토리지 변경 이벤트 리스너 추가
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken") {
        loadUserFromToken();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  /**
   * 현재 로그인한 사용자의 토큰을 반환
   */
  const getToken = (): string | null => {
    return token;
  };

  /**
   * 주어진 ID의 콘텐츠가 현재 사용자의 것인지 확인
   * @param contentAuthorId 확인할 콘텐츠 작성자 ID
   * @returns 본인 콘텐츠이면 true, 아니면 false
   */
  const checkIsOwnContent = (contentAuthorId?: number | null): boolean => {
    if (!user.id || !contentAuthorId) return false;
    return Number(user.id) === Number(contentAuthorId);
  };

  /**
   * 로그아웃 처리
   */
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser({
      id: null,
      email: null,
      nickname: null,
      isAuthenticated: false,
    });
    setToken(null);
  };

  return {
    user,
    isAuthenticated: user.isAuthenticated,
    isLoading,
    checkIsOwnContent,
    getToken,
    logout,
  };
}
