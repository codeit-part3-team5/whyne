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
    <div className="flex flex-col">
      <div>
        <ReviewSummary {...wine} page="wineDetail" />
        <RatingProgress ratings={reviews} />
      </div>
      <button
        className={cn(
          "flex w-[7.0625rem] h-[2.625rem] px-5 py-4  justify-center items-center",
          "rounded-xl bg-purple text-white",
          "text-base font-bold leading-6 text-center"
        )}
        onClick={handleClick}
      >
        리뷰 남기기
      </button>
    </div>
  );
}
