import "./RatingProgress.css";

export default function RatingProgress({
  ratings,
  reviewCount,
}: {
  ratings: Record<1 | 2 | 3 | 4 | 5, number>;
  reviewCount: number;
}) {
  return (
    <div className="flex flex-col gap-[.9375rem] items-center self-stretch max-w-[280px]">
      {Object.entries(ratings)
        .sort((a, b) => Number(b[0]) - Number(a[0])) // 5점부터 1점 순으로 내림차순 정렬
        .map(([rating, count]) => (
          <div
            key={rating}
            className="gap-[.9375rem] flex items-center self-stretch max-tb:gap-1.5 max-tb:justify-between max-mb:gap-4"
          >
            <span className="text-gray500 text-right text-base font-medium leading-[normal] flex-shrink-0">
              {rating}점
            </span>
            <progress aria-label={`${rating}점 중 리뷰 비율`} max={reviewCount} value={count} />
          </div>
        ))}
    </div>
  );
}
