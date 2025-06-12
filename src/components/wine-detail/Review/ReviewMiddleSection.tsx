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
    <section className="relative flex w-full items-start justify-between self-stretch">
      <div className="flex gap-2.5 max-mb:gap-1.5 overflow-x-auto whitespace-nowrap scroll-hide">
        {aromas.map((aroma) => (
          <AromaItem key={aroma} aroma={getKoreanAroma(aroma)} />
        ))}
      </div>
      <div className="z-9 absolute right-[2.1875rem] bottom-[.0625rem] w-[6.75rem] h-9  bg-gradient-to-r from-transparent to-white" />
      <Rating rating={rating} />
    </section>
  );
}
