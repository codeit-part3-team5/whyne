"use client";
import { useId } from "react"; // 같은 모달이 두개 렌더링 될 때 중복을 막기 위해서 고유한 이름을 사용합니다

interface RatingFilterProps {
  selected: string | null;
  onChange: (value: string | null) => void;
}

const ratingOptions = [
  { label: "전체", value: "all" },
  { label: "4.5 - 5.0", value: "4.5" },
  { label: "4.0 - 4.5", value: "4.0" },
  { label: "3.5 - 4.0", value: "3.5" },
  { label: "3.0 - 3.5", value: "3.0" },
];

export default function RatingFilter({ selected, onChange }: RatingFilterProps) {
  const ratingName = useId(); // 고유 name 생성

  return (
    <section className="flex flex-col gap-3 text-gray-800 mt-4">
      <div className="font-[700] text-[20px] mb-2">RATING</div>

      {ratingOptions.map((option) => {
        const isAll = option.value === "all";
        const isChecked = isAll ? selected === null : selected === option.value;

        return (
          <label
            key={option.value}
            className="relative flex gap-4 text-[1rem] font-[500] cursor-pointer items-center"
          >
            <input
              checked={isChecked}
              className="peer w-[20px] h-[20px] rounded-md appearance-none bg-gray-100 border border-gray-300 cursor-pointer relative"
              name={ratingName} // 고유 name 적용 wines/page.tsx 와 같은 필터이기 때문에 차별성을 주기 위해 다른 이름 부여
              type="radio"
              value={option.value}
              onChange={() => onChange(isAll ? null : option.value)}
            />
            <div className="pointer-events-none absolute w-[10px] h-[10px] bg-purple rounded-[3px] peer-checked:block hidden ml-[5px]" />
            <div>{option.label}</div>
          </label>
        );
      })}
    </section>
  );
}
