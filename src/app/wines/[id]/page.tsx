"use client";

import { useMemo } from "react";

import ReviewList from "@/components/wine-detail/review-list/ReviewList";
import ReviewOverview from "@/components/wine-detail/review-overview/ReviewOverview";
import wineJson from "@/mocks/winesDetail.json";
import { WineDetailData, WineType } from "@/types/Wine";
import { convertStringsToAroma } from "@/utils/aromaConverter";

export default function WineDetailPage() {
  const wineData: WineDetailData = useMemo(
    () => ({
      ...wineJson,
      type: wineJson.type as WineType,
      reviews: wineJson.reviews.map((r) => ({ ...r, aroma: convertStringsToAroma(r.aroma) })),
      recentReview: wineJson.recentReview
        ? { ...wineJson.recentReview, aroma: convertStringsToAroma(wineJson.recentReview.aroma) }
        : null,
    }),
    []
  );

  return (
    <main className="flex flex-col items-center py-10">
      <div className="flex w-full max-w-[71.25rem] mx-auto gap-15 ">
        <div className="flex-grow max-mb:w-full">
          <ReviewList wine={wineData} />
        </div>
        <div className="flex-shrink-0">
          <ReviewOverview wine={wineData} />
        </div>
      </div>
    </main>
  );
}
