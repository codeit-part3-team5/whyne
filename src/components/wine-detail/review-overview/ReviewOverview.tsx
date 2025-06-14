import ReviewSummary from "@/components/ReviewSummary";
import { WineDetailData } from "@/types/Wine";
import { getRatingDistribution } from "@/utils/reviewUtil";
interface ReviewListProps {
  wine: WineDetailData;
}

export default function ReviewOverview({ wine }: ReviewListProps) {
  const reviews = getRatingDistribution(wine.reviews);
  console.log("Rating Distribution:", reviews);
  return (
    <div className="w-[17.5rem]">
      <ReviewSummary {...wine} page="wineDetail" />
    </div>
  );
}
