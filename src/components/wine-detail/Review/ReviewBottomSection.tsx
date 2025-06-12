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
      <div>{content}</div>

      <WineTaste taste={lightBold} />
      <WineTaste taste={smoothTannic} />
      <WineTaste taste={drySweet} />
      <WineTaste taste={softAcidic} />
    </section>
  );
}

function WineTaste({ taste }: { taste: number }) {
  return (
    <div className="flex gap-2">
      <span>{taste}</span>
    </div>
  );
}
