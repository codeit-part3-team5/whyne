// 이미지, 별점, 이름이 적힌 와인카드

import Star from "@/components/Star";
import { BaseWineData } from "@/types/Wine";

import RatingScore from "./RatingScore";

interface Props {
  wine: BaseWineData;
}

export default function MiniWineCard({ wine }: Props) {
  return (
    <div className="w-[14.5rem] h-[11.5625rem] bg-white rounded-[1rem] px-[1.5625rem] py-[1.25rem] flex gap-4">
      <div className="shrink-0">
        <img
          alt={wine.name}
          className="w-[2.75rem] h-[10.0625rem] object-cover object-bottom select-none pointer-events-none"
          src={wine.image}
        />
      </div>
      <div className="flex flex-col items-start h-full w-full">
        <RatingScore avgRating={wine.avgRating} />
        <div className="w-full h-[1.125rem] mt-[0.2rem]">
          <Star avgRating={wine.avgRating} />
        </div>
        <div className="mt-2 text-gray-500 text-[] font-[400] whitespace-pre-line leading-tight break-words">
          {wine.name}
        </div>
      </div>
    </div>
  );
}
