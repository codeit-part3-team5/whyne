"use client";

import useModalStore from "@/store/useModalStore";

import TestContent from "./TestContent";

export default function TestPage() {
  const open = useModalStore((state) => state.open);

  const handleClickOpenModal = () => {
    open("filter", <TestContent />);
  };

  return (
    <div>
      <button onClick={handleClickOpenModal}>모달 열기</button>
    </div>
  );
}
