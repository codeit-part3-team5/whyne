import WineTaste from "@/components/WineTaste";
import { useReviewStore } from "@/store/useReviewStore";

import AromaSelector from "./AromaSelector";

export default function ReviewMiddle() {
  const { lightBold, smoothTannic, drySweet, softAcidic, setWineTaste } = useReviewStore();

  const handleTasteChange = (type: "lightBold" | "smoothTannic" | "drySweet" | "softAcidic") => {
    return (value: number) => {
      setWineTaste(type, value);
    };
  };

  return (
    <article className="flex flex-col items-start gap-8 w-full">
      <div className="flex flex-col w-full gap-5  max-mb:gap-6 ">
        <h3 className="text-xl font-bold leading-8 max-mb:text-lg max-mb:leading-6.5">
          와인의 맛은 어땠나요?
        </h3>
        <div className="flex flex-col gap-4.5 w-full">
          <WineTaste taste={lightBold} type="lightBold" onChange={handleTasteChange("lightBold")} />
          <WineTaste
            taste={smoothTannic}
            type="smoothTannic"
            onChange={handleTasteChange("smoothTannic")}
          />
          <WineTaste taste={drySweet} type="drySweet" onChange={handleTasteChange("drySweet")} />
          <WineTaste
            taste={softAcidic}
            type="softAcidic"
            onChange={handleTasteChange("softAcidic")}
          />
        </div>
      </div>
      <AromaSelector />
    </article>
  );
}
