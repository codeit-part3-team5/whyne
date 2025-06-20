import { useQueryClient } from "@tanstack/react-query";

import { deleteWine } from "@/apis/winesApi";
import DeleteConfirmModal from "@/components/delete-confirm-modal/DeleteConfirmModal";
import DropDown from "@/components/DropDown";
import useModalStore from "@/store/useModalStore";

import WineEditModal from "../modal/WineEditModal";

type WineDropDownProps = {
  wineId: number;
  size?: "default" | "small";
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function WineDropDown({
  wineId,
  size = "default",
  onEdit,
  onDelete,
}: WineDropDownProps) {
  const queryClient = useQueryClient();
  const { open, close } = useModalStore();

  const handleEdit = async () => {
    open("editWine", <WineEditModal wineId={wineId} />);
    onEdit?.();
  };

  const handleDelete = async () => {
    open(
      "delete",
      <DeleteConfirmModal
        onCancel={() => close()}
        onConfirm={async () => {
          try {
            await deleteWine(wineId);

            // 쿼리 무효화
            if (wineId) {
              await queryClient.invalidateQueries({ queryKey: ["wine", wineId] });
            }
            await queryClient.invalidateQueries({ queryKey: ["myWines"] });

            await queryClient.refetchQueries({
              queryKey: ["wine", String(wineId)],
              exact: true, // 정확한 키 매치로 리페치
            });

            onDelete?.();
            close();
          } catch (error) {
            console.error("와인 삭제 중 오류 발생:", error);
            alert("와인 삭제에 실패했습니다. 다시 시도해주세요.");
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
