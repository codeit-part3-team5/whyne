// 평점을 숫자로만 보여주는 컴포넌트입니다.

import { cn } from "@/utils/cn";

type RatingScoreProps = {
  avgRating: number;
  className?: string;
};

export default function RatingScore({ avgRating, className }: RatingScoreProps) {
  return (
    <div className={cn("text-gray-800 text-[2.25rem] font-[800] px-[0.3125rem]", className)}>
      {avgRating.toFixed(1)}
    </div>
  );
}
