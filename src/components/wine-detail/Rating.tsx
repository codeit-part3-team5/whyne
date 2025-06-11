import StarIcon from "@/assets/star-icon.svg";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";

export default function Rating({ rating }: { rating: number }) {
  const isMobile = useMediaQuery("(max-width: 375px)");
  const size = isMobile ? 16 : 20;

  return (
    <div
      className={cn(
        "flex items-center gap-[.125rem] px-[.9375rem] py-2 rounded-[.75rem] bg-light-purple",
        "max-mb:px-2.5 max-mb:py-1.5"
      )}
    >
      <StarIcon fill="#6a42db" height={size} width={size} />
      <span
        className={cn(
          "text-purple text-center  text-[1.125rem] font-bold  leading-6",
          "max-tb:[.875rem] max-mb:text-[.875rem]"
        )}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
