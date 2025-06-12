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
    <section className="flex flex-col w-full gap-5 max-tb:gap-6 max-mb:gap-4">
      <span className="w-full h-full self-stretch size-4 max-mb:size-3.5 font-normal leading-6.5 max-mb:leading-6">
        {content}
      </span>

      <div className="flex flex-col gap-4.5">
        <WineTaste taste={lightBold} type="lightBold" />
        <WineTaste taste={smoothTannic} type="smoothTannic" />
        <WineTaste taste={drySweet} type="drySweet" />
        <WineTaste taste={softAcidic} type="softAcidic" />
      </div>
    </section>
  );
}
