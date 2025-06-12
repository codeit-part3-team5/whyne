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

  const baseStyles = {
    container: "flex items-center  gap-4",
    label: cn(
      "flex flex-shrink-0 w-[3.5rem] h-[1.75rem] px-[7px] py-1 justify-center items-center rounded-md bg-gray100",
      "text-gray500 text-sm font-semibold leading-6"
    ),
    contentWrapper: cn(
      "flex flex-1 min-w-0 items-center gap-4",
      "text-gray800 text-base font-medium leading-6.5"
    ),
    sideText: "flex-shrink-0 min-w-[4.375rem] whitespace-nowrap",
    rightText: "flex-shrink-0 min-w-[3.5rem] whitespace-nowrap text-right",
  };

  const mobileStyles = {
    container: "max-mb:gap-auto w-full ",
    label: "max-tb:text-[12px] max-tb:leading-5",
    contentWrapper: "max-mb:text-sm max-mb:leading-6 gap-1.5",
    sideText: "max-mb:w-[3.875rem]",
    rightText: "max-mb:w-[3.125rem]",
  };

  const modalStyles = {
    container: "flex items-center w-[30rem]  justify-between",
    label: "max-tb:text-[12px] max-tb:leading-5 px-[6px]",
    contentWrapper: cn("text-[14px] flex w-full  items-center", "max-tb:text-sm max-tb:leading-6 "),
    sideText: " max-tb:w-15.5",
    rightText: "max-tb:w-12.5",
  };

  return (
    <div
      className={cn(
        onChange ? modalStyles.container : baseStyles.container,
        "gap-2",
        mobileStyles.container
      )}
    >
      <span className={cn(baseStyles.label, mobileStyles.label, onChange && modalStyles.label)}>
        {WINE_TASTE[type]}
      </span>
      <div
        className={cn(
          onChange ? modalStyles.contentWrapper : baseStyles.contentWrapper,
          mobileStyles.contentWrapper
        )}
      >
        <span className={cn(baseStyles.sideText, mobileStyles.sideText)}>{label.left}</span>
        <input
          className={cn(baseStyles.rangeInput, readOnly && "cursor-default  ")}
          max={10}
          min={0}
          type="range"
          value={taste}
          onChange={readOnly ? undefined : handleChange}
          {...(readOnly && { readOnly: true })}
        />
        <span className={cn(baseStyles.rightText, mobileStyles.rightText)}>{label.right}</span>
      </div>
    </div>
  );
}
