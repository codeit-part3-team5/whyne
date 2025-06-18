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
      }
    } catch (error) {
      console.error("토큰 디코딩 실패:", error);
    }
  }, []); // 자신의 리뷰인지 확인
  useEffect(() => {
    if (currentUserId && authorId) {
      setIsSelfReview(currentUserId === authorId);
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
        console.error("좋아요 처리 실패: 인증 토큰이 없습니다. 로그인이 필요합니다.");
        alert("로그인이 필요한 기능입니다.");
        return;
      }

      // 좋아요 상태에 따라 API 호출
      if (isLiked) {
        // 좋아요 취소
        await deleteReviewLike(String(reviewId));
        console.log(`리뷰 ID ${reviewId}에 대한 좋아요 취소 성공`);
      } else {
        // 좋아요 추가
        await postReviewLike(String(reviewId));
        console.log(`리뷰 ID ${reviewId}에 대한 좋아요 추가 성공`);
      }

      // UI 업데이트를 위해 기존 onLikeClick 실행
      onLikeClick(e);
    } catch (error: any) {
      console.error("좋아요 처리 중 오류 발생:", error);

      // 403 Forbidden 오류 처리
      if (error.response?.status === 403) {
        console.error("좋아요 권한 없음 (403 Forbidden):", {
          리뷰ID: reviewId,
          상태: isLiked ? "취소 시도" : "추가 시도",
          응답: error.response?.data,
        });

        // 토큰 만료 가능성이 있는 경우 로컬 스토리지의 토큰 확인
        const token = localStorage.getItem("accessToken");
        console.log("현재 토큰 상태:", token ? "토큰 있음" : "토큰 없음");

        // 사용자에게 알림
        alert("권한이 없거나 로그인이 필요합니다. 다시 로그인해 주세요.");
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
      title={isSelfReview ? "자신의 리뷰에는 좋아요를 할 수 없습니다" : ""}
      type="button"
      onClick={(e) => {
        if (isSelfReview) {
          // 자신의 리뷰인 경우 메시지만 표시
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
