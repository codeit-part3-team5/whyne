"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import CloseIcon from "@/assets/close-icon.svg";
import useModalStore from "@/store/useModalStore";
import { cn } from "@/utils/cn";

import { MODAL_CLASSNAMES } from "./modalClassNames";

const modalData = {
  filter: { title: "필터" },
  addWine: { title: "와인 등록" },
  addReview: { title: "리뷰 등록" },
  editWine: { title: "내가 등록한 와인" },
  editReview: { title: "수정하기" },
  delete: { title: "" },
  default: { title: "기본 모달" },
};

const defaultMobileStyle = `
max-mb:flex max-mb:flex-col max-mb:w-[23.438rem] max-mb:p-6 max-mb:items-end max-mb:gap-[2.5rem]
`;

const defaultMobileBackStyle = `
max-mb:rounded-b-none max-mb:shadow-[0.125rem_0.125rem_1.25rem_0_rgba(0,0,0,0.04)]

`;

const deleteBackStyle = `
rounded-2xl shadow-[0_0.125rem_1.25rem_0_rgba(0,0,0,0.04)] border border-gray300
`;

export default function Modal() {
  const [mounted, setMounted] = useState(false);
  const { isOpen, type, content, close } = useModalStore();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const { title } = modalData[type ?? "default"] || modalData.default;

  const modalClassName = MODAL_CLASSNAMES[type ?? "default"] || MODAL_CLASSNAMES.default;

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-40 "
      onClick={close}
    >
      <div
        className={cn(
          modalClassName,
          "z-50 bg-white rounded-2xl",
          defaultMobileStyle,
          type === "delete" ? deleteBackStyle : defaultMobileBackStyle
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center w-full">
            <span className="text-gray800 text-2xl font-bold leading-8 max-mb:text-xl">
              {title}
            </span>
            <button onClick={close}>
              <CloseIcon className="w-[2.125rem] h-[2.125rem] max-mb:w-[1.5rem] max-mb:h-[1.5rem]" />
            </button>
          </div>
        )}
        <div className="w-full">{content}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
}
