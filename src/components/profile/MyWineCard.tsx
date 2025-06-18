"use client";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { BaseWineData } from "@/types/Wine";

import Spinner from "../Spinner";
import { BaseCard } from "./BaseCard";

interface MyWineCardProps {
  myWines: BaseWineData[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasNext: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export default function MyWineCard({
  myWines,
  loading,
  loadingMore,
  error,
  hasNext,
  loadMore,
  refresh,
}: MyWineCardProps) {
  // 무한 스크롤 훅 사용
  const { observerRef } = useInfiniteScroll({
    hasNext,
    isLoading: loadingMore,
    onLoadMore: loadMore,
    threshold: 0.1,
    rootMargin: "6.25rem",
  });

  const handleEdit = (wine: BaseWineData) => {
    // 와인 수정 로직
    console.log("Edit wine:", wine);
  };

  const handleDelete = (wine: BaseWineData) => {
    // 와인 삭제 로직
    console.log("Delete wine:", wine);
  };

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
        <div className="ml-3 text-gray-500">와인 목록을 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-[var(--color-purple)] text-white rounded-lg hover:bg-purple-dark"
          onClick={refresh}
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 빈 상태 처리
  if (myWines.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">아직 등록한 와인이 없습니다.</div>
      </div>
    );
  }

  return (
    <>
      <BaseCard
        dropdownOptions={{ firstText: "수정하기", secondText: "삭제하기" }}
        getId={(wine) => wine.id}
        items={myWines}
        renderContent={(wine) => <WineCardContent wine={wine} />}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {/* 무한 스크롤 트리거 요소 */}
      {hasNext && (
        <div ref={observerRef} className="flex justify-center items-center py-8">
          {loadingMore ? (
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
              <span className="text-gray-500">더 많은 와인을 불러오는 중...</span>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">스크롤하여 더 많은 와인 보기</div>
          )}
        </div>
      )}

      {/* 모든 데이터 로드 완료 메시지 */}
      {!hasNext && myWines.length > 0 && (
        <div className="flex justify-center py-6">
          <div className="text-gray-400 text-sm">모든 와인를 확인했습니다 ({myWines.length}개)</div>
        </div>
      )}
    </>
  );
}

function WineCardContent({ wine }: { wine: BaseWineData }) {
  return (
    <div className="flex gap-6 items-center max-md:gap-5">
      {/* 와인 이미지 - 고정 크기 */}
      <div className="flex-shrink-0 w-50 h-52 max-md:w-15 max-md:h-40 bg-white rounded-md overflow-hidden flex items-center justify-center text-gray-400 text-sm">
        {wine.image ? (
          <div className="w-full h-full flex items-center justify-center">
            <img
              alt={wine.name}
              className="w-full h-full object-contain object-center"
              src={wine.image}
            />
          </div>
        ) : (
          "이미지"
        )}
      </div>

      {/* 텍스트 정보 - 유동적 높이 */}
      <div className="flex-1 flex flex-col justify-between min-h-52 max-md:min-w-46">
        <div className="flex-1">
          <h3 className="font-semibold text-3xl max-mb:text-xl leading-tight break-words mb-3">
            {wine.name}
          </h3>
          <p className="text-gray-400 max-mb:text-base">{wine.region}</p>
        </div>

        {/* 가격 - 하단 고정 */}
        <div className="mt-4">
          <div className="bg-light-purple rounded-lg w-30 h-9 flex items-center justify-center">
            <span className="text-[var(--color-purple)] font-bold text-md">
              ₩ {wine.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
