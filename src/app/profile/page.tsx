"use client";

import { useState } from "react";

import MyReviewCard from "@/components/profile/MyReviewCard";
import MyWineCard from "@/components/profile/MyWineCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { useMyReviews } from "@/hooks/useMyReviews";
import { useMyWines } from "@/hooks/useMyWines";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(1);

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
  } = useMyReviews(10);

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
  } = useMyWines(10);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

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
