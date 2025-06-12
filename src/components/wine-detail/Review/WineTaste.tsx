import { TasteType, WINE_TASTE_LABELS } from "@/constants/wineTaste";

interface WineTasteProps {
  type: TasteType;
  taste: number;
}

export default function WineTaste({ type, taste }: WineTasteProps) {
  const label = WINE_TASTE_LABELS[type];

  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-gray600">{label.left}</span>
      <div className="relative w-[200px] h-1 bg-gray200 rounded-full">
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{ width: `${taste * 10}%` }}
        />
      </div>
      <span className="text-gray600">{label.right}</span>
    </div>
  );
}
