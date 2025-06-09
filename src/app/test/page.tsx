// import ReviewSummary from "@/components/ReviewSummary";
// import wine from "@/mocks/winesDetail.json";
// import wines from "@/mocks/winesData.json";
// import { WineType } from "@/types/Wine";
// import { convertStringsToAroma } from "@/utils/aromaConverter";

// const fixedWine = {
//   ...wine,
//   recentReview: {
//     ...wine.recentReview,
//     aroma: convertStringsToAroma(wine.recentReview.aroma),
//   },
//   // 만약 reviews 배열 내 aroma 도 string[] -> Aroma[]로 바꿔야 한다면
//   reviews: wine.reviews.map((review) => ({
//     ...review,
//     aroma: convertStringsToAroma(review.aroma),
//   })),
// };

export default function TestPage() {
  return (
    // <div>
    //   {wines.list.map((wine) => (
    //     <div key={wine.id} className="mb-[24px]">
    //       <ReviewSummary
    //         key={wine.id}
    //         direction="column"
    //         {...{ ...wine, type: wine.type as WineType }}
    //       />
    //     </div>
    //   ))}
    //   <ReviewSummary direction="row" {...{ ...fixedWine, type: fixedWine.type as WineType }} />
    // </div>
    <div>테스트 페이지 입니다.</div>
  );
}
