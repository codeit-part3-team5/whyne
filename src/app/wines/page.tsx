"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import filterIcon from "@/assets/filter-icon.png";
import MonthlyWines from "@/components/about-wine/MonthlyWines";
import WineInfoCard from "@/components/about-wine/WineInfoCard";
import Button from "@/components/Button";
import PriceFilter from "@/components/Filters/PriceFilter";
import RatingFilter from "@/components/Filters/RatingFilter";
import TypeFilter from "@/components/Filters/TypeFilter";
import SearchInput from "@/components/input/SearchInput";
import FilterModal from "@/components/modal/FilterModal";
import WinePostModal from "@/components/modal/WinePostModal";
import winesData from "@/mocks/winesData.json";
import useModalStore from "@/store/useModalStore";
import type { BaseWineData } from "@/types/Wine";

export default function WinesPage() {
  const wines = winesData.list as BaseWineData[];
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  const openModal = useModalStore((state) => state.open);

  const filteredWines = useMemo(() => {
    return wines.filter((wine) => {
      const matchSearch = wine.name.toLowerCase().includes(search.toLowerCase());
      const matchType = selectedType ? wine.type === selectedType.toUpperCase() : true;
      const matchPrice = wine.price >= priceRange[0] && wine.price <= priceRange[1];
      const matchRating = selectedRating
        ? (() => {
            const rating = wine.avgRating;
            if (selectedRating === "4.5") return rating >= 4.5;
            if (selectedRating === "4.0") return rating >= 4.0 && rating < 4.5;
            if (selectedRating === "3.5") return rating >= 3.5 && rating < 4.0;
            if (selectedRating === "3.0") return rating >= 3.0 && rating < 3.5;
            return true;
          })()
        : true;

      return matchSearch && matchType && matchPrice && matchRating;
    });
  }, [search, wines, selectedType, priceRange, selectedRating]);

  return (
    <main className="flex flex-col items-center">
      <MonthlyWines />

      <div className="flex w-full max-w-[80rem] gap-1 sm:gap-4 md:gap-10 lg:gap-20 mt-6">
        {/* 데스크탑 전용 필터 */}
        <aside className="hidden lg:flex w-full max-w-[284px] shrink-0 flex-col gap-2 mt-30">
          <TypeFilter selectedType={selectedType} onChange={setSelectedType} />
          <PriceFilter selectedRange={priceRange} onChange={setPriceRange} />
          <RatingFilter selected={selectedRating} onChange={setSelectedRating} />
          <Button
            className="rounded-2xl max-w-[284px] mt-6"
            size="lg"
            variant="primary"
            onClick={() => openModal("addWine", <WinePostModal />)}
          >
            와인 등록하기
          </Button>
        </aside>

        {/* 와인 리스트 */}
        <section className="flex-1">
          <div className="flex flex-col w-full sm:w-[300px] lg:w-full sm:px-0 max-w-full lg:max-w-[50rem] lg:ml-auto">
            <SearchInput
              className="mb-3 sm:w-full"
              placeholder="와인을 검색해보세요"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* 모바일/태블릿용 필터 버튼 */}
            <div aria-label="필터 열기" className="lg:hidden w-full flex justify-start">
              <button
                className="w-[2.375rem] h-[2.375rem] flex items-center justify-center bg-white hover:bg-gray-100 transition-colors duration-200"
                type="button"
                onClick={() =>
                  openModal(
                    "filter",
                    <FilterModal
                      priceRange={priceRange}
                      selectedRating={selectedRating}
                      selectedType={selectedType}
                      onPriceChange={setPriceRange}
                      onRatingChange={setSelectedRating}
                      onTypeChange={setSelectedType}
                    />
                  )
                }
              >
                <Image alt="필터 아이콘" height={28} src={filterIcon} width={28} />
              </button>
            </div>
          </div>

          {/* 와인 카드 리스트 */}
          <div className="flex flex-col items-center w-full sm:px-2">
            <div className="w-full max-w-full sm:max-w-[36rem] md:max-w-[42rem] lg:max-w-[50rem] lg:ml-auto">
              {filteredWines.map((wine) => (
                <WineInfoCard key={wine.id} data={wine} />
              ))}
              {filteredWines.length === 0 && (
                <p className="text-center text-gray-500 mt-8">검색 결과가 없습니다.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
