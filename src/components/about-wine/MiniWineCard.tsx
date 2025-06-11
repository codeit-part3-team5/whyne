// 이미지, 별점, 이름이 적힌 와인카드

import Star from "@/components/Star";
import { BaseWineData } from "@/types/Wine";

import RatingScore from "./RatingScore";

interface Props {
  wine: BaseWineData;
}

export default function MiniWineCard({ wine }: Props) {
  return (
    <div className="w-[232px] h-[185px] bg-white rounded-[16px] px-[25px] py-[20px] flex gap-4">
      <div className="w-[44px] h-[161px] shrink-0">
        <img
          alt={wine.name}
          className="w-full h-full object-contain object-bottom"
          src={wine.image}
        />
      </div>
      <div className="flex flex-col justify-end pb-[15px]">
        <RatingScore avgRating={wine.avgRating} />
        <div className="w-[90px] h-[18px] mb-3">
          <Star avgRating={wine.avgRating} />
        </div>
        <div className="text-gray-500 text-[12px] font-[400] whitespace-pre-line leading-tight break-words">
          {wine.name}
        </div>
      </div>
    </div>
  );
}
