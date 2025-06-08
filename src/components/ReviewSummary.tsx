"use client";

import { BaseWineData } from "@/types/Wine";

import Star from "./Star";

export default function ReviewSummary({ avgRating, reviewCount }: BaseWineData) {
  return (
    <div className="flex">
      <div>{avgRating}</div>
      &nbsp;
      <Star avgRating={avgRating} />
      <div>{reviewCount}개의 후기</div>
    </div>
  );
}
