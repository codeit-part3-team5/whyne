import { MouseEvent } from "react";

import type { Aroma } from "@/types/Aroma";
import type { User } from "@/types/User";

import ProfileCircle from "../profile/ProfileCircle";
import LikeButton from "./LikeButton";
import UserInfo from "./UserInfo";

interface ReviewTopSectionProps {
  date: string;
  user: User;
  aroma: Aroma[];
  rating: number;
  isLiked?: boolean;
  onLikeClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function ReviewTopSection({
  date,
  user,
  aroma,
  rating,
  isLiked = false,
  onLikeClick,
}: ReviewTopSectionProps) {
  console.log(aroma, rating);
  return (
    <section className="flex flex-col items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <ProfileCircle imageUrl={user.image} />
        <UserInfo date={date} user={user} />
      </div>
      <div>
        <LikeButton isLiked={isLiked} onLikeClick={(e) => onLikeClick?.(e)} />
      </div>
    </section>
  );
}
