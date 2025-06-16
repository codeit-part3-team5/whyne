"use client";

import { MyReview } from "@/types/ReviewList";
import { timeForToday } from "@/utils/timeForToday";

import Rating from "../wine-detail/review-list/Rating";
import { BaseCard } from "./BaseCard";

interface MyReviewCardProps {
  myReviews: MyReview[];
}

export default function MyReviewCard({ myReviews }: MyReviewCardProps) {
  const handleEdit = (review: MyReview) => {
    // 리뷰 수정 로직
    console.warn("Edit review:", review);
  };

  const handleDelete = (review: MyReview) => {
    // 리뷰 삭제 로직
    console.warn("Delete review:", review);
  };

  return (
    <BaseCard
      dropdownOptions={{ firstText: "수정하기", secondText: "삭제하기" }}
      getId={(review) => review.id}
      items={myReviews}
      renderContent={(review) => <ReviewCardContent review={review} />}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
}

function ReviewCardContent({ review }: { review: MyReview }) {
  return (
    <div className="flex flex-col gap-2 max-tb:gap-4">
      {/* 상단: 평점과 시간 */}
      <div className="flex items-center gap-4">
        <Rating rating={review.rating} />
        <span className="text-sm text-gray-500">{timeForToday(review.updatedAt)}</span>
      </div>

      {/* 와인 이름 */}
      <h3 className="font-medium text-gray-500 mb-2 text-base max-tb:text-sm">
        {review.wine.name || "이름 없음"}
      </h3>

      {/* 리뷰 내용 */}
      <p className="text-base max-mb:text-sm text-gray-800 break-words whitespace-normal">
        {review.content}
      </p>
    </div>
  );
}
