"use client";

import ReviewSummary from "@/components/ReviewSummary";
import wines from "@/mocks/winesData.json";
import useModalStore from "@/store/useModalStore";
import { WineType } from "@/types/Wine";

import TestContent from "./TestContent";

export default function TestPage() {
  const open = useModalStore((state) => state.open);
  const handleClickOpenModal = () => {
    // addReview 타입으로 모달을 열어서 range input 크기가 더 작아지는지 테스트
    open("addReview", <TestContent />);
  };

  return (
    <div className="w-100">
      <button className="m-5 bg-blue-500 text-white p-2 rounded" onClick={handleClickOpenModal}>
        모달 열기
      </button>

      <div>
        {wines.list.map((wine) => (
          <div key={wine.id} className="mb-[24px]">
            <ReviewSummary
              key={wine.id}
              page="wineDetail"
              {...{ ...wine, type: wine.type as WineType }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
