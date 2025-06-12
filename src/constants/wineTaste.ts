export type TasteType = "lightBold" | "smoothTannic" | "drySweet" | "softAcidic";

export interface TasteLabel {
  left: string;
  right: string;
}

export const WINE_TASTE_LABELS: Record<TasteType, TasteLabel> = {
  lightBold: { left: "가벼워요", right: "진해요" },
  smoothTannic: { left: "부드러워요", right: "떫어요" },
  drySweet: { left: "드라이해요", right: "달아요" },
  softAcidic: { left: "안셔요", right: "많이셔요" },
} as const;

export type WineTasteLabel = (typeof WINE_TASTE)[TasteType];

export const WINE_TASTE: Record<TasteType, string> = {
  lightBold: "바디감",
  smoothTannic: "타닌",
  drySweet: "당도",
  softAcidic: "산미",
} as const;
