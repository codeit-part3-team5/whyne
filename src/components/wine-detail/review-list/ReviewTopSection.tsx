import { MouseEvent } from "react";
import { useState } from "react";

import Ellipse from "@/assets/ellipse-icon.svg";
import DropDown from "@/components/DropDown";
import ProfileCircle from "@/components/profile/ProfileCircle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { User } from "@/types/User";

import LikeButton from "./LikeButton";
import UserInfo from "./UserInfo";
interface ReviewTopSectionProps {
  date: string;
  user: User;
  isLiked?: boolean;
  onLikeClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  reviewId?: number; // 리뷰 ID 추가
}

export default function ReviewTopSection({
  date,
  user,
  isLiked = false,
  onLikeClick,
  reviewId,
}: ReviewTopSectionProps) {
  const isMobile = useMediaQuery("(max-width: 24.375rem)");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="flex items-center justify-between w-full relative">
      <div className="flex items-center gap-4">
        <ProfileCircle imageUrl={user.image} size={isMobile ? "mobile" : undefined} />
        <UserInfo date={date} user={user} />
      </div>
      <div className="flex items-start gap-6 mb-6 max-mb:mb-4.5 max-mb:gap-[1.125rem]">
        <LikeButton
          authorId={user.id} // 작성자 ID 전달
          isLiked={isLiked}
          reviewId={reviewId}
          size={isMobile ? 32 : 38}
          onLikeClick={(e) => onLikeClick?.(e)}
        />
        <button
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="relative"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Ellipse height="38" width="38" />
        </button>
        {isOpen && (
          <div className="absolute right-0 top-12 z-11">
            <DropDown
              firstText="수정하기"
              secondText="삭제하기"
              size={isMobile ? "small" : "default"}
            />
          </div>
        )}
      </div>
    </section>
  );
}
