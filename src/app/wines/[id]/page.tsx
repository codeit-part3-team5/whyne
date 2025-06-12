"use client";

import ReviewList from "@/components/wine-detail/Review/ReviewList";
import wine from "@/mocks/winesDetail.json";
import { WineDetailData, WineType } from "@/types/Wine";
import { convertStringsToAroma } from "@/utils/aromaConverter";

export default function WineDetailPage() {
  // 리뷰의 aroma 데이터만 변환하면 됩니다
  const wineData: WineDetailData = {
    ...wine,
    type: wine.type as WineType,
    reviews: wine.reviews.map((review) => ({
      ...review,
      aroma: convertStringsToAroma(review.aroma),
    })),
    recentReview: wine.recentReview
      ? {
          ...wine.recentReview,
          aroma: convertStringsToAroma(wine.recentReview.aroma),
        }
      : null,
  };

  return (
    <main className="flex flex-col items-center py-10">
      <div className="w-full max-w-[71.25rem] mx-auto ">
        <ReviewList wine={wineData} />
      </div>
    </main>
  );
}
