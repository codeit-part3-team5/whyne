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
  setReviewData: (data: {
    rating: number;
    content: string;
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
    aroma: string[];
  }) => void;
  resetReview: () => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  rating: 0,
  content: "",
  lightBold: 5,
  smoothTannic: 5,
  drySweet: 5,
  softAcidic: 5,
  aroma: [],
  setRating: (rating) => set({ rating: Math.round(rating) }), // 항상 정수로 반올림하여 저장
  setContent: (content) => set({ content }),
  setWineTaste: (type, value) =>
    set((state) => ({
      ...state,
      [type]: value,
    })),
  setAroma: (aroma) => set({ aroma }),
  setReviewData: (data) =>
    set({
      rating: Math.round(data.rating),
      content: data.content,
      lightBold: data.lightBold,
      smoothTannic: data.smoothTannic,
      drySweet: data.drySweet,
      softAcidic: data.softAcidic,
      aroma: data.aroma,
    }),
  resetReview: () =>
    set({
      rating: 0,
      content: "",
      lightBold: 5,
      smoothTannic: 5,
      drySweet: 5,
      softAcidic: 5,
      aroma: [],
    }),
}));
