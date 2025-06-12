// 이 달의 추천 와인
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import leftArrow from "@/assets/left-button-icon.png";
import rightArrow from "@/assets/right-botton-icon.png";
import winesData from "@/mocks/winesData.json";
import type { BaseWineData } from "@/types/Wine";

import MiniWineCard from "./MiniWineCard";

export default function MonthlyWines() {
  const wines = winesData.list as BaseWineData[]; //winesData.json 에서 리스트를 BaseWineData[] 로 타입을 지정한 것입니다
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 232 + 16;

  // currentIndex 가 변경될 때마다 카드의 위치로 이동하는 로직
  // CARD_WIDTH 를 의존성 배열에 넣은 이유는 안정성을 위해서입니다
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentIndex * CARD_WIDTH,
        behavior: "smooth",
      });
    }
  }, [currentIndex, CARD_WIDTH]);

  // 왼쪽 화살표 아이콘 클릭시 이전 카드로 이동합니다
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // 오른쪽 화살표 아이콘 클릭시 다른 카드로 이동합니다
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, wines.length - VISIBLE_COUNT));
  };

  const VISIBLE_COUNT = 4; // 한 번에 보여줄 카드 수

  return (
    <div className="relative bg-gray-100 w-[1140px] h-[299px] rounded-[16px] px-[30px] py-[30px] overflow-hidden">
      <h3 className="font-[700] text-[20px] text-gray-800 mb-4">이번 달 추천 와인</h3>

      <Image
        alt="왼쪽화살표"
        className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] cursor-pointer z-10"
        src={leftArrow}
        onClick={handlePrev}
      />

      <Image
        alt="오른쪽화살표"
        className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] cursor-pointer z-10"
        src={rightArrow}
        onClick={handleNext}
      />

      {/* 카드 리스트 */}
      <div ref={scrollRef} className="flex gap-4 transition-transform duration-300 overflow-hidden">
        {wines.map((wine) => (
          <div key={wine.id} className="flex-shrink-0 w-[232px]">
            <MiniWineCard wine={wine} />
          </div>
        ))}
      </div>
    </div>
  );
}
