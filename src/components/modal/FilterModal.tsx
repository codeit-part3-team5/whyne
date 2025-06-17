import { useState } from "react";

import PriceFilter from "../Filters/PriceFilter";
import RatingFilter from "../Filters/RatingFilter";
import TypeFilter from "../Filters/TypeFilter";

export default function FilterModal() {
  const [selectRating, setSelectRating] = useState<string | null>(null); // 평점 필터의 클릭 state
  return (
    <section aria-label="모달 열기">
      <TypeFilter />
      <PriceFilter />
      <RatingFilter selected={selectRating} onChange={setSelectRating} />
    </section>
  );
}
