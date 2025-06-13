"use client";

import { useMemo } from "react";

import ReviewList from "@/components/wine-detail/Review/ReviewList";
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
      <div className="w-full max-w-[71.25rem] mx-auto ">
        <ReviewList wine={wineData} />
      </div>
    </main>
  );
}
