"use client";

import { BaseWineData } from "@/types/Wine";
import { cn } from "@/utils/cn";

import Star from "./Star";
type ReviewSummaryProps = BaseWineData & { page?: "wineCard" | "wineDetail" };

export default function ReviewSummary({
  avgRating,
  reviewCount,
  page = "wineCard",
}: ReviewSummaryProps) {
  return (
    <div
      className={cn(
        "flex max-mb:flex-row flex-shrink-0 items-center max-mb:gap-[.9375rem] max-mb:w-auto max-mb:h-auto",
        page === "wineCard"
          ? "flex-col w-[7rem] h-[7.75rem] items-start gap-[.625rem] "
          : "flex-row max-w-[13.625rem] h-[4rem] gap-[1.25rem] max-tb:mt-4.5 max-mb:mt-0"
      )}
    >
      {" "}
      <div
        className={cn(
          "text-gray800 text-[3rem] font-extrabold leading-[normal] max-mb:text-[1.75rem]"
        )}
      >
        {avgRating != null ? avgRating.toFixed(1) : "0.0"}
      </div>
      <div
        className={cn(
          "flex items-start w-auto max-mb:gap-[.3125rem]",
          page === "wineCard" ? "flex-col gap-[.625rem] justify-center" : "flex-col gap-[.3125rem] "
        )}
      >
        <Star avgRating={avgRating != null ? avgRating : 0} />
        <div className="text-gray500 text-[.875rem] font-normal leading-6 max-mb:text-[.75rem] max-mb:leading-4.5">
          {reviewCount}개의 후기
        </div>
      </div>
    </div>
  );
}
