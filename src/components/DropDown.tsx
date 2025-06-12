type DropDownProps = {
  firstText: string;
  secondText: string;
  size?: "default" | "small";
};

export default function dropDown({ firstText, secondText, size = "default" }: DropDownProps) {
  const containerSize = size === "small" ? "w-[101px] h-[92px]" : "w-[126px] h-[104px]";

  const padding =
    size === "small" ? "px-[16px] py-[8px] text-[14px]" : "px-[22px] py-[10px] text-[16px]";

  return (
    <div className={`${containerSize} border border-gray-300 rounded-[16px] bg-white`}>
      <div
        className={`cursor-pointer bg-light-purple rounded-[12px] text-center text-purple font-[500] my-1 mx-1 ${padding}`}
      >
        {firstText}
      </div>
      <div className={`cursor-pointer text-center font-[500] ${padding}`}>{secondText}</div>
    </div>
  );
}
