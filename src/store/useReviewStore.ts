// /store/useReviewStore.ts
import { create } from "zustand";

interface ReviewState {
  rating: number;
  content: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];

  setRating: (rating: number) => void;
  setContent: (content: string) => void;
  setWineTaste: (
    type: "lightBold" | "smoothTannic" | "drySweet" | "softAcidic",
    value: number
  ) => void;
  setAroma: (aroma: string[]) => void;
  resetReview: () => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  rating: 0,
  content: "",
  lightBold: 10,
  smoothTannic: 10,
  drySweet: 10,
  softAcidic: 10,
  aroma: [],

  setRating: (rating) => set({ rating }),
  setContent: (content) => set({ content }),
  setWineTaste: (type, value) =>
    set((state) => ({
      ...state,
      [type]: value,
    })),
  setAroma: (aroma) => set({ aroma }),
  resetReview: () =>
    set({
      rating: 0,
      content: "",
      lightBold: 10,
      smoothTannic: 10,
      drySweet: 10,
      softAcidic: 10,
      aroma: [],
    }),
}));
