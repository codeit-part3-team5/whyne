import WineTaste from "@/components/WineTaste";
interface ReviewBottomSectionProps {
  content: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
}

export default function ReviewBottomSection({
  content,
  lightBold,
  smoothTannic,
  drySweet,
  softAcidic,
}: ReviewBottomSectionProps) {
  return (
    <section className="flex flex-col w-full  gap-5 max-tb:gap-6 max-mb:gap-4">
      <span className=" w-full h-full self-stretch text-base max-mb:text-sm font-normal leading-6.5 max-mb:leading-6">
        {content}
      </span>

      <div className="flex flex-col gap-4.5">
        <WineTaste readOnly taste={lightBold} type="lightBold" />
        <WineTaste readOnly taste={smoothTannic} type="smoothTannic" />
        <WineTaste readOnly taste={drySweet} type="drySweet" />
        <WineTaste readOnly taste={softAcidic} type="softAcidic" />
      </div>
    </section>
  );
}
