import PriceFilter from "../Filters/PriceFilter";
import RatingFilter from "../Filters/RatingFilter";
import TypeFilter from "../Filters/TypeFilter";

export default function FilterModal() {
  return (
    <section aria-label="모달 열기">
      <TypeFilter />
      <PriceFilter />
      <RatingFilter />
    </section>
  );
}
