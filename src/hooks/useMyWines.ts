import { getMyWines } from "@/apis/usersApi";
import { BaseWineData } from "@/types/Wine";

import { PaginationResponse, usePagination } from "./usePagination";

const dummyFetcher = async (
  _limit: number,
  _cursor?: number | null
): Promise<PaginationResponse<BaseWineData>> => {
  return {
    list: [],
    totalCount: 0,
    nextCursor: null,
  };
};

export const useMyWines = (limit: number = 10, options?: { enabled?: boolean }) => {
  const { enabled = true } = options || {};

  const {
    data: wines,
    loading,
    error,
    hasNext,
    loadMore,
    refresh,
    loadingMore,
    totalCount,
  } = usePagination<BaseWineData>(
    enabled ? getMyWines : dummyFetcher,
    limit,
    "와인 목록을 불러오는데 실패했습니다."
  );

  return {
    wines,
    loading,
    error,
    hasNext,
    loadMore,
    refresh,
    loadingMore,
    totalCount,
  };
};
