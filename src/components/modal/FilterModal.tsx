"use client";

import { useEffect, useState } from "react";

import Button from "@/components/Button";
import useModalStore from "@/store/useModalStore";

import PriceFilter from "../Filters/PriceFilter";
import RatingFilter from "../Filters/RatingFilter";
import TypeFilter from "../Filters/TypeFilter";

interface FilterModalProps {
  selectedType: string;
  priceRange: [number, number];
  selectedRating: string | null;
  onTypeChange: (type: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onRatingChange: (rating: string | null) => void;
}

export default function FilterModal({
  selectedType,
  priceRange,
  selectedRating,
  onTypeChange,
  onPriceChange,
  onRatingChange,
}: FilterModalProps) {
  //  모달 내부에서 별도로 관리하는 로컬 상태
  const { close } = useModalStore();
  const [localType, setLocalType] = useState(selectedType);
  const [localPrice, setLocalPrice] = useState<[number, number]>(priceRange);
  const [localRating, setLocalRating] = useState<string | null>(selectedRating);

  // 부모 상태 변경 시에도 초기값 유지 (모달 재열릴 때 반영용)
  useEffect(() => {
    setLocalType(selectedType);
    setLocalPrice(priceRange);
    setLocalRating(selectedRating);
  }, [selectedType, priceRange, selectedRating]);

  //  초기화 버튼 클릭 시 - 로컬 상태만 리셋
  const handleReset = () => {
    setLocalType("");
    setLocalPrice([0, 1000000]);
    setLocalRating(null);
  };

  //  적용 버튼 클릭 시 - 부모 상태를 업데이트
  const handleApply = () => {
    onTypeChange(localType);
    onPriceChange(localPrice);
    onRatingChange(localRating);
    close();
  };

  return (
    <section aria-label="모달 열기" className="p-4">
      <TypeFilter selectedType={localType} onChange={setLocalType} />
      <PriceFilter selectedRange={localPrice} onChange={setLocalPrice} />
      <RatingFilter selected={localRating} onChange={setLocalRating} />

      <div className="flex justify-between gap-4 mt-8">
        <Button size="sm" variant="secondary" onClick={handleReset}>
          초기화
        </Button>
        <Button size="lg" variant="primary" onClick={handleApply}>
          필터 적용하기
        </Button>
      </div>
    </section>
  );
}
