import { TasteType, WINE_TASTE, WINE_TASTE_LABELS } from "@/constants/wineTaste";
import { cn } from "@/utils/cn";

interface WineTasteProps {
  type: TasteType;
  taste: number;
}

export default function WineTaste({ type, taste }: WineTasteProps) {
  const label = WINE_TASTE_LABELS[type];

  return (
    <div className="flex items-center w-full gap-4">
      <span
        className={cn(
          "flex w-14 h-7 px-1 py-2 justify-center items-center rounded-md  bg-gray100",
          "text-gray500 text-sm font-semibold leading-6"
        )}
      >
        {WINE_TASTE[type]}
      </span>
      <div
        className={cn(
          "flex w-full justify-between items-center",
          "text-gray800 text-base font-medium leading-6.5"
        )}
      >
        <span className="w-17.5">{label.left}</span>
        <input max={10} min={0} type="range" value={taste} />
        <span className="w-14 text-right">{label.right}</span>
      </div>
    </div>
  );
}

{
  /* <div className="relative w-[200px] h-1 bg-gray300 rounded-full">
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{ width: `${taste * 10}%` }}
          />
        </div> */
}
