import { MouseEvent } from "react";

import { Review } from "@/types/ReviewList";
import { timeForToday } from "@/utils/timeFotToday";

import ReviewTopSection from "./ReviewTopSection";

interface ReviewItemProps {
  review: Review;
  onLikeClick?: (reviewId: number) => void;
}

export default function ReviewItem({ review, onLikeClick }: ReviewItemProps) {
  const handleLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onLikeClick?.(review.id);
  };

  return (
    <article className="flex flex-col gap-4 p-6 border border-gray300 rounded-2xl">
      <ReviewTopSection
        aroma={review.aroma}
        date={timeForToday(review.createdAt)}
        isLiked={review.isLiked}
        rating={review.rating}
        user={review.user}
        onLikeClick={handleLikeClick}
      />
      <p className="text-gray800 whitespace-pre-line">{review.content}</p>
    </article>
  );
}
