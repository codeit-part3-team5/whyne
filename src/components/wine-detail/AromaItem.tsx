import { cn } from "@/utils/cn";

export default function AromaItem({ aroma }: { aroma?: string }) {
  return (
    <div
      className={cn(
        "inline-flex px-[.9375rem] py-2 items-center justify-center",
        "rounded-[100px] border border-gray300 bg-white",
        "text-gray800 text-[1rem] font-medium leading-6.5 max-mb:text-[.875rem]",
        "max-mb:px-2.5 max-mb:py-1.5"
      )}
    >
      {aroma}
    </div>
  );
}
