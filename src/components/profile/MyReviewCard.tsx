"use client";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { MyReview } from "@/types/ReviewList";
import { timeForToday } from "@/utils/timeForToday";

import Spinner from "../Spinner";
import Rating from "../wine-detail/review-list/Rating";
import { BaseCard } from "./BaseCard";

interface MyReviewCardProps {
  myReviews: MyReview[];
  loading: boolean;
  error: string | null;
  hasNext: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  loadingMore: boolean;
}

export default function MyReviewCard({
  myReviews,
  loading,
  error,
  hasNext,
  loadMore,
  refresh,
  loadingMore,
}: MyReviewCardProps) {
  // 무한 스크롤 훅 사용
  const { observerRef } = useInfiniteScroll({
    hasNext,
    isLoading: loadingMore,
    onLoadMore: loadMore,
    threshold: 0.1,
    rootMargin: "0px",
  });

  // 초기 로딩 상태 처리
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
        <div className="ml-3 text-gray-500">리뷰를 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex flex-col items-center p-8 gap-4">
        <div className="text-red-500">{error}</div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={refresh}
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 리뷰가 없는 경우
  if (myReviews.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">작성한 리뷰가 없습니다.</div>
      </div>
    );
  }

  return (
    <>
      <BaseCard
        dropdownOptions={{ type: "review" }}
        getId={(review) => review.id}
        getUserId={(review) => review.user.id}
        items={myReviews}
        refresh={refresh}
        renderContent={(review) => <ReviewCardContent review={review} />}
      />
      {/* 무한 스크롤 트리거 요소 */}
      {hasNext && (
        <div ref={observerRef} className="flex justify-center items-center py-8">
          {loadingMore ? (
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
              <span className="text-gray-500">더 많은 리뷰를 불러오는 중...</span>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">스크롤하여 더 많은 리뷰 보기</div>
          )}
        </div>
      )}

      {/* 모든 데이터 로드 완료 메시지 */}
      {!hasNext && myReviews.length > 0 && (
        <div className="flex justify-center py-6">
          <div className="text-gray-400 text-sm">
            모든 리뷰를 확인했습니다 ({myReviews.length}개)
          </div>
        </div>
      )}
    </>
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
