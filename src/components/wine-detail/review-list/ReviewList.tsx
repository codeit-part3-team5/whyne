import { useEffect, useState } from "react";

import { WineDetailData } from "@/types/Wine";

import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  wine: WineDetailData;
}

export default function ReviewList({ wine }: ReviewListProps) {
  const [reviews, setReviews] = useState(wine.reviews);

  useEffect(() => {
    setReviews(wine.reviews);
  }, [wine.reviews]);

  const handleLikeClick = (reviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId ? { ...review, isLiked: !review.isLiked } : review
      )
    );
  };
  return (
    <section className="flex flex-col min-w-full max-w-[50rem] flex-1 gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray800">리뷰 목록</h3>
      </div>
      <div className="flex flex-col gap-5 max-tb:gap-6 max-mb:gap-4">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} onLikeClick={handleLikeClick} />
        ))}
      </div>
    </section>
  );
}
