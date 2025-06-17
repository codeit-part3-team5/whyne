"use client";

import { useState } from "react";

import MyReviewCard from "@/components/profile/MyReviewCard";
import MyWineCard from "@/components/profile/MyWineCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import myReviewsData from "@/mocks/myReviewsData.json";
import myWinesData from "@/mocks/myWinesData.json";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const reviewCount = myReviewsData.totalCount;
  const wineCount = myWinesData.totalCount; // TODO: 와인 데이터가 있을 때 실제 값으로 변경

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
          {activeTab === 1 && <MyReviewCard myReviews={myReviewsData.list} />}
          {activeTab === 2 && <MyWineCard myWines={myWinesData.list} />}
        </div>
      </div>
    </div>
  );
}
