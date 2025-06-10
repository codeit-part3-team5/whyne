import { WineDetailData } from "@/types/Wine";

export default function ReviewList({ wine }: { wine: WineDetailData }) {
  return (
    <section>
      <h3>리뷰 목록</h3>
      {wine.reviews.map((review) => (
        <div key={review.id}>{review.content}</div>
      ))}
    </section>
  );
}
