import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { CreateReviewData, postReview } from "@/apis/reviewsApi";
import Button from "@/components/Button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useModalStore from "@/store/useModalStore";
import { useReviewStore } from "@/store/useReviewStore";
import { useWineStore } from "@/store/useWineStore";

import ReviewMiddle from "./ReviewMiddle";
import ReviewTop from "./ReviewTop";

export default function ReviewModal() {
  const { close } = useModalStore();
  const isMobile = useMediaQuery("(max-width: 24.375rem)");
  const size = isMobile ? "lg" : "xl";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { rating, content, lightBold, smoothTannic, drySweet, softAcidic, aroma, resetReview } =
    useReviewStore();

  const { wine } = useWineStore();

  // 컴포넌트가 언마운트될 때 리뷰 초기화
  useEffect(() => {
    return () => {
      resetReview();
    };
  }, [resetReview]);

  // 리뷰 작성 성공 후 모달 닫기
  const handleSuccessClose = () => {
    resetReview();
    close();
  };

  const handleClickAddReview = async () => {
    if (!wine || !wine.id) {
      console.error("와인 정보가 없습니다:", wine);
      setError("와인 정보가 올바르지 않습니다. 페이지를 새로고침 해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // 토큰 확인
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setError("인증 토큰이 없습니다. 로그인이 필요합니다.");
      setIsSubmitting(false);
      return;
    }

    try {
      const aromaValues = aroma; // 리뷰 데이터 구성
      const reviewData: CreateReviewData = {
        wineId: wine.id,
        rating,
        content,
        lightBold,
        smoothTannic,
        drySweet,
        softAcidic,
        aroma: aromaValues,
      };

      const response = await postReview(reviewData);

      if (wine?.id) {
        // 캐시 무효화 및 데이터 다시 가져오기
        await queryClient.invalidateQueries({ queryKey: ["wine", String(wine.id)] });

        await queryClient.refetchQueries({
          queryKey: ["wine", String(wine.id)],
          exact: true, // 정확한 키 매치로 리페치
        });
      }

      // 응답 데이터 검증
      if (!response || !response.id) {
        console.warn("리뷰가 생성되었지만 ID가 없습니다. API 응답 이슈가 있을 수 있습니다.");

        // 응답 데이터가 없어도 정상 처리 시도
        // 캐시를 무효화하여 다음에 데이터를 가져올 때 최신 상태를 반영
        if (wine?.id) {
          await queryClient.invalidateQueries({ queryKey: ["wine", String(wine.id)] });
        }
      }

      // 성공 시 모달 닫기
      handleSuccessClose();
    } catch (err: any) {
      console.error("리뷰 제출 실패:", err);

      // 응답 데이터에서 더 자세한 오류 메시지 추출
      const errorMessage =
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "리뷰를 등록하는 중 오류가 발생했습니다. 다시 시도해주세요.";
      // 상세 오류 정보 로깅
      console.error("API 오류 상세:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        headers: err.response?.headers,
      });
      // 유효성 검사 오류 상세 출력
      if (err.response?.data?.errors) {
        console.error("유효성 검사 오류 상세:", JSON.stringify(err.response.data.errors, null, 2));

        // 오류 메시지 구성
        const errorDetails = err.response.data.errors
          .map((error: any) => {
            return `${error.path || "알 수 없는 필드"}: ${error.message || "유효하지 않음"}`;
          })
          .join(", ");

        setError(`리뷰를 등록하는 중 오류가 발생했습니다: ${errorDetails}`);
        return; // 오류 메시지 설정 후 함수 종료
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 유효성 검사 (필수 필드가 입력되었는지 확인)
  const isReviewValid = rating > 0 && content.trim().length > 0 && aroma.length > 0;
  return (
    <div className="flex flex-col items-start gap-5 w-full max-w-[30rem]">
      <ReviewTop />
      <ReviewMiddle />
      {error && <p className="text-red-500 text-sm w-full text-center">{error}</p>}
      <Button disabled={!isReviewValid || isSubmitting} size={size} onClick={handleClickAddReview}>
        {isSubmitting ? "처리 중..." : "리뷰 남기기"}
      </Button>
    </div>
  );
}
