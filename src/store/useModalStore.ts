import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useModalStore;
