// 와인 목록 페이지
import MonthlyWines from "@/components/about-wine/MonthlyWines";
import WineTypeDropDown from "@/components/about-wine/WineTypeDropDown";
import DropDown from "@/components/DropDown";

export default function winesPage() {
  return (
    <main className="flex flex-col items-center gap-6 py-10">
      <DropDown firstText="수정하기" secondText="삭제하기" size="small" />
      <DropDown firstText="마이페이지" secondText="로그아웃" />
      <WineTypeDropDown />
      <MonthlyWines />
    </main>
  );
}
