"use client";

import { create } from "zustand";

import { WineDetailData } from "@/types/Wine";

interface WineState {
  wine: WineDetailData | null;
  setWine: (wine: WineDetailData) => void;
  clearWine: () => void;
}

export const useWineStore = create<WineState>((set) => ({
  wine: null,
  setWine: (wine) => set({ wine }),
  clearWine: () => set({ wine: null }),
}));
