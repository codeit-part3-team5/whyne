interface RatingFilterProps {
  selected: string | null;
  onChange: (value: string | null) => void;
}
//map 사용 위해서 평점들을 객체로 전환
const ratingOptions = [
  { label: "전체", value: "all" },
  { label: "4.5 - 5.0", value: "4.5" },
  { label: "4.0 - 4.5", value: "4.0" },
  { label: "3.5 - 4.0", value: "3.5" },
  { label: "3.0 - 3.5", value: "3.0" },
];

export default function RatingFilter({ selected, onChange }: RatingFilterProps) {
  return (
    <section className="flex flex-col gap-3 text-gray-800 mt-4">
      <div className="font-[700] text-[20px] mb-2">RATING</div>

      {ratingOptions.map((option) => (
        <label
          key={option.value}
          className="relative flex gap-4 text-[1rem] font-[500] cursor-pointer items-center"
        >
          <input
            checked={selected === option.value}
            className="peer w-[20px] h-[20px] rounded-md appearance-none bg-gray-100 border border-gray-300 cursor-pointer relative"
            name="rating"
            type="radio"
            value={option.value}
            onChange={() => onChange(selected === option.value ? null : option.value)}
          />
          <div className="pointer-events-none absolute w-[10px] h-[10px] bg-purple rounded-[3px] peer-checked:block hidden ml-[5px]" />
          <div>{option.label}</div>
        </label>
      ))}
    </section>
  );
}
