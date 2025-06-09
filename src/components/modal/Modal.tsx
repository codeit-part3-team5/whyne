"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import CloseIcon from "@/assets/close-icon.svg";
import useModalStore from "@/store/useModalStore";

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
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <span>{title}</span>
            <button onClick={close}>
              <CloseIcon height={34} width={34} />
            </button>
          </div>
        )}
        <div className="modal-body">{content}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
}
