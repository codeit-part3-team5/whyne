import { create } from "zustand";

export type ModalType =
  | "filter"
  | "addWine"
  | "addReview"
  | "editWine"
  | "editReview"
  | "delete"
  | "default";

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  content: React.ReactNode | null;
  open: (type: ModalType, content?: React.ReactNode) => void;
  close: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  content: null,
  open: (type, content = null) => set({ isOpen: true, type, content }),
  close: () => set({ isOpen: false, type: null, content: null }),
}));

export default useModalStore;
