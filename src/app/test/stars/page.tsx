"use client";

import { useState } from "react";

import RatingStars from "@/components/RatingStars";

export default function TestRatingStarsPage() {
  const [rating, setRating] = useState(0);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">별점 컴포넌트 테스트</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. 기본 별점 (반별 지원)</h2>
        <div className="p-4 border rounded-lg">
          <RatingStars allowHalfStar initialRating={0} onChange={setRating} />
          <p className="mt-2">선택된 별점: {rating}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. 전체 별만 지원</h2>
        <div className="p-4 border rounded-lg">
          <RatingStars
            allowHalfStar={false}
            initialRating={0}
            onChange={(val) => console.log("Full star rating:", val)}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. 읽기 전용 별점</h2>
        <div className="p-4 border rounded-lg">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="w-16">0.5점:</span>
              <RatingStars readOnly initialRating={0.5} />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16">1점:</span>
              <RatingStars readOnly initialRating={1} />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16">1.5점:</span>
              <RatingStars readOnly initialRating={1.5} />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16">2.5점:</span>
              <RatingStars readOnly initialRating={2.5} />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16">3.5점:</span>
              <RatingStars readOnly initialRating={3.5} />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16">4.5점:</span>
              <RatingStars readOnly initialRating={4.5} />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16">5점:</span>
              <RatingStars readOnly initialRating={5} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. 모바일 크기 테스트 (작은 별)</h2>
        <div className="p-4 border rounded-lg max-w-xs">
          <RatingStars readOnly initialRating={3.5} />
        </div>
      </div>
    </div>
  );
}
