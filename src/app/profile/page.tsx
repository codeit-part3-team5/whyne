"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import useLogin from "@/components/Login/useLogin";
import MyReviewCard from "@/components/profile/MyReviewCard";
import MyWineCard from "@/components/profile/MyWineCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { useMyReviews } from "@/hooks/useMyReviews";
import { useMyWines } from "@/hooks/useMyWines";

function ProfilePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { login } = useLogin();

  // URL에서 탭 상태 가져오기 (기본값: 1)
  const [activeTab, setActiveTab] = useState(() => {
    const tabFromUrl = searchParams.get("tab");
    return tabFromUrl ? parseInt(tabFromUrl, 10) : 1;
  });

  // 컴포넌트 마운트 후 상태 설정
  useEffect(() => {
    setMounted(true);
    // 마운트 후 인증 상태 확인
    const checkAuth = async () => {
      const loggedIn = login();
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        alert("로그인 후 이용이 가능합니다.");
        router.push("/signin");
      }
    };
    checkAuth();
  }, []);

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
  } = useMyReviews(10, { enabled: isLoggedIn ?? false });

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
  } = useMyWines(10, { enabled: isLoggedIn ?? false });

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
  if (!mounted || isLoggedIn === null) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div>인증 상태 확인 중...</div>
      </div>
    );
  }

  // 인증되지 않은 경우 (리다이렉트 진행 중)
  if (isLoggedIn === false) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div>로그인 페이지로 이동 중...</div>
      </div>
    );
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

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ProfilePageInner />
    </Suspense>
  );
}
