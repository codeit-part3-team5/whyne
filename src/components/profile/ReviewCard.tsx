"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Ellipse from "@/assets/ellipse-icon.svg";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import reviewsData from "@/mocks/reviewsData.json";
import { timeForToday } from "@/utils/timeForToday";

import DropDown from "../DropDown";
import Rating from "../wine-detail/review-list/Rating";

export default function ReviewCard() {
  const reviews = reviewsData.list;
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 24.375rem)");
  const ellipseSize = isMobile ? 24 : 26;
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const handleDropdownToggle = useCallback(
    (reviewId: number) => {
      setOpenDropdownId(openDropdownId === reviewId ? null : reviewId);
    },
    [openDropdownId]
  );

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (openDropdownId !== null) {
        const currentDropdown = dropdownRefs.current[openDropdownId];
        if (currentDropdown && !currentDropdown.contains(event.target as Node)) {
          setOpenDropdownId(null);
        }
      }
    };

    if (openDropdownId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openDropdownId]);

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId !== null) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [openDropdownId]);

  // 메모리 누수를 방지하는 cleanup 코드
  useEffect(() => {
    const currentReviewIds = reviews.map((review) => review.id);
    Object.keys(dropdownRefs.current).forEach((id) => {
      if (!currentReviewIds.includes(Number(id))) {
        delete dropdownRefs.current[Number(id)];
      }
    });
  }, [reviews]);

  return (
    <section className="flex flex-col gap-2 max-tb:gap-4 ">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white py-6 px-10 max-mb:py-4 max-mb:px-5 rounded-2xl shadow-sm border border-gray-300"
        >
          <div className="flex flex-col gap-4 relative">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <Rating rating={review.rating} />
                <span className="text-sm text-gray-500">{timeForToday(review.updatedAt)}</span>
              </div>
              <div
                ref={(el) => {
                  dropdownRefs.current[review.id] = el;
                }}
              >
                <button
                  aria-expanded={openDropdownId === review.id}
                  aria-haspopup="menu"
                  aria-label="리뷰 옵션 메뉴"
                  onClick={() => handleDropdownToggle(review.id)}
                >
                  <Ellipse height={ellipseSize} width={ellipseSize} />
                </button>
                {openDropdownId === review.id && (
                  <div className="absolute right-0 top-8 z-10">
                    <DropDown
                      firstText="수정하기"
                      secondText="삭제하기"
                      size={isMobile ? "small" : "default"}
                    />
                  </div>
                )}
              </div>
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
