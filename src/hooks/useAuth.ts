import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import useLogin from "@/components/Login/useLogin";
import { DecodedToken, extractUserIdFromToken, isTokenExpired } from "@/utils/tokenUtils";

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
        // useLogin 스토어에서 accessToken 가져오기
        const accessToken = useLogin.getState().accessToken;
        setToken(accessToken || null);

        if (!accessToken) {
          setUser({
            id: null,
            email: null,
            nickname: null,
            isAuthenticated: false,
          });
          return;
        }

        // 토큰 만료 확인
        if (isTokenExpired(accessToken)) {
          console.warn("토큰이 만료되었습니다.");
          // 토큰이 만료되면 스토어에서 토큰 제거
          useLogin.getState().clear();
          setUser({
            id: null,
            email: null,
            nickname: null,
            isAuthenticated: false,
          });
          return;
        }

        // 토큰에서 사용자 정보 추출
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

    // zustand persist를 사용하므로 storage 이벤트 리스너 불필요
    // 대신 zustand 스토어 구독을 통해 변경 감지
    const unsubscribe = useLogin.subscribe((state) => {
      if (state.accessToken !== token) {
        loadUserFromToken();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [token]);
  /**
   * 현재 로그인한 사용자의 토큰을 반환
   */
  const getToken = (): string | null => {
    // 항상 최신 토큰을 반환하기 위해 스토어에서 직접 가져옴
    return useLogin.getState().accessToken || null;
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
    // useLogin 스토어를 통해 토큰 제거
    useLogin.getState().clear();
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
