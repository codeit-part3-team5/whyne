import { Aroma } from "@/types/Aroma";

export function convertStringsToAroma(arr: string[]): Aroma[] {
  return arr.map((str) => {
    if (Object.values(Aroma).includes(str as Aroma)) {
      return str as Aroma;
    }
    throw new Error(`Invalid aroma string: ${str}`);
  });
}
