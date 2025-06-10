"use client";

import React, { forwardRef, useId, useMemo } from "react";

import SearchIcon from "@/assets/icons/search-icon.svg";
import {
  getInputState,
  getPaddingStyle,
  INPUT_BASE_STYLES,
  INPUT_CONTAINER_STYLES,
  INPUT_ERROR_STYLES,
  INPUT_ICON_POSITIONS,
  INPUT_LABEL_STYLES,
  INPUT_STATE_STYLES,
  INPUT_TYPE_STYLES,
} from "@/styles/inputStyles";
import { cn } from "@/utils/cn";

import { InputProps } from "./types";

/**
 * 검색 Input 컴포넌트
 *
 * 검색 기능에 특화된 입력 필드입니다.
 * 자동으로 검색 아이콘이 표시되며, 검색에 최적화된 스타일이 적용됩니다.
 */
const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", iconPosition = "left", ...restProps }, ref) => {
    // 현재 입력 필드 상태 결정
    const inputState = getInputState(error, restProps.disabled);

    // 패딩 스타일 결정 (아이콘이 항상 있음)
    const paddingStyle = getPaddingStyle(true, iconPosition);

    // 검색 아이콘 메모이제이션 - 매번 새로 생성하지 않음
    const searchIcon = useMemo(() => <SearchIcon className="w-5 h-5" />, []);

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
          {/* 왼쪽 아이콘 */}
          {iconPosition === "left" && <div className={INPUT_ICON_POSITIONS.left}>{searchIcon}</div>}

          {/* 입력 필드 */}
          <input
            ref={ref}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-invalid={!!error}
            id={inputId}
            type="search"
            {...restProps}
            className={cn(
              INPUT_BASE_STYLES, // 기본 스타일
              INPUT_TYPE_STYLES.search, // 검색 전용 스타일
              INPUT_STATE_STYLES[inputState], // 상태별 스타일
              paddingStyle // 아이콘 위치에 따른 패딩
            )}
          />

          {/* 오른쪽 아이콘 */}
          {iconPosition === "right" && (
            <div className={INPUT_ICON_POSITIONS.right}>{searchIcon}</div>
          )}
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

SearchInput.displayName = "SearchInput";

export default SearchInput;
