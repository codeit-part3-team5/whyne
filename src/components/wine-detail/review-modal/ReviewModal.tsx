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
  const { rating, content, lightBold, smoothTannic, drySweet, softAcidic, aroma, resetReview } =
    useReviewStore();

  const { wine } = useWineStore();

  const handleClickAddReview = () => {
    if (!wine) return;

    // 리뷰 데이터 구성
    const reviewData = {
      wineId: wine.id,
      rating,
      content,
      taste: {
        lightBold,
        smoothTannic,
        drySweet,
        softAcidic,
      },
      aroma,
    };

    // API 호출 부분 (실제 구현 필요)
    console.log("리뷰 데이터 제출:", reviewData);

    // 리뷰 스토어 초기화
    resetReview();

    close();
  };

  // 유효성 검사 (필수 필드가 입력되었는지 확인)
  const isReviewValid = rating > 0 && content.trim().length > 0 && aroma.length > 0;

  return (
    <div className="flex flex-col items-start gap-5 w-full max-w-[30rem]">
      <ReviewTop />
      <ReviewMiddle />
      <Button disabled={!isReviewValid} size={size} onClick={handleClickAddReview}>
        리뷰 남기기
      </Button>
    </div>
  );
}
