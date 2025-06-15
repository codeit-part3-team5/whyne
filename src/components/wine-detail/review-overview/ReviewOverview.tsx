import ReviewSummary from "@/components/ReviewSummary";
import { WineDetailData } from "@/types/Wine";
import { cn } from "@/utils/cn";
import { getRatingDistribution } from "@/utils/reviewUtil";

import RatingProgress from "./RatingProgress";

export default function ReviewOverview({ wine }: { wine: WineDetailData }) {
  const reviews = getRatingDistribution(wine.reviews);

  const handleClick = () => {
    // Open modal logic here, e.g., using a modal store or context
    console.log("Open review modal");
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-7.5 max-w-full h-auto max-tb:max-w-[36.125rem] max-mb:w-full",
        "max-tb:relative max-tb:flex-col-reverse"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4 w-full items-start",
          "max-tb:flex-row max-tb:gap-20 max-tb:w-full",
          "max-[575px]:!gap-4.5  max-mb:flex-col "
        )}
      >
        <ReviewSummary {...wine} page="wineDetail" />
        <RatingProgress ratings={reviews} reviewCount={wine.reviewCount} />
      </div>
      <button
        className={cn(
          "flex w-[7.0625rem] h-[2.625rem] px-5 py-4 justify-center items-center max-mb:h-[2.4rem] max-mb:px-4 ",
          "rounded-xl bg-purple text-white",
          "text-center text-base font-bold leading-6 max-mb:text-sm",
          "max-tb:absolute max-tb:bottom-4.5 max-tb:left-0 max-mb:left-auto max-mb:right-0 max-mb:top-0"
        )}
        onClick={handleClick}
      >
        리뷰 남기기
      </button>
    </div>
  );
}
