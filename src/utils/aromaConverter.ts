import { Aroma } from "@/types/Aroma";

export const aromaToKorean = {
  [Aroma.CHERRY]: "체리",
  [Aroma.BERRY]: "베리",
  [Aroma.OAK]: "오크",
  [Aroma.VANILLA]: "바닐라",
  [Aroma.PEPPER]: "후추",
  [Aroma.BAKING]: "제빵",
  [Aroma.GRASS]: "풀",
  [Aroma.APPLE]: "사과",
  [Aroma.PEACH]: "복숭아",
  [Aroma.CITRUS]: "시트러스",
  [Aroma.TROPICAL]: "트로피컬",
  [Aroma.MINERAL]: "미네랄",
  [Aroma.FLOWER]: "꽃",
  [Aroma.TOBACCO]: "담뱃잎",
  [Aroma.EARTH]: "흙",
  [Aroma.CHOCOLATE]: "초콜릿",
  [Aroma.SPICE]: "스파이스",
  [Aroma.CARAMEL]: "카라멜",
  [Aroma.LEATHER]: "가죽",
} satisfies Record<Aroma, string>;

export function getKoreanAroma(aroma: Aroma): string {
  return aromaToKorean[aroma];
}

export function convertStringsToAroma(arr: string[]): Aroma[] {
  return arr.map((str) => {
    if (Object.values(Aroma).includes(str as Aroma)) {
      return str as Aroma;
    }
    throw new Error(`Invalid aroma string: ${str}`);
  });
}
