import ReviewSummary from "@/components/ReviewSummary";
import wines from "@/mocks/winesData.json";
import { WineType } from "@/types/Wine";
// import wine from "@/mocks/winesDetail.json";

export default function TestPage() {
  return (
    <div>
      {wines.list.map((wine) => (
        <div key={wine.id} className="mb-[24px]">
          <ReviewSummary
            key={wine.id}
            direction="column"
            {...{ ...wine, type: wine.type as WineType }}
          />
        </div>
      ))}
    </div>
  );
}
