"use client";

import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";

import CustomStar from "./CustomStar";

interface RatingStarsProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  className?: string;
}

export default function RatingStars({
  initialRating = 0,
  onChange,
  readOnly = false,
  className,
}: RatingStarsProps) {
  const isMobile = useMediaQuery("(max-width: 390px)");
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const starRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeColor = "var(--color-purple)";
  const defaultColor = "var(--color-gray300)";
  const size = isMobile ? 24 : 32;
  const totalStars = 5;

  useEffect(() => {
    // 초기 rating 값 설정
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (selectedRating: number) => {
    if (readOnly) return;

    setRating(selectedRating);
    if (onChange) {
      onChange(selectedRating);
    }
  };
  const handleMouseEnter = (starIndex: number) => {
    if (readOnly) return;
    // 항상 정수 별점으로 호버 효과 표시
    const hoverValue = starIndex + 1;
    setHoverRating(hoverValue);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, starIndex: number) => {
    if (readOnly) return;
    // 항상 정수 별점으로 호버 효과 표시
    handleMouseEnter(starIndex);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };
  return (
    <div className={cn("flex gap-0", className)}>
      {Array.from({ length: totalStars }, (_, i) => {
        const starValue = i + 1;
        const displayValue = hoverRating || rating; // 완전한 별, 빈 별 상태 결정
        const isFullStar = displayValue >= starValue;

        return (
          <div
            key={i}
            ref={(el) => {
              starRefs.current[i] = el;
            }}
            aria-label={`${starValue} 점`}
            aria-pressed={displayValue >= starValue}
            aria-readonly={readOnly}
            aria-valuemax={5}
            aria-valuemin={0}
            aria-valuenow={rating}
            className={cn(
              "relative cursor-pointer transition-transform",
              !readOnly && "hover:scale-110",
              readOnly && "cursor-default"
            )}
            role={readOnly ? undefined : "button"}
            tabIndex={readOnly ? -1 : 0}
            onClick={() => handleClick(starValue)}
            onKeyDown={(e) => {
              if (readOnly) return;
              if (e.key === "Enter" || e.key === " ") {
                handleClick(starValue);
              }
            }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => handleMouseMove(e, i)}
          >
            <CustomStar fill={defaultColor} size={size} />{" "}
            {isFullStar && (
              <div className="absolute top-0 left-0 w-full overflow-hidden">
                <CustomStar fill={activeColor} size={size} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
