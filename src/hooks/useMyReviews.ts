import { getMyReviews } from "@/apis/usersApi";
import { MyReview } from "@/types/ReviewList";

import { usePagination } from "./usePagination";

export const useMyReviews = (limit: number = 10) => {
  const {
    data: reviews,
    loading,
    error,
    hasNext,
    loadMore,
    refresh,
    loadingMore,
    totalCount,
  } = usePagination<MyReview>(getMyReviews, limit, "리뷰를 불러오는데 실패했습니다.");

  return {
    reviews,
    loading,
    error,
    hasNext,
    loadMore,
    refresh,
    loadingMore,
    totalCount,
  };
};
