import WineIcon from "@/assets/wine-icon.svg";

interface ReviewTitleProps {
  wineName: string;
}

export default function ReviewTitle({ wineName }: ReviewTitleProps) {
  const size = 54;

  return (
    <section className="flex items-center gap-4">
      <div className="flex items-center w-17 h-full min-h-17 p-[7px] rounded-lg bg-gray100">
        <WineIcon height={size} width={size} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray800 leading-6.5">{wineName}</h2>
      </div>
    </section>
  );
}
