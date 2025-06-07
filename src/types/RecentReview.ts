import { Aroma } from "./Aroma";
import { Like } from "./Like";
import { User } from "./User";

export interface RecentReview {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: Aroma[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  likes: Like[];
}
