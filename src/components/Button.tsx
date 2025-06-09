"use client";

import React, { useMemo } from "react";

import GoogleIcon from "@/assets/google-icon.svg";
import KakaoIcon from "@/assets/kakao-icon.svg";
import {
  BUTTON_BASE_STYLES,
  BUTTON_BORDERS,
  BUTTON_DISABLED_STYLES,
  BUTTON_ROUNDS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  type ButtonBorder,
  type ButtonRound,
  type ButtonSize,
  type ButtonVariant,
  type SocialType,
} from "@/constants/buttonStyles";
import { cn } from "@/utils/cn";

import Spinner from "./Spinner";

// ========================
// 타입 정의
// ========================

/**
 * 기본 버튼 Props 인터페이스
 * 모든 버튼 타입에서 공통으로 사용되는 속성들을 정의
 */
interface BaseButtonProps {
  /** 자식 요소(아이콘&텍스트) */
  children: React.ReactNode;
  /** 클릭 이벤트 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 스타일 variant */
  variant?: ButtonVariant;
  /** 소셜 로그인 타입 (social variant에서만 사용) */
  socialType?: SocialType;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 버튼 모서리 스타일 */
  round?: ButtonRound;
  /** 버튼 테두리 스타일 */
  border?: ButtonBorder;
  /** 로딩 상태 표시 여부 */
  loading?: boolean;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 사용자 지정 className */
  className?: string;
  /** 버튼 타입 - button(기본값), submit, reset */
  type?: "button" | "submit" | "reset";
  /** 접근성을 위한 aria-label */
  "aria-label"?: string;
}

/**
 * 소셜 로그인 버튼 타입
 * variant가 'social'일 때 socialType이 필수로 요구됨
 */
type SocialButtonProps = BaseButtonProps & {
  variant: "social";
  socialType: SocialType;
};

/**
 * 일반 버튼 타입
 * 소셜 로그인 이외의 모든 버튼에서 socialType 사용 불가
 */
type RegularButtonProps = BaseButtonProps & {
  variant?: Exclude<ButtonVariant, "social">;
  socialType?: never;
};

/**
 * 최종 ButtonProps 타입
 * 소셜 버튼과 일반 버튼을 구분하여 타입 안전성 보장
 */
type ButtonProps = SocialButtonProps | RegularButtonProps;

/**
 * 소셜 아이콘 컴포넌트 매핑
 */
const socialIconComponents = {
  google: GoogleIcon,
  kakao: KakaoIcon,
} as const;

// ========================
// 메인 컴포넌트
// ========================

/**
 * 재사용 가능한 Button 컴포넌트
 *
 * 다양한 스타일, 크기, 상태를 지원하는 범용 버튼 컴포넌트입니다.
 * 소셜 로그인 버튼에서는 아이콘이 자동으로 추가되며,
 * 로딩 상태, 비활성화 상태, 접근성 등을 고려하여 설계되었습니다.
 *
 * @example
 * ```tsx
 * // 기본 버튼
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   확인
 * </Button>
 *
 * // 소셜 로그인 버튼
 * <Button variant="social" socialType="google" size="xl">
 *   Google로 로그인
 * </Button>
 *
 * // 로딩 상태 버튼
 * <Button variant="primary" loading>
 *   처리중...
 * </Button>
 * ```
 */
export default function Button({
  children,
  onClick,
  variant = "primary",
  socialType,
  size = "sm",
  round = "rounded",
  border = "none",
  loading = false,
  disabled = false,
  className,
  type = "button",
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) {
  // ========================
  // 렌더링 로직
  // ========================

  /**
   * 버튼 내용 렌더링 로직
   * 로딩 상태, 소셜 아이콘 등을 처리하여 적절한 내용을 반환
   * useMemo를 사용하여 불필요한 재렌더링 방지
   */
  const renderContent = useMemo(() => {
    // 로딩 상태일 때 스피너와 로딩 텍스트 표시
    if (loading) {
      return (
        <div className="flex items-center gap-2">
          <Spinner size={16} />
          <span>Loading...</span>
        </div>
      );
    }

    // 소셜 로그인 버튼인 경우 해당 아이콘과 함께 렌더링
    if (variant === "social" && socialType) {
      const IconComponent = socialIconComponents[socialType];
      return (
        <>
          <IconComponent />
          {children}
        </>
      );
    }

    // 일반 버튼의 경우 children만 렌더링
    return children;
  }, [loading, variant, socialType, children]);

  /**
   * 접근성을 위한 동적 aria-label 생성
   * 사용자가 제공한 label이 없을 경우 상황에 맞는 label을 자동 생성
   */
  const accessibilityLabel = useMemo(() => {
    // 사용자가 직접 제공한 aria-label이 있으면 그것을 우선 사용
    if (ariaLabel) return ariaLabel;

    // 로딩 상태일 때
    if (loading) return "Loading";

    // 소셜 로그인 버튼일 때 (예: "Google로 로그인")
    if (variant === "social" && socialType) {
      return `${socialType.charAt(0).toUpperCase() + socialType.slice(1)}로 로그인`;
    }

    // 기본값 (aria-label 없음)
    return undefined;
  }, [ariaLabel, loading, variant, socialType]);

  return (
    <button
      aria-busy={loading} // 스크린 리더에 로딩 상태 전달
      aria-label={accessibilityLabel} // 접근성을 위한 라벨
      className={cn(
        BUTTON_BASE_STYLES, // 기본 스타일 (레이아웃, 폰트 등)
        BUTTON_ROUNDS[round], // 모서리 스타일
        BUTTON_BORDERS[border], // 테두리 스타일
        BUTTON_VARIANTS[variant], // variant별 색상 스타일
        BUTTON_SIZES[size], // 크기 스타일
        (disabled || loading) && BUTTON_DISABLED_STYLES, // 비활성화 스타일
        className // 사용자 정의 스타일
      )}
      disabled={disabled || loading} // 비활성화 또는 로딩 중일 때 클릭 불가
      type={type}
      onClick={onClick}
      {...props} // 추가 props 전달
    >
      {renderContent}
    </button>
  );
}
