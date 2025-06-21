import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { deleteReview } from "@/apis/reviewsApi";
import DeleteConfirmModal from "@/components/delete-confirm-modal/DeleteConfirmModal";
import DropDown from "@/components/DropDown";
import { useAuth } from "@/hooks/useAuth";
import useModalStore from "@/store/useModalStore";

import ReviewEditModal from "../wine-detail/review-modal/ReviewEditModal";

type ReviewDropDownProps = {
  authorId: number;
  reviewId: number;
  size?: "default" | "small";
  refresh?: () => Promise<void>;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ReviewDropDown({
  authorId,
  reviewId,
  size = "default",
  refresh,
  onEdit,
  onDelete,
}: ReviewDropDownProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const wineId = params.id as string;
  const { open, close } = useModalStore();

  const { checkIsOwnContent } = useAuth();
  const isSelfReview = checkIsOwnContent(authorId);
  const MESSAGES = {
    UNAUTHORIZED_EDIT: "자신의 리뷰만 수정할 수 있습니다.",
    UNAUTHORIZED_DELETE: "자신의 리뷰만 삭제할 수 있습니다.",
  } as const;

  const handleEdit = async () => {
    if (!isSelfReview) {
      alert(MESSAGES.UNAUTHORIZED_EDIT);
      return;
    }
    open("editReview", <ReviewEditModal refresh={refresh} reviewId={reviewId} />);
    onEdit?.();
  };

  const handleDelete = async () => {
    if (!isSelfReview) {
      alert(MESSAGES.UNAUTHORIZED_DELETE);
      return;
    }
    open(
      "delete",
      <DeleteConfirmModal
        onCancel={() => close()}
        onConfirm={async () => {
          try {
            await deleteReview(reviewId);
            if (wineId) {
              await Promise.all(
                [
                  queryClient.invalidateQueries({ queryKey: ["review", String(reviewId)] }),
                  wineId && queryClient.invalidateQueries({ queryKey: ["wine", wineId] }),
                  queryClient.invalidateQueries({ queryKey: ["myReviews"] }),
                ].filter(Boolean)
              );
            } else {
              await refresh?.();
            }
            onDelete?.();
            close();
          } catch (error) {
            console.error("리뷰 삭제 중 오류 발생:", error);
            alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요.");
            close();
          }
        }}
      />
    );
  };

  return (
    <DropDown
      firstText="수정하기"
      secondText="삭제하기"
      size={size}
      onFirstClick={handleEdit}
      onSecondClick={handleDelete}
    />
  );
}
