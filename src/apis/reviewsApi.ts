import { Review } from "@/types/ReviewList";

import { axiosClient } from "./axios/axiosConfig";

export const getReviews = async (reviewId: string): Promise<Review> => {
  try {
    const { data } = await axiosClient.get<Review>(`/reviews/${reviewId}`);
    return data;
  } catch (error) {
    console.log("리뷰 API 호출 오류:", error);
    throw error;
  }
};
