import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { deleteReview } from "@/apis/reviewsApi";
import { useAuth } from "@/hooks/useAuth";

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

  const containerSize =
    size === "small"
      ? "w-full max-w-[6.3125rem] h-[5.75rem] sm:max-w-[5.5rem] sm:h-[5rem]"
      : "w-full max-w-[7.875rem] h-[6.5rem] sm:max-w-[6.5rem] sm:h-[5.5rem]";

  const padding =
    size === "small"
      ? "px-[1rem] py-[0.5rem] text-[0.875rem] sm:px-[0.75rem] sm:py-[0.375rem] sm:text-[0.75rem]"
      : "px-[1.375rem] py-[0.625rem] text-[1rem] sm:px-[1rem] sm:py-[0.5rem] sm:text-[0.875rem]";

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

      try {
        await deleteReview(reviewId);

        // 리뷰 삭제 성공 후 와인 데이터 쿼리 무효화하여 재요청
        if (wineId) {
          await queryClient.invalidateQueries({ queryKey: ["wine", wineId] });
        }
      } catch (error) {
        console.error("리뷰 삭제 중 오류 발생:", error);
        alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    } else if (secondText === "로그아웃") {
      console.log("로그아웃");
    }
  };

  return (
    <div
      className={`${containerSize} border border-gray-300 flex flex-col rounded-[1rem] bg-white`}
    >
      <button
        className={`cursor-pointer bg-light-purple rounded-[0.75rem] text-center text-purple font-[500] my-[0.25rem] mx-[0.25rem] ${padding}`}
        type="button"
        onClick={handleFirstClick}
      >
        {firstText}
      </button>
      <button
        className={`cursor-pointer text-center font-[500] ${padding}`}
        type="button"
        onClick={handleSecondClick}
      >
        {secondText}
      </button>
    </div>
  );
}
