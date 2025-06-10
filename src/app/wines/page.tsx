// 와인 목록 페이지
import WineCard from "@/components/about-wine/WineCard";
import WineTypeDropDown from "@/components/about-wine/WineTypeDropDown";
import DropDown from "@/components/DropDown";

const mockData = {
  list: [
    {
      id: 907,
      name: "Alain Gautheron Chablis Premier Cru Vaillons",
      region: "France",
      image: "https://awine.kr/wp-content/uploads/vb_wine_img/25122.png",
      price: 89000,
      type: "WHITE",
      avgRating: 5,
      reviewCount: 2,
      recentReview: {
        id: 2293,
        content: "맛있어요!!",
        createdAt: "2025-04-04T04:48:58.903Z",
        updatedAt: "2025-04-04T04:48:58.903Z",
      },
      userId: 1044,
    },
    {
      id: 906,
      name: "Roger Coulon Vrigny l'Hommee Champagne Premier Cru",
      region: "France",
      image: "https://awine.kr/wp-content/uploads/vb_wine_img/10933.png",
      price: 189000,
      type: "SPARKLING",
      avgRating: 0,
      reviewCount: 0,
      recentReview: null,
      userId: 1044,
    },
  ],
  totalCount: 31,
  nextCursor: 907,
};

export default function winesPage() {
  return (
    <main className="flex flex-col items-center gap-6 py-10">
      <WineTypeDropDown />
      <DropDown firstText="마이페이지" secondText="로그아웃" />
      <DropDown firstText="수정하기" secondText="삭제하기" size="small" />
      {mockData.list.map((wine) => (
        <WineCard key={wine.id} data={wine} />
      ))}
    </main>
  );
}
