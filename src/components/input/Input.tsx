/**
 * Input 컴포넌트 통합 Export
 *
 * 각각의 특화된 Input 컴포넌트들을 하나의 인터페이스로 제공합니다.
 * 사용자는 필요에 따라 개별 컴포넌트를 import하거나,
 * 통합된 Input 컴포넌트를 사용할 수 있습니다.
 */
import React, { forwardRef } from "react";

import BaseInput from "./BaseInput";
import PasswordInput from "./PasswordInput";
import SearchInput from "./SearchInput";
import { InputProps } from "./types";

// 개별 컴포넌트 export
export { default as BaseInput } from "./BaseInput";
export { default as PasswordInput } from "./PasswordInput";
export { default as SearchInput } from "./SearchInput";

/**
 * 통합 Input 컴포넌트
 *
 * type에 따라 자동으로 적절한 Input 컴포넌트를 렌더링합니다.
 * - search: SearchInput
 * - password: PasswordInput
 * - 기타: BaseInput
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Input type="email" label="이메일" />
 * <Input type="search" label="검색" />
 * <Input type="password" label="비밀번호" />
 *
 * // 개별 컴포넌트 사용법
 * <SearchInput label="검색" iconPosition="right" />
 * <PasswordInput label="비밀번호" />
 * <BaseInput type="email" label="이메일" />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", iconPosition, ...props }, ref) => {
    // type에 따라 적절한 컴포넌트 렌더링
    switch (type) {
      case "search":
        return <SearchInput ref={ref} iconPosition={iconPosition} {...props} />;

      case "password":
        return <PasswordInput ref={ref} {...props} />;

      default:
        return <BaseInput ref={ref} type={type} {...props} />;
    }
  }
);

Input.displayName = "Input";

export default Input;
