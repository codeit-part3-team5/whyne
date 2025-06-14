"use client";

import { useState } from "react";

export default function PriceFilter() {
  const maxPrice = 100000;
  const minPrice = 0;
  const steps = 1000;

  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);

  // 텍스트가 슬라이더 영역 밖으로 나가지 않게 위치 제한
  const getSafeLeft = (value: number) => {
    const percent = (value / maxPrice) * 100;
    return Math.min(Math.max(percent, 5), 95);
  };

  // 슬라이더 핸들 자유롭게 이동하도록 제한 제거
  const handleMinMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(Number(e.target.value));
  };

  const handleMaxMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(Number(e.target.value));
  };

  return (
    <div className="font-[700] text-[20px] text-gray-800 mt-4">
      <div className="py-6">PRICE</div>

      {/* 가격 텍스트 */}
      <div className="relative w-full max-w-[300px] h-[24px] mb-1">
        <span
          className="absolute -top-3 text-purple text-[1rem] font-[500] min-w-[80px] text-center"
          style={{
            left: `${getSafeLeft(minValue)}%`,
            transform: "translateX(-50%)",
          }}
        >
          ₩ {minValue.toLocaleString()}
        </span>
        <span
          className="absolute -top-3 text-purple text-[1rem] font-[500] min-w-[80px] text-center"
          style={{
            left: `${getSafeLeft(maxValue)}%`,
            transform: "translateX(-50%)",
          }}
        >
          ₩ {maxValue.toLocaleString()}
        </span>
      </div>

      {/* 슬라이더 바 + 트랙 */}
      <div className="relative w-full max-w-[284px] h-[6px] bg-gray-200 rounded-full mb-6">
        {/* 선택된 범위 */}
        <div
          className="absolute h-full bg-purple rounded-full"
          style={{
            left: `${(Math.min(minValue, maxValue) / maxPrice) * 100}%`,
            width: `${(Math.abs(maxValue - minValue) / maxPrice) * 100}%`,
          }}
        />

        {/* 슬라이더 핸들 2개 */}
        <input
          className="absolute w-full max-w-[284px] h-[6px] appearance-none cursor-pointer"
          max={maxPrice}
          min={minPrice}
          step={steps}
          type="range"
          value={minValue}
          onChange={handleMinMove}
        />
        <input
          className="absolute w-full max-w-[284px] h-[6px] appearance-none cursor-pointer"
          max={maxPrice}
          min={minPrice}
          step={steps}
          type="range"
          value={maxValue}
          onChange={handleMaxMove}
        />
      </div>
    </div>
  );
}
