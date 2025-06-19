import { MouseEvent, useState } from "react";

import Ellipse from "@/assets/ellipse-icon.svg";
import DropDown from "@/components/DropDown";
import ProfileCircle from "@/components/profile/ProfileCircle";
import { useAuth } from "@/hooks/useAuth";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { User } from "@/types/User";

import LikeButton from "./LikeButton";
import UserInfo from "./UserInfo";
interface ReviewTopSectionProps {
  date: string;
  user: User;
  isLiked?: boolean;
  onLikeClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  reviewId: number;
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
  const { checkIsOwnContent } = useAuth();

  // 현재 로그인한 사용자가 리뷰 작성자인지 확인
  const isOwnReview = checkIsOwnContent(user.id);

  return (
    <section className="flex items-center justify-between w-full relative">
      <div className="flex items-center gap-4">
        <ProfileCircle imageUrl={user.image} size={isMobile ? "mobile" : undefined} />
        <UserInfo date={date} user={user} />
      </div>
      <div className="flex items-start gap-6 mb-6 max-mb:mb-4.5 max-mb:gap-[1.125rem]">
        <LikeButton
          authorId={user.id}
          isLiked={isLiked}
          reviewId={reviewId}
          size={isMobile ? 32 : 38}
          onLikeClick={(e) => onLikeClick?.(e)}
        />

        <button
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="relative"
          disabled={!isOwnReview}
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
