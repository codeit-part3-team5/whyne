"use client";

import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";

import CustomStar from "./CustomStar";

interface RatingStarsProps {
  initialRating?: number;
  allowHalfStar?: boolean;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  className?: string;
}

export default function RatingStars({
  initialRating = 0,
  onChange,
  readOnly = false,
  allowHalfStar = true,
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

  const handleStarClick = (e: React.MouseEvent<HTMLDivElement>, starIndex: number) => {
    if (readOnly || !allowHalfStar) return;

    const starDiv = starRefs.current[starIndex];
    if (!starDiv) return;

    const rect = starDiv.getBoundingClientRect();
    const starWidth = rect.width;
    const clickX = e.clientX - rect.left;

    const halfStarWidth = starWidth / 2;
    const selectedRating = starIndex + (clickX <= halfStarWidth ? 0.5 : 1);

    setRating(selectedRating);
    if (onChange) {
      onChange(selectedRating);
    }
  };

  const handleClick = (selectedRating: number) => {
    if (readOnly) return;

    if (!allowHalfStar) {
      setRating(selectedRating);
      if (onChange) {
        onChange(selectedRating);
      }
    }
  };

  const handleMouseEnter = (starIndex: number, isHalf: boolean = false) => {
    if (readOnly) return;
    const hoverValue = isHalf ? starIndex + 0.5 : starIndex + 1;
    setHoverRating(hoverValue);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, starIndex: number) => {
    if (readOnly || !allowHalfStar) return;

    const starDiv = starRefs.current[starIndex];
    if (!starDiv) return;
    const rect = starDiv.getBoundingClientRect();
    const halfStarWidth = rect.width / 2;
    const mouseX = e.clientX - rect.left;
    const isHalf = mouseX <= halfStarWidth;
    handleMouseEnter(starIndex, isHalf);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };
  return (
    <div className={cn("flex gap-0", className)}>
      {Array.from({ length: totalStars }, (_, i) => {
        const starValue = i + 1;
        const displayValue = hoverRating || rating;

        // 완전한 별, 반별, 빈 별 상태 결정
        const ratingFloor = Math.floor(displayValue);
        const isFullStar = ratingFloor >= starValue;
        const isHalfStar = ratingFloor === i && displayValue % 1 !== 0;

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
            onClick={(e) => (allowHalfStar ? handleStarClick(e, i) : handleClick(starValue))}
            onKeyDown={(e) => {
              if (readOnly) return;
              if (e.key === "Enter" || e.key === " ") {
                if (allowHalfStar) {
                  handleStarClick(e as unknown as React.MouseEvent<HTMLDivElement>, i);
                } else {
                  handleClick(starValue);
                }
              }
            }}
            onMouseEnter={() => !allowHalfStar && handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => handleMouseMove(e, i)}
          >
            <CustomStar fill={defaultColor} size={size} />
            {(isFullStar || isHalfStar) && (
              <div className="absolute top-0 left-0 w-full overflow-hidden">
                <CustomStar fill={activeColor} isHalf={isHalfStar} size={size} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
