"use client";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ReviewCard from "@/components/profile/ReviewCard";

export default function ProfilePage() {
  return (
    <div>
      <div className="flex flex-row max-tb:flex-col gap-15 max-tb:gap-10 max-mb:gap-7">
        <ProfileHeader />
        <div className="flex flex-col gap-4">
          <ProfileTabs activeTab={1} handleTabClick={() => {}} reviewCount={1} wineCount={2} />
          <ReviewCard />
        </div>
      </div>
    </div>
  );
}
