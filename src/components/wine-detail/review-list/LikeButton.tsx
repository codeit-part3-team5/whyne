import { MouseEvent, useState } from "react";

import { deleteReviewLike, postReviewLike } from "@/apis/reviewsApi";
import Heart from "@/components/Heart";
import { useAuth } from "@/hooks/useAuth";

interface LikeButtonProps {
  isLiked: boolean;
  onLikeClick: (e: MouseEvent<HTMLButtonElement>) => void;
  size?: number;
  reviewId: number;
  authorId: number;
}

export default function LikeButton({
  isLiked,
  onLikeClick,
  size = 24,
  reviewId,
  authorId,
}: LikeButtonProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { isAuthenticated, checkIsOwnContent } = useAuth();

  // 자신의 리뷰인지 확인
  const isSelfReview = checkIsOwnContent(authorId);
  // API 연결 좋아요 버튼 클릭 핸들러
  const handleApiLikeClick = async (e: MouseEvent<HTMLButtonElement>) => {
    // 이미 좋아요 업데이트 중이면 중복 요청 방지
    if (isUpdating || !reviewId) {
      return;
    }

    try {
      setIsUpdating(true);

      // 인증 확인
      if (!isAuthenticated) {
        alert("로그인이 필요한 기능입니다.");
        return;
      }

      // 좋아요 상태에 따라 API 호출
      if (isLiked) {
        // 좋아요 취소
        await deleteReviewLike(reviewId);
      } else {
        // 좋아요 추가
        await postReviewLike(reviewId);
      }

      // UI 업데이트를 위해 기존 onLikeClick 실행
      onLikeClick(e);
    } catch (error: any) {
      console.error("좋아요 처리 중 오류 발생:", error);

      // 403 Forbidden 오류 처리
      if (error.response?.status === 403) {
        // 자신의 리뷰인지 다시 확인
        if (checkIsOwnContent(authorId)) {
          alert("자신의 리뷰에는 좋아요를 할 수 없습니다.");
        } else {
          alert("권한이 없거나 로그인이 필요합니다. 다시 로그인해 주세요.");
        }
      }
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <button
      aria-label={isLiked ? "좋아요 취소" : "좋아요"}
      className={`flex items-center justify-center hover:opacity-80 transition-opacity ${isSelfReview ? "opacity-70" : ""}`}
      disabled={isUpdating}
      type="button"
      onClick={(e) => {
        if (isSelfReview) {
          alert("자신의 리뷰에는 좋아요를 할 수 없습니다.");
          return;
        }
        // 자신의 리뷰가 아닌 경우 정상 처리
        if (reviewId) {
          handleApiLikeClick(e);
        } else {
          onLikeClick(e);
        }
      }}
    >
      <Heart filled={isLiked} size={size} />
    </button>
  );
}
