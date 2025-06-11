// 와인 목록 페이지
import MonthlyWines from "@/components/about-wine/MonthlyWines";
import WineCard from "@/components/about-wine/WineCard";
import winesData from "@/mocks/winesData.json";

export default function winesPage() {
  const wines = winesData.list;
  return (
    <main className="flex flex-col items-center gap-6 py-10">
      <MonthlyWines />
      {wines.map((wine) => (
        <WineCard key={wine.id} data={wine} />
      ))}
    </main>
  );
}
