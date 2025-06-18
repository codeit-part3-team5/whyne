import type { BaseWineData } from "@/types/Wine";

import { axiosAuthClient, axiosClient } from "./axios/axiosConfig";

// 와인 목록 페이지
export const getWines = async (limit = 10): Promise<BaseWineData[]> => {
  const response = await axiosClient.get(`/wines?limit=${limit}`);
  return response.data.list;
};

//와인 등록하기 모달
export const postWines = async (newWine: WinePostRequest) => {
  const response = await axiosAuthClient.post("/wines", newWine);
  return response.data;
};
export type WinePostRequest = {
  name: string;
  price: number;
  region: string;
  type: "RED" | "WHITE" | "SPARKLING";
  image: string;
};
