import { Aroma } from "./Aroma";
import { Like } from "./Like";
import { User } from "./User";
import { MyReviewWine } from "./Wine";
export interface Review {
  id: number;
  rating: number;
  aroma: Aroma[];
  content: string;
  createdAt: string;
  updatedAt: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  user: User;
  isLiked: boolean;
}

export interface RecentReview {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  lightBold?: number;
  smoothTannic?: number;
  drySweet?: number;
  softAcidic?: number;
  aroma?: Aroma[];
  user?: User;
  likes?: Like[];
}

export type MyReview = Pick<
  Review,
  "id" | "user" | "rating" | "content" | "createdAt" | "updatedAt"
> & {
  wine: MyReviewWine;
};

export type MyReviewsResponse = {
  list: MyReview[];
  totalCount: number;
  nextCursor: null;
};
