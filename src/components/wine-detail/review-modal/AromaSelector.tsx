import { useReviewStore } from "@/store/useReviewStore";
import { aromaToKorean } from "@/utils/aromaConverter";

export default function AromaSelector() {
  const { aroma, setAroma } = useReviewStore();

  const toggleAroma = (aromaValue: string) => {
    const newAroma = [...aroma];
    const index = newAroma.indexOf(aromaValue);

    if (index === -1) {
      // 최대 5개까지만 선택 가능
      if (newAroma.length >= 5) return;
      newAroma.push(aromaValue);
    } else {
      newAroma.splice(index, 1);
    }

    setAroma(newAroma);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      <h3 className="text-xl font-bold leading-8 max-mb:text-lg max-mb:leading-6.5">
        기억에 남는 향이 있나요?
        <span className="text-gray500 font-medium"> (최대 5개)</span>
      </h3>
      <div className="flex flex-wrap items-start gap-2.5 max-mb:gap-2 self-stretch">
        {Object.entries(aromaToKorean).map(([key, label]) => (
          <button
            key={key}
            className={`items-center  justify-center text-center text-nowrap px-4.5 py-2.5 max-mb:px-2.5 max-mb:py-1.5 rounded-full text-base max-mb:text-sm font-medium leading-6.5 max-mb:leading-6 ${
              aroma.includes(key)
                ? "bg-purple text-white "
                : "bg-white border border-gray300 text-gray600 hover:bg-gray100 "
            }`}
            type="button"
            onClick={() => toggleAroma(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
