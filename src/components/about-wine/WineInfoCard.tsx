import Image from "next/image";

import arrowIcon from "@/assets/arrow-icon.png";
import { BaseWineData } from "@/types/Wine";

import ReviewSummary from "../ReviewSummary";

interface Props {
  data: BaseWineData;
}

export default function WineInfoCard({ data }: Props) {
  return (
    <section className="border border-gray-300 rounded-[1rem] w-full max-w-[50rem] h-auto p-[0.5rem] flex flex-col my-[30px]">
      <div className="flex gap-[0.625rem]">
        {/* 이미지 */}
        <div className="w-[12.5rem] h-full bg-white rounded-md overflow-hidden flex items-end justify-center text-gray-400 text-sm">
          {data.image ? (
            <img
              alt={data.name}
              className="w-[12.5rem] h-[13.0625rem] object-contain object-bottom"
              src={data.image}
            />
          ) : (
            "이미지"
          )}
        </div>

        {/* 가운데 텍스트 정보 */}
        <div className="flex flex-col justify-between h-[13.0625rem] py-[0.5rem] mt-[1rem] flex-1">
          <div className="min-h-[6.25rem]">
            <div className="font-[600] text-[30px] max-[640px]:text-[1.1rem] leading-tight break-words max-w-[22rem]">
              {data.name}
            </div>
            <div className="font-[400] text-[1rem] text-gray-500 mt-2">{data.region}</div>
          </div>
          <div className="bg-light-purple rounded-[0.75rem] w-[7.125rem] h-[2.3125rem] flex items-center justify-center mb-2">
            <span className="text-purple font-[700] text-[1.125rem]">
              ₩ {data.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 오른쪽: 평점, 화살표 */}
        <div className="mt-4 flex flex-col items-center justify-between h-[13.0625rem] mr-10">
          <ReviewSummary {...data} />
          <Image
            alt="상세페이지 이동"
            className="cursor-pointer ml-12 mb-3"
            height={36}
            src={arrowIcon}
            width={36}
          />
        </div>
      </div>
      {/* 최신후기와 후기 보여주는 부분 */}
      {data.recentReview && (
        <div className="border-t border-gray-300 pt-3 mt-1 w-full px-[15px] py-[15px]">
          <div className="text-[1rem] font-[600] text-gray-800 mb-1 ml-6">최신 후기</div>
          <div className="text-[1rem] font-[400] text-gray-500 leading-relaxed whitespace-pre-line ml-6">
            "{data.recentReview.content}"
          </div>
        </div>
      )}
    </section>
  );
}
