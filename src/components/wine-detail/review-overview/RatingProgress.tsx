export default function RatingProgress({
  ratings,
}: {
  ratings: Record<1 | 2 | 3 | 4 | 5, number>;
}) {
  return (
    <div>
      {Object.entries(ratings).map(([rating, count]) => (
        <div key={rating}>
          <div>
            {rating}:{count}
          </div>
        </div>
      ))}
    </div>
  );
}
