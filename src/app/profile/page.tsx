"use client";

import { useState } from "react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ReviewCard from "@/components/profile/ReviewCard";
import reviewsData from "@/mocks/reviewsData.json";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const reviewCount = reviewsData.list.length;
  const wineCount = 0; // TODO: 와인 데이터가 있을 때 실제 값으로 변경

  return (
    <div>
      <div className="flex flex-row max-tb:flex-col gap-15 max-tb:gap-10 max-mb:gap-7">
        <ProfileHeader />
        <div className="flex flex-col gap-4">
          <ProfileTabs
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            reviewCount={reviewCount}
            wineCount={wineCount}
          />
          {activeTab === 1 && <ReviewCard />}
          {activeTab === 2 && <div>와인 목록 (준비중)</div>}
        </div>
      </div>
    </div>
  );
}
