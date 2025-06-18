import type { BaseWineData } from "@/types/Wine";

import { axiosClient } from "./axios/axiosConfig";

// 와인 목록 페이지
export const getWines = async (limit = 10): Promise<BaseWineData[]> => {
  const response = await axiosClient.get(`/wines?limit=${limit}`);
  return response.data.list;
};
