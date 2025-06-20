import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { deleteReview } from "@/apis/reviewsApi";
import DeleteConfirmModal from "@/components/delete-confirm-modal/DeleteConfirmModal";
import { useAuth } from "@/hooks/useAuth";
import useModalStore from "@/store/useModalStore";
import { cn } from "@/utils/cn";

type DropDownProps = {
  firstText: string;
  secondText: string;
  size?: "default" | "small";
  authorId?: number;
  reviewId?: number;
};

export default function DropDown({
  firstText,
  secondText,
  size = "default",
  authorId,
  reviewId,
}: DropDownProps) {
  const { checkIsOwnContent } = useAuth();
  const queryClient = useQueryClient();
  const params = useParams();
  const wineId = params.id as string;
  const { open, close } = useModalStore();

  const containerSize =
    size === "small"
      ? "w-full max-w-[6.3125rem] h-[5.75rem] max-sm:max-w-[5.5rem] max-sm:h-[5rem]"
      : "w-full max-w-[7.875rem] h-[6.5rem] max-sm:max-w-[6.5rem] max-sm:h-[5.5rem]";

  const padding =
    size === "small"
      ? "px-[1rem] py-[0.5rem] text-[0.875rem] max-sm:px-[0.75rem] max-sm:py-[0.375rem] max-sm:text-[0.75rem]"
      : "px-[1.375rem] py-[0.625rem] text-[1rem] max-sm:px-[1rem] max-sm:py-[0.5rem] max-sm:text-[0.875rem]";

  const buttonStyles = `cursor-pointer text-center font-[500] bg-white hover:bg-light-purple hover:text-purple rounded-[0.75rem]`;
  const isSelfReview = checkIsOwnContent(authorId);

  const handleFirstClick = () => {
    if (firstText === "수정하기") {
      if (!isSelfReview) {
        alert("자신의 리뷰만 수정할 수 있습니다.");
        return;
      }
      console.log("수정하기");
    } else if (firstText === "마이페이지") {
      console.log("마이페이지");
    }
  };
  const handleSecondClick = async () => {
    if (secondText === "삭제하기") {
      if (!isSelfReview) {
        alert("자신의 리뷰만 삭제할 수 있습니다.");
        return;
      }

      if (!reviewId) {
        console.error("리뷰 ID가 제공되지 않았습니다.");
        return;
      }

      // 삭제 확인 모달 열기
      open(
        "delete",
        <DeleteConfirmModal
          onCancel={() => {
            close();
          }}
          onConfirm={async () => {
            try {
              await deleteReview(String(reviewId));

              if (wineId) {
                await queryClient.invalidateQueries({ queryKey: ["wine", wineId] });
              }

              close();
            } catch (error) {
              console.error("리뷰 삭제 중 오류 발생:", error);
              alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요.");
              close();
            }
          }}
        />
      );
    } else if (secondText === "로그아웃") {
      console.log("로그아웃");
    }
  };

  return (
    <div
      className={`${containerSize} border border-gray-300 flex flex-col rounded-[1rem] bg-white `}
    >
      <button
        className={cn(buttonStyles, padding, "my-[0.25rem] mx-[0.25rem]")}
        type="button"
        onClick={handleFirstClick}
      >
        {firstText}
      </button>
      <button
        className={cn(buttonStyles, padding, " mx-[0.25rem] my-[.1875rem]")}
        type="button"
        onClick={handleSecondClick}
      >
        {secondText}
      </button>
    </div>
  );
}
