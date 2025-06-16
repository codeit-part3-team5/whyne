import WineIcon from "@/assets/wine-icon.svg";
import RatingStars from "@/components/RatingStars";
import { useReviewStore } from "@/store/useReviewStore";

interface ReviewTitleProps {
  wineName: string;
}

export default function ReviewTitle({ wineName }: ReviewTitleProps) {
  const size = 54;
  const rating = useReviewStore((state) => state.rating);
  const setRating = useReviewStore((state) => state.setRating);

  return (
    <section className="flex items-center gap-4 w-full">
      <div className="flex items-center w-17 h-full min-h-17 p-[7px] rounded-lg bg-gray100">
        <WineIcon height={size} width={size} />
      </div>
      <div className="flex flex-col items-start w-full gap-2 max-mb:w-[11.9375rem] ">
        <h2 className="text-lg font-semibold text-gray800 leading-6.5">{wineName}</h2>
        <div className="flex items-center gap-2">
          <RatingStars allowHalfStar initialRating={rating} onChange={setRating} />
          {rating > 0 && (
            <span className="text-base max-mb:text-sm  font-medium text-center text-gray500">
              {rating.toFixed(1)} 점
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
