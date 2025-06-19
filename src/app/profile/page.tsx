"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import MyReviewCard from "@/components/profile/MyReviewCard";
import MyWineCard from "@/components/profile/MyWineCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { useAuth } from "@/hooks/useAuth";
import { useMyReviews } from "@/hooks/useMyReviews";
import { useMyWines } from "@/hooks/useMyWines";

export default function ProfilePage() {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 탭 상태 가져오기 (기본값: 1)
  const [activeTab, setActiveTab] = useState(() => {
    const tabFromUrl = searchParams.get("tab");
    return tabFromUrl ? parseInt(tabFromUrl, 10) : 1;
  });

  // useMyReviews 훅
  const {
    reviews: myReviews,
    loading: reviewsLoading,
    error: reviewsError,
    hasNext: reviewsHasNext,
    loadMore: reviewsLoadMore,
    refresh: reviewsRefresh,
    loadingMore: reviewsLoadingMore,
    totalCount: reviewCount,
  } = useMyReviews(10, { enabled: isAuthenticated });

  // useMyWines 훅
  const {
    wines: myWines,
    loading: winesLoading,
    error: winesError,
    hasNext: winesHasNext,
    loadMore: winesLoadMore,
    refresh: winesRefresh,
    loadingMore: winesLoadingMore,
    totalCount: wineCount,
  } = useMyWines(10, { enabled: isAuthenticated });

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId.toString());
    router.replace(`/profile?${params.toString()}`);
  };

  // URL 파라미터 변경 감지
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      const tabNumber = parseInt(tabFromUrl, 10);
      if (tabNumber >= 1 && tabNumber <= 2) {
        setActiveTab(tabNumber);
      }
    }
  }, [searchParams]);

  // 인증 체크 중일 때 로딩 화면
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div>로딩 중...</div>
      </div>
    );
  }

  // 로그인하지 않은 경우 (useAuth에서 이미 리다이렉트 처리됨)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-row max-tb:flex-col gap-15 max-tb:gap-10 max-mb:gap-7">
        <ProfileHeader />
        <div className="w-full flex flex-col gap-4">
          <ProfileTabs
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            reviewCount={reviewCount}
            wineCount={wineCount}
          />
          {activeTab === 1 && (
            <MyReviewCard
              error={reviewsError}
              hasNext={reviewsHasNext}
              loadMore={reviewsLoadMore}
              loading={reviewsLoading}
              loadingMore={reviewsLoadingMore}
              myReviews={myReviews}
              refresh={reviewsRefresh}
            />
          )}
          {activeTab === 2 && (
            <MyWineCard
              error={winesError}
              hasNext={winesHasNext}
              loadMore={winesLoadMore}
              loading={winesLoading}
              loadingMore={winesLoadingMore}
              myWines={myWines}
              refresh={winesRefresh}
            />
          )}
        </div>
      </div>
    </div>
  );
}
