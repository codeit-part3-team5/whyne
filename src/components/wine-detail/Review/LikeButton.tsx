import { MouseEvent } from "react";

import Heart from "@/components/Heart";

interface LikeButtonProps {
  isLiked: boolean;
  onLikeClick: (e: MouseEvent<HTMLButtonElement>) => void;
  size?: number;
}

export default function LikeButton({ isLiked, onLikeClick, size = 24 }: LikeButtonProps) {
  return (
    <button
      aria-label={isLiked ? "좋아요 취소" : "좋아요"}
      className="flex items-center justify-center hover:opacity-80 transition-opacity"
      onClick={onLikeClick}
    >
      <Heart filled={isLiked} size={size} />
    </button>
  );
}
