import "./WineTaste.css";

import { TasteType, WINE_TASTE, WINE_TASTE_LABELS } from "@/constants/wineTaste";
import { cn } from "@/utils/cn";
interface WineTasteProps {
  type: TasteType;
  taste: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
}

export default function WineTaste({ type, taste, readOnly, onChange }: WineTasteProps) {
  const label = WINE_TASTE_LABELS[type];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  return (
    <div className="flex items-center w-full gap-4">
      <span
        className={cn(
          "flex w-14 h-7 px-1 py-2 max-mb:py-1.25 justify-center items-center rounded-md  bg-gray100",
          "text-gray500 text-sm font-semibold leading-6"
        )}
      >
        {WINE_TASTE[type]}
      </span>
      <div
        className={cn(
          "flex w-full justify-between items-center",
          "text-gray800 text-base max-mb:text-sm font-medium leading-6.5"
        )}
      >
        <span className="w-17.5 max-mb:w-15.5">{label.left}</span>
        <input
          className={cn("w-[30.6875rem]", readOnly && "cursor-default")}
          max={10}
          min={0}
          type="range"
          value={taste}
          onChange={readOnly ? undefined : handleChange}
          {...(readOnly && { readOnly: true })}
        />
        <span className="w-14 max-mb:w-12.5 text-right">{label.right}</span>
      </div>
    </div>
  );
}
