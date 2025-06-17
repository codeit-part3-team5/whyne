import { Review } from "@/types/ReviewList";

import { axiosClient } from "./axios/axiosConfig";

export const getReviews = async (reviewId: string): Promise<Review> => {
  const res = await axiosClient.get(`/reviews/${reviewId}`);
  return res.data;
};
