import { getMyReviews } from "@/apis/usersApi";
import { MyReview } from "@/types/ReviewList";

import { PaginationResponse, usePagination } from "./usePagination";

const dummyFetcher = async (
  _limit: number,
  _cursor?: number | null
): Promise<PaginationResponse<MyReview>> => {
  return {
    list: [],
    totalCount: 0,
    nextCursor: null,
  };
};

export const useMyReviews = (limit: number = 10, options?: { enabled?: boolean }) => {
  const { enabled = true } = options || {};

  const {
    data: reviews,
    loading,
    error,
    hasNext,
    loadMore,
    refresh,
    loadingMore,
    totalCount,
  } = usePagination<MyReview>(
    enabled ? getMyReviews : dummyFetcher,
    limit,
    "리뷰를 불러오는데 실패했습니다."
  );

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
