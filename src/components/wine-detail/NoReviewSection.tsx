"use client";

import noReviewImage from "/public/images/no-review.png";
import WineCard from "@/components/about-wine/WineCard";
import Button from "@/components/Button";
import { BaseWineData } from "@/types/Wine";

interface NoReviewProps {
  wineData: BaseWineData;
  onAddReview: () => void;
}

export default function NoReviewSection({ wineData, onAddReview }: NoReviewProps) {
  return (
    <main className="flex flex-col items-start py-10 gap-[60px] max-mb:gap-[40px]">
      <WineCard data={wineData} />
      <div className="flex items-start">
        <h3 className="text-xl font-bold text-gray800">리뷰 목록</h3>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-12 py-20">
        <div className="flex flex-col w-[9.375rem] gap-6">
          <img alt="리뷰가 없습니다" className="w-[136px] h-[136px] " src={noReviewImage.src} />
          <h4 className="text-lg font-normal text-gray500 leading-6.5">작성된 리뷰가 없어요</h4>
        </div>

        <Button size="md" onClick={onAddReview}>
          리뷰 남기기
        </Button>
      </div>
    </main>
  );
}
