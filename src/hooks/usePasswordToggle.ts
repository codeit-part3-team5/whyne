"use client";

import { useCallback, useState } from "react";

import { ARIA_LABELS } from "@/constants/input";

/**
 * 패스워드 표시/숨김 토글 기능을 제공하는 커스텀 훅
 *
 * @param initialShow - 초기 패스워드 표시 상태 (기본값: false)
 * @returns 패스워드 토글 관련 상태와 함수들
 */
export const usePasswordToggle = (initialShow = false) => {
  const [showPassword, setShowPassword] = useState(initialShow);

  // 패스워드 토글 함수 (메모이제이션으로 불필요한 리렌더링 방지)
  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // 실제 input type 결정 함수
  const getInputType = useCallback(
    (originalType: string) => {
      return originalType === "password" && showPassword ? "text" : originalType;
    },
    [showPassword]
  );

  // 토글 버튼의 aria-label 반환
  const getToggleAriaLabel = useCallback(() => {
    return showPassword ? ARIA_LABELS.HIDE_PASSWORD : ARIA_LABELS.SHOW_PASSWORD;
  }, [showPassword]);

  return {
    showPassword,
    togglePassword,
    getInputType,
    getToggleAriaLabel,
  };
};
