import { User } from "@/types/User";

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
