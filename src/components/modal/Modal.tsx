"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import CloseIcon from "@/assets/close-icon.svg";
import useModalStore from "@/store/useModalStore";
import { cn } from "@/utils/cn";

const modalData = {
  filter: { title: "필터" },
  addWine: { title: "와인 등록" },
  addReview: { title: "리뷰 등록" },
  editWine: { title: "내가 등록한 와인" },
  editReview: { title: "수정하기" },
  delete: { title: "" },
  default: { title: "기본 모달" },
};

export default function Modal() {
  const [mounted, setMounted] = useState(false);
  const { isOpen, type, content, close } = useModalStore();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  const { title } = modalData[type ?? "default"] || modalData.default;

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-40"
      onClick={close}
    >
      <div
        className={cn(
          "flex flex-col items-end gap-10 w-[375px] max-h-[90vh] p-6",
          "rounded-[16px] bg-white shadow-[2px_2px_20px_0_rgba(0,0,0,0.04)] z-50"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center w-full mb-4">
            <span>{title}</span>
            <button onClick={close}>
              <CloseIcon height={34} width={34} />
            </button>
          </div>
        )}
        <div className="w-full">{content}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
}
