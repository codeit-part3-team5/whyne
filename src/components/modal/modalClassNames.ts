const wineDefaultStyle = `
flex flex-col w-[28.75rem] p-6 items-start gap-[2.5rem]
`;

const reviewDefaultStyle = `
inline-flex flex-col p-6 w-auto items-start gap-[3rem]
`;

/**
 * 모달 종류별 기본 Tailwind 클래스 모음
 * - 각 키는 특정 모달의 목적에 해당하고, 값은 그 모달에 맞는 스타일 클래스입니다.
 */

export const MODAL_CLASSNAMES = {
  /** 와인 추가 모달 - 넓은 폭과 내부 여백 중심의 레이아웃 */
  addWine: ` ${wineDefaultStyle}`,

  /** 와인 수정 모달 - 추가와 동일한 레이아웃 사용 */
  editWine: ` ${wineDefaultStyle}`,

  /** 리뷰 작성 모달 - 내용이 많지 않으므로 너비 자동 */
  addReview: `${reviewDefaultStyle}`,

  /** 리뷰 수정 모달 - 작성과 동일한 스타일 */
  editReview: `${reviewDefaultStyle}`,

  /** 삭제 확인 모달 - 중앙 정렬 및 간격 최소화 */
  delete: `inline-flex flex-col w-auto justify-center items-center gap-[1rem] p-[2rem_1rem_1.5rem_1rem]`,

  /** 필터 설정 모달 - 좁은 폭, 오른쪽 정렬 */
  filter: `flex flex-col w-[23.438rem] p-6 items-end gap-[2.5rem]`,

  /** 기본 모달 스타일 - 와인 추가 모달과 동일하게 설정 */
  default: `${wineDefaultStyle}`,
};
