"use client";

import { create } from "zustand";

import { WineDetailData } from "@/types/Wine";

interface WineState {
  wine: WineDetailData | null;
  setWine: (wine: WineDetailData) => void;
  clearWine: () => void;
  updateWineReviews: (reviews: any[]) => void; // 리뷰 배열만 업데이트하는 함수
}

export const useWineStore = create<WineState>((set) => ({
  wine: null,
  setWine: (wine) => set({ wine }),
  clearWine: () => set({ wine: null }),
  updateWineReviews: (reviews) =>
    set((state) => (state.wine ? { wine: { ...state.wine, reviews } } : state)),
}));
