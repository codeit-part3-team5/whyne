import { Review } from "@/types/ReviewList";

import { axiosAuthClient, axiosClient } from "./axios/axiosConfig";

export interface CreateReviewData {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[]; // 문자열 배열로 변경
  content: string;
  wineId: number;
}

// 요청 데이터 검증 및 변환 함수
const prepareReviewData = (
  data: CreateReviewData
): Omit<CreateReviewData, "wineId"> & { wineId: number } => {
  // 서버가 기대하는 형식으로 데이터 변환
  return {
    rating: Number(data.rating), // 이미 useReviewStore에서 정수로 저장됨
    lightBold: Math.round(Number(data.lightBold)),
    smoothTannic: Math.round(Number(data.smoothTannic)),
    drySweet: Math.round(Number(data.drySweet)),
    softAcidic: Math.round(Number(data.softAcidic)),
    aroma: Array.isArray(data.aroma) ? data.aroma : [],
    content: String(data.content),
    wineId: Number(data.wineId),
  };
};

export const getReviews = async (reviewId: string): Promise<Review> => {
  try {
    const { data } = await axiosClient.get<Review>(`/reviews/${reviewId}`);
    return data;
  } catch (error) {
    console.log("리뷰 API 호출 오류:", error);
    throw error;
  }
};

export const postReview = async (reviewData: CreateReviewData): Promise<Review> => {
  try {
    const preparedData = prepareReviewData(reviewData);
    const response = await axiosAuthClient.post<Review>("/reviews", preparedData);
    return response.data;
  } catch (error: any) {
    console.error("리뷰 남기기 API 오류:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const patchReview = async (
  reviewId: string,
  reviewData: Partial<CreateReviewData>
): Promise<Review> => {
  try {
    const { data } = await axiosAuthClient.patch<Review>(`/reviews/${reviewId}`, reviewData);
    return data;
  } catch (error) {
    console.log("리뷰 수정 API 호출 오류:", error);
    throw error;
  }
};

export const postReviewLike = async (reviewId: number): Promise<void> => {
  try {
    await axiosAuthClient.post(`/reviews/${reviewId}/like`);
  } catch (error) {
    console.log("리뷰 좋아요 API 호출 오류:", error);
    throw error;
  }
};

export const deleteReviewLike = async (reviewId: number): Promise<void> => {
  try {
    await axiosAuthClient.delete(`/reviews/${reviewId}/like`);
  } catch (error) {
    console.log("리뷰 좋아요 취소 API 호출 오류:", error);
    throw error;
  }
};
