"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { getWineDetail } from "@/apis/winesApi";
import WineCard from "@/components/about-wine/WineCard";
import Spinner from "@/components/Spinner";
import NoReviewSection from "@/components/wine-detail/NoReviewSection";
import ReviewList from "@/components/wine-detail/review-list/ReviewList";
import ReviewModal from "@/components/wine-detail/review-modal/ReviewModal";
import ReviewOverview from "@/components/wine-detail/review-overview/ReviewOverview";
import useModalStore from "@/store/useModalStore";
import { useWineStore } from "@/store/useWineStore";
import { WineType } from "@/types/Wine";
import { convertStringsToAroma } from "@/utils/aromaConverter";
export default function WineDetailPage() {
  const { id } = useParams();
  const wineId = typeof id === "string" ? id : "";
  const open = useModalStore((state) => state.open);

  const handleClick = async () => {
    open("addReview", <ReviewModal />);
  };
  const setWine = useWineStore((state) => state.setWine);
  const {
    data: wineData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wine", wineId],
    queryFn: async () => {
      try {
        const data = await getWineDetail(wineId);
        return data;
      } catch (err) {
        console.error("API 호출 오류:", err);
        throw err;
      }
    },
    select: (data) => {
      const transformedData = {
        ...data,
        type: data.type as WineType,
        reviews: (data.reviews ?? []).map((r) => ({
          ...r,
          aroma: convertStringsToAroma(r.aroma),
        })),
        recentReview: data.recentReview
          ? { ...data.recentReview, aroma: convertStringsToAroma(data.recentReview.aroma ?? []) }
          : null,
      };

      // 렌더링 중에 상태 업데이트를 하지 않기 위해 select에서 setWine 호출을 제거
      return transformedData;
    },
    enabled: !!wineId,
    retry: 1, // 실패 시 한 번만 재시도
    refetchOnWindowFocus: true, // 윈도우 포커스 시 데이터 리프레시
    staleTime: 10000, // 10초 후 데이터를 stale로 간주
  });

  // useEffect를 사용하여 데이터가 변경될 때 전역 상태 업데이트
  useEffect(() => {
    if (wineData) {
      setWine(wineData);
    }
  }, [wineData, setWine]);

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // 에러 UI
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl font-bold mb-4">와인 정보를 찾을 수 없습니다</div>
      </div>
    );
  }
  if (!wineData) {
    return null;
  }

  // 리뷰가 없는 경우 NoReviewSection 컴포넌트 렌더링
  if (!wineData.reviews || wineData.reviews.length === 0) {
    return <NoReviewSection wineData={wineData} onAddReview={handleClick} />;
  }

  return (
    <main className="flex flex-col items-center py-10 gap-[3.75rem] max-mb:gap-[2.5rem]">
      <WineCard data={wineData} />
      <div className="flex w-full max-w-[71.25rem] gap-[1.875rem] max-tb:flex-col-reverse items-start justify-center max-tb:items-center">
        <div className="flex-grow w-full max-mb:w-full max-w-[50rem]">
          <ReviewList wine={wineData} />
        </div>
        <ReviewOverview wine={wineData} />
      </div>
    </main>
  );
}
