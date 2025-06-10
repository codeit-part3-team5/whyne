"use client";

import useModalStore from "@/store/useModalStore";

import TestContent from "./TestContent";

export default function TestPage() {
  const open = useModalStore((state) => state.open);

  const handleClickOpenModal = () => {
    open("addWine", <TestContent />);
  };

  return (
    <div className="w-100">
      <button className="m-5 bg-blue-500 text-white p-2 rounded" onClick={handleClickOpenModal}>
        모달 열기
      </button>

      {/* 스크롤 테스트용 더미 콘텐츠 */}
      <div className="mt-20 space-y-10 px-4">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-md shadow-inner">
            더미 콘텐츠 {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
