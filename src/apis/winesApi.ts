import { WineDetailData } from "@/types/Wine";

import { axiosAuthClient } from "./axios/axiosConfig";

// 개발용 테스트 토큰 설정 함수
export const setDevelopmentToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
  console.log("개발용 토큰이 설정되었습니다.");
};

// 로그인 상태 확인 함수
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("accessToken");
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
