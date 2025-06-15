"use client";
import { useState } from "react";

const TYPES = ["Red", "White", "Sparkling"]; //map 사용하기 위해서 지정했습니다

export default function TypeFilter() {
  const [selectType, setSelectType] = useState<string>("");

  const handleSelect = (type: string) => {
    setSelectType(type); // 와인 타입 클릭시 변하는 상태값입니다
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="font-[700] text-gray-800 text-[20px] mb-2">WINES TYPE</div>
      <div className="flex gap-5">
        {/* map 을 돌면서 클릭된 타입에 색상을 변환합니다 */}
        {TYPES.map((type) => (
          <div
            key={type}
            className={`inline-flex items-center justify-center h-[42px] px-4 border rounded-full cursor-pointer
            ${
              selectType === type
                ? "bg-purple text-white border-purple"
                : "bg-white text-black border-gray-300 hover:bg-purple hover:text-white"
            }`}
            onClick={() => handleSelect(type)}
          >
            {type}
          </div>
        ))}
      </div>
    </section>
  );
}
