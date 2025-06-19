"use client";

import Button from "@/components/Button";

interface DeleteConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({ onCancel, onConfirm }: DeleteConfirmModalProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 w-[22.0625rem]">
      <p className="text-center text-gray800 text-xl font-bold leading-8">정말 삭제하시겠습니까?</p>
      <div className="flex  gap-4 w-full">
        <Button size="md" variant="cancel" onClick={onCancel}>
          취소
        </Button>
        <Button size="md" variant="primary" onClick={onConfirm}>
          삭제하기
        </Button>
      </div>
    </div>
  );
}
