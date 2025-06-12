// 와인 목록 페이지
import MonthlyWines from "@/components/about-wine/MonthlyWines";
import WineCard from "@/components/about-wine/WineCard";
import WineTypeDropDown from "@/components/about-wine/WineTypeDropDown";
import DropDown from "@/components/DropDown";
import winesData from "@/mocks/winesData.json";

export default function WinesPage() {
  const wines = winesData.list;

  return (
    <main>
      <DropDown firstText="수정하기" secondText="삭제하기" size="small" />
      <DropDown firstText="마이페이지" secondText="로그아웃" />
      <WineTypeDropDown />
      <MonthlyWines />
      {wines.map((wine) => (
        <WineCard key={wine.id} data={wine} />
      ))}
    </main>
  );
}
