import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { getReviews, patchReview } from "@/apis/reviewsApi";
import { getWineDetail } from "@/apis/winesApi";
import Button from "@/components/Button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useModalStore from "@/store/useModalStore";
import { useReviewStore } from "@/store/useReviewStore";
import { useWineStore } from "@/store/useWineStore";

import ReviewMiddle from "./ReviewMiddle";
import ReviewTop from "./ReviewTop";

interface ReviewEditModalProps {
  reviewId: number;
}

export default function ReviewEditModal({ reviewId }: ReviewEditModalProps) {
  const { close } = useModalStore();
  const isMobile = useMediaQuery("(max-width: 24.375rem)");
  const size = isMobile ? "lg" : "xl";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    rating,
    content,
    lightBold,
    smoothTannic,
    drySweet,
    softAcidic,
    aroma,
    resetReview,
    setReviewData,
  } = useReviewStore();

  const { wine, setWine, updateWineReviews } = useWineStore();

  // 기존 리뷰 데이터 조회
  const {
    data: reviewData,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["review", reviewId],
    queryFn: () => getReviews(String(reviewId)),
    enabled: !!reviewId,
  });

  // 리뷰 데이터가 로드되면 store에 설정하고, 와인 데이터도 가져오기
  useEffect(() => {
    if (reviewData) {
      setReviewData({
        rating: reviewData.rating,
        content: reviewData.content,
        lightBold: reviewData.lightBold,
        smoothTannic: reviewData.smoothTannic,
        drySweet: reviewData.drySweet,
        softAcidic: reviewData.softAcidic,
        aroma: reviewData.aroma,
      });

      // 와인 데이터가 없고 wineId가 있으면 와인 정보 가져오기
      if (!wine && reviewData.wineId) {
        const fetchWineData = async () => {
          try {
            const wineData = await getWineDetail(String(reviewData.wineId));
            setWine(wineData);
          } catch (error) {
            console.error("와인 정보 가져오기 실패:", error);
          }
        };
        fetchWineData();
      }
    }
  }, [reviewData, setReviewData, wine, setWine]);

  // 컴포넌트가 언마운트될 때 리뷰 초기화
  useEffect(() => {
    return () => {
      resetReview();
    };
  }, [resetReview]);

  // 리뷰 수정 성공 후 모달 닫기
  const handleSuccessClose = useCallback(() => {
    resetReview();
    close();
  }, [resetReview, close]);

  // 캐시 업데이트 함수
  const updateCaches = useCallback(
    async (updatedReview: any) => {
      if (!wine?.id) return;

      try {
        // 개별 리뷰 캐시 업데이트
        queryClient.setQueryData(["review", reviewId], updatedReview);

        // 와인 상세 정보의 리뷰 목록 업데이트
        const wineQueryKey = ["wine", String(wine.id)];
        const currentWineData = queryClient.getQueryData(wineQueryKey);

        if (
          currentWineData &&
          typeof currentWineData === "object" &&
          "reviews" in currentWineData
        ) {
          const wineData = currentWineData as any;
          const updatedReviews = wineData.reviews.map((review: any) =>
            review.id === reviewId ? updatedReview : review
          );

          queryClient.setQueryData(wineQueryKey, {
            ...wineData,
            reviews: updatedReviews,
          });

          // zustand store도 업데이트
          updateWineReviews(updatedReviews);
        } else {
          // fallback 1: API 호출로 최신 데이터 가져오기
          try {
            const freshWineData = await getWineDetail(String(wine.id));
            queryClient.setQueryData(wineQueryKey, freshWineData);
            updateWineReviews(freshWineData.reviews);
          } catch (apiError) {
            console.error("와인 상세 정보 가져오기 실패:", apiError);
            // fallback 2: 캐시 무효화
            await queryClient.invalidateQueries({ queryKey: wineQueryKey });
          }
        }
      } catch (error) {
        console.error("캐시 업데이트 실패:", error);
        // 최종 fallback: 캐시 무효화
        if (wine?.id) {
          await queryClient.invalidateQueries({ queryKey: ["wine", String(wine.id)] });
        }
      }
    },
    [wine?.id, reviewId, queryClient, updateWineReviews]
  );

  const handleClickUpdateReview = async () => {
    if (!reviewId) {
      setError("리뷰 ID가 없습니다.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const updateData = {
        rating,
        content,
        lightBold,
        smoothTannic,
        drySweet,
        softAcidic,
        aroma,
      };

      const response = await patchReview(reviewId, updateData);

      // 캐시 업데이트
      await updateCaches(response);

      // 응답 데이터 검증 (선택적)
      if (!response?.id) {
        console.warn("리뷰가 수정되었지만 응답 형식이 예상과 다릅니다:", response);
      }

      // 성공 시 모달 닫기
      handleSuccessClose();
    } catch (err: any) {
      console.error("리뷰 수정 실패:", err);

      // 에러 메시지 처리
      let errorMessage = "리뷰를 수정하는 중 오류가 발생했습니다. 다시 시도해주세요.";

      if (err.response?.data) {
        const { data } = err.response;

        // 유효성 검사 오류 처리
        if (data.errors && Array.isArray(data.errors)) {
          const errorDetails = data.errors
            .map(
              (error: any) =>
                `${error.path || "알 수 없는 필드"}: ${error.message || "유효하지 않음"}`
            )
            .join(", ");
          errorMessage = `입력 값이 올바르지 않습니다: ${errorDetails}`;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (typeof data === "string") {
          errorMessage = data;
        }
      }

      // 상세 오류 정보 로깅 (개발용)
      if (process.env.NODE_ENV === "development") {
        console.error("API 오류 상세:", {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          headers: err.response?.headers,
        });
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 w-full max-w-[30rem] h-96">
        <div className="text-lg">리뷰 데이터를 불러오는 중...</div>
      </div>
    );
  }

  // 쿼리 에러
  if (queryError) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 w-full max-w-[30rem] h-96">
        <div className="text-red-500 text-center">리뷰 데이터를 불러오는데 실패했습니다.</div>
        <Button size={size} onClick={() => window.location.reload()}>
          새로고침
        </Button>
      </div>
    );
  }

  // 리뷰 데이터가 없는 경우
  if (!reviewData) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 w-full max-w-[30rem] h-96">
        <div className="text-gray-500 text-center">리뷰 데이터를 찾을 수 없습니다.</div>
      </div>
    );
  }

  // 유효성 검사 (필수 필드가 입력되었는지 확인)
  const isReviewValid = rating > 0 && content.trim().length > 0 && aroma.length > 0;

  return (
    <div className="flex flex-col items-start gap-5 w-full max-w-[30rem]">
      <ReviewTop />
      <ReviewMiddle />
      {error && <p className="text-red-500 text-sm w-full text-center">{error}</p>}
      <Button
        disabled={!isReviewValid || isSubmitting}
        size={size}
        onClick={handleClickUpdateReview}
      >
        {isSubmitting ? "처리 중..." : "리뷰 수정하기"}
      </Button>
    </div>
  );
}
