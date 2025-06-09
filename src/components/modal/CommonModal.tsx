import CloseIcon from "@/assets/icons/close-icon.svg";

const modalData = {
  filter: {
    title: "필터",
  },
  addWine: {
    title: "와인 등록",
  },
  addReview: {
    title: "리뷰 등록",
  },
  editWine: {
    title: "내가 등록한 와인",
  },
  editReview: {
    title: "수정하기",
  },
  default: {
    title: "기본 모달",
  },
};

type ModalType = keyof typeof modalData;

interface CommonModalProps {
  onClose: () => void;
  children: React.ReactNode;
  type: ModalType;
}

export default function CommonModal({ onClose, children, type }: CommonModalProps) {
  const { title } = modalData[type] || modalData.default;
  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <span>{title}</span>
          <button onClick={onClose}>
            <CloseIcon height={34} width={34} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
