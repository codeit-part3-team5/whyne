import { cn } from "@/utils/cn";

type DropDownProps = {
  firstText: string;
  secondText: string;
  size?: "default" | "small";
  onFirstClick?: () => void;
  onSecondClick?: () => void;
};

export default function DropDown({
  firstText,
  secondText,
  size = "default",
  onFirstClick,
  onSecondClick,
}: DropDownProps) {
  const containerSize =
    size === "small"
      ? "w-full max-w-[6.3125rem] h-[5.75rem] max-sm:max-w-[5.5rem] max-sm:h-[5rem]"
      : "w-full max-w-[7.875rem] h-[6.5rem] max-sm:max-w-[6.5rem] max-sm:h-[5.5rem]";

  const padding =
    size === "small"
      ? "px-[1rem] py-[0.5rem] text-[0.875rem] max-sm:px-[0.75rem] max-sm:py-[0.375rem] max-sm:text-[0.75rem]"
      : "px-[1.375rem] py-[0.625rem] text-[1rem] max-sm:px-[1rem] max-sm:py-[0.5rem] max-sm:text-[0.875rem]";

  const buttonStyles = `cursor-pointer text-center font-[500] bg-white hover:bg-light-purple hover:text-purple rounded-[0.75rem]`;

  const handleFirstClick = async () => {
    onFirstClick?.();
  };
  const handleSecondClick = async () => {
    onSecondClick?.();
  };

  return (
    <div
      className={`${containerSize} border border-gray-300 flex flex-col rounded-[1rem] bg-white `}
    >
      <button
        className={cn(buttonStyles, padding, "my-[0.25rem] mx-[0.25rem]")}
        type="button"
        onClick={handleFirstClick}
      >
        {firstText}
      </button>
      <button
        className={cn(buttonStyles, padding, "mx-[0.25rem] my-[.1875rem]")}
        type="button"
        onClick={handleSecondClick}
      >
        {secondText}
      </button>
    </div>
  );
}
