import { MyReviewsResponse } from "@/types/ReviewList";
import { User } from "@/types/User";
import { WinesResponse } from "@/types/Wine";

import { axiosAuthClient } from "./axios/axiosConfig";

// 내 정보 조회
export const me: MeApi = async () => {
  const res = await axiosAuthClient.get<MeApiResponse>("/users/me");
  return res.data;
};

// 내 정보 수정 (닉네임 및 프로필 이미지)
export const updateUserProfile = async (
  nickname: string,
  imageUrl: string | null
): Promise<User> => {
  try {
    const response = await axiosAuthClient.patch<User>("/users/me", {
      nickname,
      image: imageUrl,
    });
    return response.data;
  } catch (error) {
    console.error("내 정보 수정 실패:", error);
    throw error;
  }
};

// 내가 작성한 리뷰 조회
export const getMyReviews = async (limit: number, cursor?: number | null) => {
  try {
    const params: { limit: number; cursor?: number } = { limit };
    if (cursor) params.cursor = cursor;

    const response = await axiosAuthClient.get<MyReviewsResponse>("/users/me/reviews", { params });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("내가 작성한 리뷰 조회 실패: ", error);
    } else {
      console.error("내가 작성한 리뷰 조회 실패: 알 수 없는 오류");
    }
    throw error;
  }
};

// 내가 만든 와인 목록 조회
export const getMyWines = async (limit: number, cursor?: number | null) => {
  try {
    const params: { limit: number; cursor?: number } = { limit };
    if (cursor) params.cursor = cursor;

    const response = await axiosAuthClient.get<WinesResponse>("/users/me/wines", { params });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("내가 만든 와인 목록 조회 실패:", error);
    } else {
      console.error("내가 만든 와인 목록 조회 실패: 알 수 없는 오류");
    }
    throw error;
  }
};
