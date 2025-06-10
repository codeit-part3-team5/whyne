import React, { forwardRef, useId } from "react";

import { INPUT_TYPES } from "@/constants/input";
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
 * 기본 Input 컴포넌트
 *
 * text, email 등 기본적인 입력 필드를 렌더링합니다.
 * 아이콘이나 특별한 기능 없이 순수한 입력 기능만 제공합니다.
 */
const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = INPUT_TYPES.TEXT, error, className = "", ...restProps }, ref) => {
    // 현재 입력 필드 상태 결정
    const inputState = getInputState(error, restProps.disabled);
    const fallbackId = useId();
    const inputId = restProps.name || fallbackId;

    return (
      <div className={className}>
        {/* 라벨 */}
        {label && (
          <label className={INPUT_LABEL_STYLES} htmlFor={inputId}>
            {label}
          </label>
        )}

        {/* 입력 필드 컨테이너 */}
        <div className={INPUT_CONTAINER_STYLES}>
          {/* 입력 필드 */}
          <input
            ref={ref}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-invalid={!!error}
            id={inputId}
            type={type}
            {...restProps}
            className={cn(
              INPUT_BASE_STYLES,
              INPUT_TYPE_STYLES[type] || INPUT_TYPE_STYLES.text,
              INPUT_STATE_STYLES[inputState],
              INPUT_PADDING_STYLES.default
            )}
          />
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

BaseInput.displayName = "BaseInput";

export default BaseInput;
