"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { getWines } from "@/apis/winesApi";
import leftArrow from "@/assets/left-button-icon.png";
import rightArrow from "@/assets/right-botton-icon.png";
import type { BaseWineData } from "@/types/Wine";

import MiniWineCard from "./MiniWineCard";

export default function MonthlyWines() {
  const [wines, setWines] = useState<BaseWineData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [randomWines, setRandomWines] = useState<BaseWineData[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 232 + 16;

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const data = await getWines(8);
        setWines(data.list);
      } catch (error) {
        console.error("이 달의 추천 와인을 불러오는데 실패했습니다.:", error);
      }
    };

    fetchWines();
  }, []);

  // 랜덤 와인 설정
  useEffect(() => {
    const shuffled = [...wines].sort(() => Math.random() - 0.5);
    setRandomWines(shuffled);
  }, [wines]);

  // 브레이크포인트별 보여줄 카드 수 설정

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 스크롤 위치 제어
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentIndex * CARD_WIDTH,
        behavior: "smooth",
      });
    }
  }, [CARD_WIDTH, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, randomWines.length - visibleCount));
  };

  return (
    <div className="relative bg-gray-100 w-full max-w-[71.25rem] h-[18.6875rem] rounded-[1rem] px-[1.875rem] py-[1.875rem] overflow-hidden mx-auto my-[20px]">
      <h3 className="font-[700] text-[1.25rem] text-gray-800 mb-[1rem]">이번 달 추천 와인</h3>
      <Image
        alt="왼쪽화살표"
        className="absolute left-[1rem] top-1/2 -translate-y-1/2 w-[3rem] h-[3rem] cursor-pointer z-10"
        src={leftArrow}
        onClick={handlePrev}
      />
      <Image
        alt="오른쪽화살표"
        className="absolute right-[1rem] top-1/2 -translate-y-1/2 w-[3rem] h-[3rem] cursor-pointer z-10"
        src={rightArrow}
        onClick={handleNext}
      />

      {/* 카드 리스트 */}
      <div ref={scrollRef} className="flex gap-4 transition-transform duration-300 overflow-hidden">
        {randomWines.map((wine) => (
          <div key={wine.id} className="flex-shrink-0 w-[232px]">
            <MiniWineCard wine={wine} />
          </div>
        ))}
      </div>
    </div>
  );
}
