type DropDownProps = {
  firstText: string;
  secondText: string;
  size?: "default" | "small";
};

export default function dropDown({ firstText, secondText, size = "default" }: DropDownProps) {
  const containerSize = size === "small" ? "w-[6.3125rem] h-[5.75rem]" : "w-[7.875rem] h-[6.5rem]";

  const padding =
    size === "small"
      ? "px-[1rem]] py-[0.5rem] text-[0.875rem]"
      : "px-[1.375rem] py-[0.625rem] text-[1rem]";

  return (
    <div className={`${containerSize} border border-gray-300 rounded-[1rem]`}>
      <div
        className={`cursor-pointer bg-light-purple rounded-[0.75rem] text-center text-purple font-[500] my-[0.25rem] mx-[0.25rem] ${padding}`}
      >
        {firstText}
      </div>
      <div className={`cursor-pointer text-center font-[500] ${padding}`}>{secondText}</div>
    </div>
  );
}
