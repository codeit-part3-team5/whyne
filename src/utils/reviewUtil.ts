import { Review } from "@/types/ReviewList";

export const getRatingDistribution = (reviews: Review[]) => {
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  reviews.forEach(({ rating }) => {
    const floored = Math.floor(rating);
    if (floored >= 1 && floored <= 5) {
      distribution[floored as 1 | 2 | 3 | 4 | 5]++;
    }
  });

  return distribution;
};
