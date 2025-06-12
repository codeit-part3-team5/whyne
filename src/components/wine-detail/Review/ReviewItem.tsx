import { MouseEvent } from "react";
import { useState } from "react";

import Arrow from "@/components/Arrow";
import { Review } from "@/types/ReviewList";
import { cn } from "@/utils/cn";
import { timeForToday } from "@/utils/timeFotToday";

import ReviewBottomSection from "./ReviewBottomSection";
import ReviewMiddleSection from "./ReviewMiddleSection";
import ReviewTopSection from "./ReviewTopSection";

interface ReviewItemProps {
  review: Review;
  onLikeClick?: (reviewId: number) => void;
}
export default function ReviewItem({ review, onLikeClick }: ReviewItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUp, setIsUp] = useState(false);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setIsUp((prev) => !prev);
  };

  const handleLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onLikeClick?.(review.id);
  };

  return (
    <article
      className={cn(
        "flex flex-col border border-gray300 bg-white rounded-2xl items-center px-10 max-tb:gap-6  pb-5 ",
        isOpen
          ? "pt-[1.0313rem] gap-5 max-mb:gap-4  max-tb:pt-[1.875rem] max-mb:py-4 max-mb:px-5"
          : "pt-[1.875rem] gap-3.5 max-tb:gap-[1.0313rem] max-tb:pt-8 max-tb:pb-6  max-mb:pt-4 max-mb:pb-2 max-mb:px-[.875rem]"
      )}
    >
      <ReviewTopSection
        date={timeForToday(review.updatedAt)}
        isLiked={review.isLiked}
        user={review.user}
        onLikeClick={handleLikeClick}
      />
      <ReviewMiddleSection aromas={review.aroma} rating={review.rating} />
      {isOpen && (
        <ReviewBottomSection
          content={review.content}
          drySweet={review.drySweet}
          lightBold={review.lightBold}
          smoothTannic={review.smoothTannic}
          softAcidic={review.softAcidic}
        />
      )}
      <button className="text-left text-gray800" onClick={toggleOpen}>
        <Arrow direction={isUp ? "up" : undefined} />
      </button>
    </article>
  );
}
