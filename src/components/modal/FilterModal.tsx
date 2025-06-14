import PriceFilter from "../Filters/PriceFilter";
import RatingFilter from "../Filters/RatingFilter";
import TypeFilter from "../Filters/TypeFilter";

export default function FilterModal() {
  return (
    <section>
      <TypeFilter />
      <PriceFilter />
      <RatingFilter />
    </section>
  );
}
