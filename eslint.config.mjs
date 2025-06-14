import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslintConfigPrettier, // Prettier 충돌 방지

  // 커스텀 규칙
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      // 기본 스타일 규칙
      "no-console": ["warn", { allow: ["warn", "error"] }], // console.warn, console.error는 허용
      "prefer-const": "warn", // 재할당 없는 let은 const로
      "no-nested-ternary": "warn", // 삼항 연산자 중첩 금지
      "no-unused-vars": "off", // TypeScript에서는 @typescript-eslint/no-unused-vars 사용

      // TypeScript 관련 규칙
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_", // 사용하지 않는 변수 금지 (밑줄 제외)
          argsIgnorePattern: "^_", // 사용하지 않는 매개 변수 금지 (밑줄 제외)
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn", // any 타입 지양

      // 명명 규칙
      "@typescript-eslint/naming-convention": [
        "warn", // 처음에는 warn으로 시작
        // 기본적으로 모든 식별자는 camelCase
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "allow",
          // import된 식별자는 제외
          filter: {
            regex: "^(import|Import)",
            match: false,
          },
        },
        // 변수: camelCase, PascalCase (React 컴포넌트), UPPER_CASE (상수)
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        // 함수: camelCase, PascalCase (React 컴포넌트)
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        // 타입 관련 (인터페이스, 타입, 클래스, enum): PascalCase
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        // Enum 멤버: PascalCase 또는 UPPER_CASE
        {
          selector: "enumMember",
          format: ["PascalCase", "UPPER_CASE"],
        },
        // 프로퍼티: camelCase, PascalCase (React props 등)
        {
          selector: ["property", "parameterProperty"],
          format: ["camelCase", "PascalCase"],
          // 객체 키에서 kebab-case나 snake_case도 허용 (외부 API 등)
          filter: {
            regex: "^(aria-|data-|[a-z]+_[a-z]+).*$",
            match: false,
          },
        },
      ],

      // React JSX 관련 규칙
      "react/jsx-no-undef": "error", // 정의되지 않은 JSX 요소 금지
      "react/jsx-uses-vars": "warn", // JSX에서 사용한 변수는 unused로 처리하지 않음
      "react/jsx-key": "warn", // 반복 JSX 요소에 key 필수
      "react/no-array-index-key": "warn", // key로 index 사용 지양
      "react/jsx-max-props-per-line": ["warn", { maximum: 1, when: "multiline" }], // props 한 줄에 하나
      "react/no-unescaped-entities": "warn", // JSX에 특수문자 직접 입력 금지
      "react/jsx-sort-props": [
        // props 정렬
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      "react/display-name": "warn", // 익명 컴포넌트 displayName 경고
      "react/self-closing-comp": "warn", // 자식 없는 컴포넌트는 self-closing
      "react/jsx-boolean-value": ["warn", "never"], // boolean props는 value 없이
      "react/jsx-no-useless-fragment": "warn", // 불필요한 fragment 제거
      "react/jsx-curly-brace-presence": [
        // 중괄호 사용 최소화
        "warn",
        { props: "never", children: "never" },
      ],

      // React Hooks 관련 규칙
      "react-hooks/exhaustive-deps": "warn", // useEffect 의존성 누락 경고
      "react-hooks/rules-of-hooks": "error", // 훅은 최상위에서만

      // Import 관련 규칙
      "simple-import-sort/imports": "warn", // import 정렬
      "simple-import-sort/exports": "warn", // export 정렬
      "unused-imports/no-unused-imports": "error", // 사용되지 않는 import 제거
    },
    settings: {
      react: {
        version: "detect", // React 자동 버전 감지
      },
    },
  },
];

export default eslintConfig;
