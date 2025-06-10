"use client";

import React, { forwardRef, useId } from "react";

import EyePasswordHideIcon from "@/assets/icons/eye-password-hide.svg";
import EyePasswordShowIcon from "@/assets/icons/eye-password-show.svg";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import {
  getInputState,
  INPUT_BASE_STYLES,
  INPUT_CONTAINER_STYLES,
  INPUT_ERROR_STYLES,
  INPUT_LABEL_STYLES,
  INPUT_PADDING_STYLES,
  INPUT_STATE_STYLES,
  INPUT_TYPE_STYLES,
} from "@/styles/inputStyles";
import { cn } from "@/utils/cn";

import { InputProps } from "./types";

/**
 * 패스워드 Input 컴포넌트
 *
 * 비밀번호 입력에 특화된 컴포넌트입니다.
 * 자동으로 비밀번호 표시/숨김 토글 버튼이 제공됩니다.
 */
const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...restProps }, ref) => {
    const { showPassword, togglePassword, getInputType, getToggleAriaLabel } = usePasswordToggle();

    // 현재 입력 필드 상태 결정
    const inputState = getInputState(error, restProps.disabled);

    // 실제 input type 결정 (password 토글 고려)
    const actualInputType = getInputType("password");

    const fallbackId = useId();
    const inputId = restProps.name || fallbackId;

    // 패스워드 토글 버튼 렌더링
    const renderPasswordToggle = () => {
      const IconComponent = showPassword ? EyePasswordShowIcon : EyePasswordHideIcon;

      return (
        <button
          aria-label={getToggleAriaLabel()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 md:right-4"
          disabled={restProps.disabled}
          type="button"
          onClick={togglePassword}
        >
          <IconComponent className="w-5 h-5" />
        </button>
      );
    };

    return (
      <div className={className}>
        {label && (
          <label className={INPUT_LABEL_STYLES} htmlFor={inputId}>
            {label}
          </label>
        )}

        <div className={INPUT_CONTAINER_STYLES}>
          <input
            ref={ref}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-invalid={!!error}
            id={inputId}
            type={actualInputType}
            {...restProps}
            className={cn(
              INPUT_BASE_STYLES, // 기본 스타일
              INPUT_TYPE_STYLES.password, // 패스워드 전용 스타일
              INPUT_STATE_STYLES[inputState], // 상태별 스타일
              INPUT_PADDING_STYLES.withRightIcon // 오른쪽에 토글 버튼이 있으므로
            )}
          />

          {/* 패스워드 토글 버튼 */}
          {renderPasswordToggle()}
        </div>

        {/* 에러 메시지 */}
        {error && (
          <p className={INPUT_ERROR_STYLES} id={`${inputId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
