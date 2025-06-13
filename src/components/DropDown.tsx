type DropDownProps = {
  firstText: string;
  secondText: string;
  size?: "default" | "small";
};

export default function DropDown({ firstText, secondText, size = "default" }: DropDownProps) {
  const containerSize =
    size === "small"
      ? "w-full max-w-[6.3125rem] h-[5.75rem] sm:max-w-[5.5rem] sm:h-[5rem]"
      : "w-full max-w-[7.875rem] h-[6.5rem] sm:max-w-[6.5rem] sm:h-[5.5rem]";

  const padding =
    size === "small"
      ? "px-[1rem] py-[0.5rem] text-[0.875rem] sm:px-[0.75rem] sm:py-[0.375rem] sm:text-[0.75rem]"
      : "px-[1.375rem] py-[0.625rem] text-[1rem] sm:px-[1rem] sm:py-[0.5rem] sm:text-[0.875rem]";

  return (
    <div className={`${containerSize} border border-gray-300 rounded-[1rem] bg-white`}>
      <div
        className={`cursor-pointer bg-light-purple rounded-[0.75rem] text-center text-purple font-[500] my-[0.25rem] mx-[0.25rem] ${padding}`}
      >
        {firstText}
      </div>
      <div className={`cursor-pointer text-center font-[500] ${padding}`}>{secondText}</div>
    </div>
  );
}
