"use client";

import { useMemo } from "react";

import WineCard from "@/components/about-wine/WineCard";
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
    <main className="flex flex-col items-center py-10 gap-[3.75rem] max-mb:gap-[2.5rem]">
      <WineCard data={wineData} />
      <div className="flex w-full max-w-[71.25rem] gap-[1.875rem] max-tb:flex-col-reverse items-start justify-center max-tb:items-center">
        <div className="flex-grow w-full max-mb:w-full max-w-[50rem]">
          <ReviewList wine={wineData} />
        </div>
        <ReviewOverview wine={wineData} />
      </div>
    </main>
  );
}
