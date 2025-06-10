// src/app/wines/[id]/page.tsx

"use client";

import ReviewList from "@/components/wine-detail/ReviewList";
import wineRaw from "@/mocks/winesDetail.json";
import { WineDetailData } from "@/types/Wine";
import { convertStringsToAroma } from "@/utils/aromaConverter";

// mock 데이터를 WineDetailData 타입으로 변환
function convertWineDetailData(raw: any): WineDetailData {
  return {
    ...raw,
    reviews: raw.reviews.map((review: any) => ({
      ...review,
      aroma: convertStringsToAroma(review.aroma),
    })),
  };
}

const wine = convertWineDetailData(wineRaw);

export default function WineDetailPage() {
  return (
    <main className="mt-[3.875rem] px-[24.375rem] max-tb:px-[1.25rem] max-mb:px-[1rem] gap-[3.75rem]">
      <ReviewList wine={wine} />
    </main>
  );
}
/* <WineCard key={wine.id} data={wine} /> */
/* {wine.reviews.map((review) => (
        <div key={review.id}>{review.content}</div>
      ))} */
