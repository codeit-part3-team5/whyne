import { Aroma } from "./Aroma";
import { Like } from "./Like";
import { User } from "./User";
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
  isLikes: boolean;
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
