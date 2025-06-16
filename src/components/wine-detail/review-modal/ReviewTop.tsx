"use client";

import { useEffect } from "react";

// 임시로 스토어 초기화를 위한 더미 와인 데이터
import wineJson from "@/mocks/winesDetail.json";
import { useWineStore } from "@/store/useWineStore";
import { WineDetailData, WineType } from "@/types/Wine";
import { convertStringsToAroma } from "@/utils/aromaConverter";

import ReviewTitle from "./ReviewTitle";
import ReviewWrite from "./ReviewWrite";

export default function ReviewTop() {
  const { wine, setWine } = useWineStore();

  // 임시로 컴포넌트 마운트 시 와인 데이터 설정
  useEffect(() => {
    // 만약 와인 데이터가 없다면 임시 데이터 설정
    if (!wine) {
      console.log("와인 데이터 설정 중...");
      const wineData: WineDetailData = {
        ...wineJson,
        type: wineJson.type as WineType,
        reviews: wineJson.reviews.map((r) => ({ ...r, aroma: convertStringsToAroma(r.aroma) })),
        recentReview: wineJson.recentReview
          ? { ...wineJson.recentReview, aroma: convertStringsToAroma(wineJson.recentReview.aroma) }
          : null,
      };
      setWine(wineData);
    }
  }, [wine, setWine]);

  if (!wine) {
    return <span className="text-center p-4">와인 정보를 불러오는 중...</span>;
  }

  return (
    <section className="w-[480px] max-mb:w-full flex flex-col items-start gap-6">
      <ReviewTitle wineName={wine.name} />
      <ReviewWrite />
    </section>
  );
}
