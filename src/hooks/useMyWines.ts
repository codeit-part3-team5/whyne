import { getMyWines } from "@/apis/usersApi";
import { BaseWineData } from "@/types/Wine";

import { usePagination } from "./usePagination";

export const useMyWines = (limit: number = 10) => {
  const {
    data: wines,
    loading,
    error,
    hasNext,
    loadMore,
    refresh,
    loadingMore,
    totalCount,
  } = usePagination<BaseWineData>(getMyWines, limit, "와인 목록을 불러오는데 실패했습니다.");

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
