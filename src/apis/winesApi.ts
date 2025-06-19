import type { BaseWineData, WineDetailData } from "@/types/Wine";

import { axiosAuthClient, axiosClient } from "./axios/axiosConfig";

// 와인 목록 페이지
export const getWines = async (limit = 10): Promise<BaseWineData[]> => {
  try {
    const response = await axiosClient.get(`/wines?limit=${limit}`);
    return response.data.list;
  } catch (error) {
    console.error("와인 목록을 불러오는데 실패했습니다.", error);
    throw error;
  }
};

//와인 등록하기 모달
export const postWines = async (newWine: WinePostRequest) => {
  try {
    const response = await axiosAuthClient.post("/wines", newWine);
    return response.data;
  } catch (error) {
    console.error("와인 등록하는데 실패했습니다.", error);
    throw error;
  }
};

export type WinePostRequest = {
  name: string;
  price: number;
  region: string;
  type: "RED" | "WHITE" | "SPARKLING";
  image: string;
};

// 개발용 테스트 토큰 설정 함수
export const setDevelopmentToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
  console.log("개발용 토큰이 설정되었습니다.");
};

// 로그인 상태 확인 함수
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  const token = window.localStorage.getItem("accessToken");
  return !!token; // 토큰이 존재하면 true, 없으면 false
};

export const getWineDetail = async (wineId: string): Promise<WineDetailData> => {
  // 로그인 상태 확인
  if (!isAuthenticated()) {
    console.error("인증이 필요합니다. 로그인 후 다시 시도해주세요.");
    throw new Error("인증이 필요합니다");
  }

  try {
    const res = await axiosAuthClient.get<WineDetailData>(`/wines/${wineId}`);
    return res.data;
  } catch (error) {
    console.error("Wine API 호출 오류:", error);
    throw error;
  }
};
