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
  const queryClient = useQueryClient(); // React Query 클라이언트 가져오기

  const { rating, content, lightBold, smoothTannic, drySweet, softAcidic, aroma, resetReview } =
    useReviewStore();

  const { wine } = useWineStore();

  // 컴포넌트가 언마운트될 때 리뷰 초기화
  useEffect(() => {
    return () => {
      resetReview();
    };
  }, [resetReview]);

  // 원래 close 함수를 감싸서 리뷰 초기화 후 모달 닫기
  const handleClose = () => {
    resetReview();
    close();
  };
  const handleClickAddReview = async () => {
    if (!wine) return;
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
      // 아로마 값 검증 및 로깅
      console.log("아로마 데이터 타입:", typeof aroma, Array.isArray(aroma));
      console.log("아로마 데이터 값:", aroma);
      console.log("아로마 데이터 예시 값:", aroma.length > 0 ? aroma[0] : "없음");

      // 서버가 기대하는 아로마 형식으로 변환 시도
      // 아로마 값을 문자열로 변환 (서버가 필요로 하는 형식에 따라)
      const aromaValues = aroma; // 리뷰 데이터 구성
      const reviewData: CreateReviewData = {
        wineId: wine.id,
        rating, // UI에서는 소수점(3.5 등)이 허용되지만 서버에 전송될 때는 정수로 변환됨
        content,
        lightBold,
        smoothTannic,
        drySweet,
        softAcidic,
        aroma: aromaValues,
      };

      // 서버에 전송될 rating 값 안내 (소수점 별점이 정수로 변환됨)
      if (rating % 1 !== 0) {
        console.log(
          `선택한 별점 ${rating}는 서버 요청 시 ${Math.round(rating)}(으)로 변환되어 전송됩니다.`
        );
      }
      console.log("서버로 전송할 리뷰 데이터:", JSON.stringify(reviewData, null, 2));
      console.log("인증 토큰:", accessToken ? "토큰 있음" : "토큰 없음"); // API 호출 및 응답 처리
      const response = await postReview(reviewData);
      console.log("리뷰 작성 성공:", response); // 성공 시 React Query 캐시 무효화하여 와인 데이터 다시 로드
      if (wine?.id) {
        console.log(`와인 ID ${wine.id}에 대한 쿼리 캐시를 무효화합니다.`);

        // 캐시 무효화 강화 - 모든 관련 쿼리 무효화
        await queryClient.invalidateQueries({ queryKey: ["wine", String(wine.id)] });
        await queryClient.refetchQueries({ queryKey: ["wine", String(wine.id)] });

        console.log(`와인 ID ${wine.id}에 대한 쿼리 캐시를 무효화하고 데이터를 다시 가져왔습니다.`);

        // 안정적인 UI 업데이트를 위해 페이지 새로고침
        window.location.reload();
      }

      // 응답 데이터 검증
      if (!response || !response.id) {
        console.warn("리뷰가 생성되었지만 ID가 없습니다. 페이지를 새로고침하세요.");
      }

      // 성공 시 모달 닫기
      handleClose();
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
