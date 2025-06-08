"use client";

import { BaseWineData } from "@/types/Wine";
import { cn } from "@/utils/cn";

import Star from "./Star";
type ReviewSummaryProps = BaseWineData & { direction?: "row" | "column" };

export default function ReviewSummary({
  avgRating,
  reviewCount,
  direction = "row",
}: ReviewSummaryProps) {
  return (
    <div
      className={cn(
        "flex items-center",
        direction === "column"
          ? "flex-col w-[112px] h-[121px] items-start gap-[10px]"
          : "flex-row gap-[20px]"
      )}
    >
      <div
        className="
      text-gray-800
        text-[54px] 
        font-extrabold
        leading-normal
        [font-feature-settings:'liga' off,'clig' off]     
      "
      >
        {avgRating.toFixed(1)}
      </div>

      <div
        className={cn(
          "flex items-start w-[112px] h-[24px]",
          direction === "column" ? "flex-col gap-[10px]" : "flex-col gap-[5px]"
        )}
      >
        <Star avgRating={avgRating} />
        <div
          className="
          text-gray-500
          text-[14px]
          font-normal
          leading-[24px]
          not-italic
          "
        >
          {reviewCount}개의 후기
        </div>
      </div>
    </div>
  );
}
