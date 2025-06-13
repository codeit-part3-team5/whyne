"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import leftArrow from "@/assets/left-button-icon.png";
import rightArrow from "@/assets/right-botton-icon.png";
import winesData from "@/mocks/winesData.json";
import type { BaseWineData } from "@/types/Wine";

import MiniWineCard from "./MiniWineCard";

export default function MonthlyWines() {
  const wines = winesData.list as BaseWineData[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4); //카드갯수 관리
  const scrollRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 232 + 16;

  // 브레이크포인트 별로 보여줄 카드 갯수 조정
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1); // mobile
      } else if (width < 1024) {
        setVisibleCount(2); // tablet
      } else {
        setVisibleCount(4); // desktop
      }
    };

    handleResize(); // 초기 세팅
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // currentIndex가 바뀌면 해당 카드 위치로 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentIndex * CARD_WIDTH,
        behavior: "smooth",
      });
    }
  }, [currentIndex, CARD_WIDTH]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, wines.length - visibleCount));
  };

  return (
    <div className="relative bg-gray-100 w-full max-w-[71.25rem] h-[18.6875rem] rounded-[1rem] px-[1.875rem] py-[1.875rem] overflow-hidden mx-auto my-[20px]">
      <h3 className="font-[700] text-[1.25rem] text-gray-800 mb-[1rem]">이번 달 추천 와인</h3>

      {/* 왼쪽 화살표 */}
      <Image
        alt="왼쪽화살표"
        className="absolute left-[1rem] top-1/2 -translate-y-1/2 w-[3rem] h-[3rem] cursor-pointer z-10"
        src={leftArrow}
        onClick={handlePrev}
      />

      {/* 오른쪽 화살표 */}
      <Image
        alt="오른쪽화살표"
        className="absolute right-[1rem] top-1/2 -translate-y-1/2 w-[3rem] h-[3rem] cursor-pointer z-10"
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
