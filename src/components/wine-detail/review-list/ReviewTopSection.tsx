import { MouseEvent } from "react";

import Ellipse from "@/assets/ellipse-icon.svg";
import ReviewDropDown from "@/components/dropdown/ReviewDropDown";
import ProfileCircle from "@/components/profile/ProfileCircle";
import { useDropdown } from "@/hooks/useDropdown";
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

  // 단일 리뷰를 위한 배열 생성
  const reviewItem = { id: reviewId, user };
  const { openDropdownId, dropdownRefs, handleDropdownToggle } = useDropdown(
    [reviewItem],
    (item) => item.id
  );

  const isOpen = openDropdownId === reviewId;

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
          onClick={() => handleDropdownToggle(reviewId)}
        >
          <Ellipse height="38" width="38" />
        </button>
        {isOpen && (
          <div
            ref={(el) => {
              dropdownRefs.current[reviewId] = el;
            }}
            className="absolute right-0 top-12 z-11"
          >
            <ReviewDropDown
              authorId={user.id}
              reviewId={reviewId}
              size={isMobile ? "small" : "default"}
            />
          </div>
        )}
      </div>
    </section>
  );
}
