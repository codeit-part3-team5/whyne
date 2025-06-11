import { Aroma } from "@/types/Aroma";

import AromaList from "./AromaList";

export default function ReviewMiddleSection({
  aromas,
  rating,
}: {
  aromas: Aroma[];
  rating: number;
}) {
  console.log(rating, aromas);
  return (
    <section className="flex flex-col w-full max-w-[50rem] gap-6">
      <AromaList />
    </section>
  );
}
