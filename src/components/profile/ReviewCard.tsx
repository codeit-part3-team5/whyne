"use client";

import { useState } from "react";

import Ellipse from "@/assets/ellipse-icon.svg";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import reviewsData from "@/mocks/reviewsData.json";
import { timeForToday } from "@/utils/timeForToday";

import DropDown from "../DropDown";
import Rating from "../wine-detail/Review/Rating";

export default function ReviewCard() {
  const reviews = reviewsData.list;
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 24.375rem)");
  const ellipseSize = isMobile ? 24 : 26;

  const handleDropdownToggle = (reviewId: number) => {
    setOpenDropdownId(openDropdownId === reviewId ? null : reviewId);
  };

  return (
    <section className="flex flex-col gap-2 max-tb:gap-4 ">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white py-6 px-10 max-mb:py-4 max-mb:px-5 rounded-lg shadow-sm border border-gray-300"
        >
          <div className="flex flex-col gap-4 relative">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <Rating rating={review.rating} />
                <span className="text-sm text-gray-500">{timeForToday(review.updatedAt)}</span>
              </div>
              <button
                aria-expanded={openDropdownId === review.id}
                aria-haspopup="menu"
                className="relative"
                onClick={() => handleDropdownToggle(review.id)}
              >
                <Ellipse height={ellipseSize} width={ellipseSize} />
              </button>
              {openDropdownId === review.id && (
                <div className="absolute right-0 top-12 z-11">
                  <DropDown
                    firstText="수정하기"
                    secondText="삭제하기"
                    size={isMobile ? "small" : "default"}
                  />
                </div>
              )}
            </div>
            <h3 className="font-medium text-gray-500 mb-2 text-base max-tb:text-sm ">
              {review.wine.name || "이름 없음"}
            </h3>
          </div>
          <p className="text-base max-mb:text-sm text-gray-800 break-words whitespace-normal">
            {review.content}
          </p>
        </div>
      ))}
    </section>
  );
}
