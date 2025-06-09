import { RecentReview, Review } from "./ReviewList";

export type WineType = "RED" | "WHITE" | "ROSE" | "SPARKLING";

export interface BaseWineData {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: WineType;
  avgRating: number;
  reviewCount: number;
  recentReview: RecentReview | null;
  userId: number;
}

export interface WineDetailData extends BaseWineData {
  reviews: Review[];
  avgRatings: Record<string, number>;
}

export type WinesResponse = {
  list: BaseWineData[];
  totalCount: number;
  nextCursor: null;
};
