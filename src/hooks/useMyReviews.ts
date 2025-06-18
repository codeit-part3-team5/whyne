import { useCallback, useEffect, useState } from "react";

import { getMyReviews } from "@/apis/usersApi";
import { MyReview, MyReviewsResponse } from "@/types/ReviewList";

export const useMyReviews = (limit: number = 10) => {
  const [reviews, setReviews] = useState<MyReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [cursor, setCursor] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const loadReviews = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setLoading(true);
          setCursor(null);
        } else {
          setLoadingMore(true);
        }
        setError(null);
        const response: MyReviewsResponse = await getMyReviews(limit, isRefresh ? null : cursor);

        if (isRefresh) {
          setReviews(response.list);
        } else {
          setReviews((prev) => [...prev, ...response.list]);
        }

        setHasNext(response.nextCursor !== null);
        setCursor(response.nextCursor);
        setTotalCount(response.totalCount);
      } catch (error) {
        setError(error instanceof Error ? error.message : "리뷰를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [limit, cursor]
  );

  // 더 보기
  const loadMore = useCallback(async () => {
    if (!hasNext || loadingMore) return;
    await loadReviews(false);
  }, [hasNext, loadingMore, loadReviews]);

  // 새로고침
  const refresh = useCallback(async () => {
    await loadReviews(true);
  }, [loadReviews]);

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    loadReviews(true);
  }, [limit]);

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
