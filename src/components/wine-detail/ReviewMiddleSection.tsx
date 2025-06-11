import { Aroma } from "@/types/Aroma";
import { getKoreanAroma } from "@/utils/aromaConverter";

import AromaItem from "./AromaItem";
import Rating from "./Rating";

export default function ReviewMiddleSection({
  aromas,
  rating,
}: {
  aromas: Aroma[];
  rating: number;
}) {
  console.log(rating, aromas);
  return (
    <section className="flex w-full items-start justify-between self-stretch">
      <div className="flex gap-2.5 overflow-x-auto whitespace-nowrap max-w-[70%] scroll-hide">
        {aromas.map((aroma) => (
          <AromaItem key={aroma} aroma={getKoreanAroma(aroma)} />
        ))}
      </div>
      <Rating rating={rating} />
    </section>
  );
}
