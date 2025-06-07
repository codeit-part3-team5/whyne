"use client";

import StarIcon from "@/assets/icons/star-icon.svg";
import { BaseWineData } from "@/types/Wine";
export default function ReviewSummary({ avgRating, reviewCount }: BaseWineData) {
  // const activeColor = "var(--color-purple)";
  const inactiveColor = "var(--color-gray300)";

  return (
    <div className="flex">
      <div>{avgRating}</div>
      &nbsp;
      <div>
        <StarIcon fill={inactiveColor} height="24" width="24" />
      </div>
      <div>{reviewCount}개의 후기</div>
    </div>
  );
}
