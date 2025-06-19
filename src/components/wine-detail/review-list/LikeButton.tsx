import { jwtDecode } from "jwt-decode";
import { MouseEvent, useEffect, useState } from "react";

import { deleteReviewLike, postReviewLike } from "@/apis/reviewsApi";
import Heart from "@/components/Heart";

interface LikeButtonProps {
  isLiked: boolean;
  onLikeClick: (e: MouseEvent<HTMLButtonElement>) => void;
  size?: number;
  reviewId?: number; // 리뷰 ID 추가
  authorId?: number; // 리뷰 작성자 ID 추가
}

interface DecodedToken {
  id?: number;
  userId?: number;
  sub?: string;
  exp?: number;
  // 기타 토큰에 포함된 필드들
}

export default function LikeButton({
  isLiked,
  onLikeClick,
  size = 24,
  reviewId,
  authorId,
}: LikeButtonProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isSelfReview, setIsSelfReview] = useState(false);

  // 토큰에서 사용자 ID 추출
  useEffect(() => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        // 토큰에서 사용자 ID를 추출 (토큰 구조에 따라 다를 수 있음)
        const userId = decoded.id || decoded.userId || Number(decoded.sub);
        setCurrentUserId(userId || null);
        console.log("토큰에서 추출한 사용자 ID:", userId);
      }
    } catch (error) {
      console.error("토큰 디코딩 실패:", error);
    }
  }, []);

  // 자신의 리뷰인지 확인
  useEffect(() => {
    if (currentUserId && authorId) {
      const isSelf = Number(currentUserId) === Number(authorId);
      setIsSelfReview(isSelf);
    }
  }, [currentUserId, authorId]);
  // API 연결 좋아요 버튼 클릭 핸들러
  const handleApiLikeClick = async (e: MouseEvent<HTMLButtonElement>) => {
    // 이미 좋아요 업데이트 중이면 중복 요청 방지
    if (isUpdating || !reviewId) {
      return;
    }

    try {
      setIsUpdating(true);

      // 로컬 스토리지에서 토큰 확인
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("로그인이 필요한 기능입니다.");
        return;
      }

      // 좋아요 상태에 따라 API 호출
      if (isLiked) {
        // 좋아요 취소
        await deleteReviewLike(String(reviewId));
      } else {
        // 좋아요 추가
        await postReviewLike(String(reviewId));
      }

      // UI 업데이트를 위해 기존 onLikeClick 실행
      onLikeClick(e);
    } catch (error: any) {
      console.error("좋아요 처리 중 오류 발생:", error);

      // 403 Forbidden 오류 처리
      if (error.response?.status === 403) {
        // 자신의 리뷰인지 다시 확인
        if (currentUserId && authorId && Number(currentUserId) === Number(authorId)) {
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
