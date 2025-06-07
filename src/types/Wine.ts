import { RecentReview } from "./RecentReview";
import { Review } from "./Review";

export type WineType = "RED" | "WHITE" | "ROSE" | "SPARKLING";

export interface WineListData {
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

export interface WineDetailData {
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
  reviews: Review[];
  avgRatings: {
    [key: string]: number;
  };
}
