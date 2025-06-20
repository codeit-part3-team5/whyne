import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
/**
 * 페이지네이션 응답 타입
 */
export interface PaginationResponse<T> {
  list: T[];
  totalCount: number;
  nextCursor: number | null;
}

/**
 * 페이지네이션 API 함수 타입
 */
type PaginationFetcher<T> = (
  limit: number,
  cursor?: number | null
) => Promise<PaginationResponse<T>>;

/**
 * 범용 페이지네이션 훅
 *
 * @param fetcher - 데이터를 가져오는 API 함수
 * @param limit - 한 번에 가져올 데이터 개수
 * @param errorMessage - 에러 발생 시 표시할 메시지
 */
export const usePagination = <T>(
  fetcher: PaginationFetcher<T>,
  limit: number = 10,
  errorMessage: string = "데이터를 불러오는데 실패했습니다."
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const cursorRef = useRef<number | null>(null);

  const loadData = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setLoading(true);
          cursorRef.current = null;
        } else {
          setLoadingMore(true);
        }
        setError(null);

        const response = await fetcher(limit, isRefresh ? null : cursorRef.current);

        if (isRefresh) {
          setData(response.list);
        } else {
          setData((prev) => [...prev, ...response.list]);
        }

        cursorRef.current = response.nextCursor; // ✅ 최신 커서 저장
        setHasNext(response.nextCursor !== null);
        setTotalCount(response.totalCount);
      } catch (error) {
        setError(error instanceof Error ? error.message : errorMessage);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [fetcher, limit, errorMessage] // ✅ cursor 빠짐!
  );

  const loadMore = useCallback(async () => {
    if (!hasNext || loadingMore) return;
    await loadData(false);
  }, [hasNext, loadingMore, loadData]);

  const refresh = useCallback(async () => {
    await loadData(true);
  }, [loadData]);

  useEffect(() => {
    loadData(true);
  }, [loadData]);

  return {
    data,
    loading,
    error,
    hasNext,
    loadMore,
    refresh,
    loadingMore,
    totalCount,
  };
};
