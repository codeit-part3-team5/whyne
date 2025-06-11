import { MouseEvent } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
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
  const isMobile = useMediaQuery("(max-width: 375px)");

  console.log(aroma, rating);

  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <ProfileCircle imageUrl={user.image} />
        <UserInfo date={date} user={user} />
      </div>
      <div>
        <LikeButton
          isLiked={isLiked}
          size={isMobile ? 24 : 32}
          onLikeClick={(e) => onLikeClick?.(e)}
        />
      </div>
    </section>
  );
}
