// 와인 목록 페이지
import MonthlyWines from "@/components/about-wine/MonthlyWines";
import WineInfoCard from "@/components/about-wine/WineInfoCard";
import SearchInput from "@/components/input/SearchInput";
import winesData from "@/mocks/winesData.json";
import type { BaseWineData } from "@/types/Wine";

export default function WinesPage() {
  const wines = winesData.list as BaseWineData[];

  return (
    <main>
      <MonthlyWines />
      <div className="w-full max-w-[50rem]">
        <SearchInput />
      </div>
      {wines.map((wine) => (
        <WineInfoCard key={wine.id} data={wine} />
      ))}
    </main>
  );
}
