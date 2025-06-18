"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { getWines } from "@/apis/winesApi";
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
import useModalStore from "@/store/useModalStore";
import type { BaseWineData } from "@/types/Wine";

export default function WinesPage() {
  const [search, setSearch] = useState("");
  const openModal = useModalStore((state) => state.open);
  const [wines, setWines] = useState<BaseWineData[]>([]); //get api

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const data = await getWines(10);
        setWines(data);
      } catch (error) {
        console.error("와인 데이터를 불러오는 중 오류:", error);
      }
    };
    fetchWines();
  }, []);

  const filteredWines = useMemo(() => {
    return wines.filter((wine) => wine.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, wines]);

  return (
    <main className="flex flex-col items-center">
      <MonthlyWines />
      <div className="flex w-full max-w-[80rem] gap-1 sm:gap-4 md:gap-10 lg:gap-20 mt-6">
        {/* 데스크탑 전용 필터 */}
        <aside className="hidden lg:flex w-full max-w-[284px] shrink-0 flex-col gap-2 mt-30">
          <TypeFilter />
          <PriceFilter />
          <RatingFilter />
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
            {/* 모바일/태블릿용 필터 아이콘 (lg 미만에서만 보임) */}
            <div aria-label="필터 열기" className="lg:hidden w-full flex justify-start">
              <button
                className="w-[2.375rem] h-[2.375rem] flex items-center justify-center bg-white hover:bg-gray-100 transition-colors duration-200"
                type="button"
                onClick={() => openModal("filter", <FilterModal />)}
              >
                <Image alt="필터 아이콘" height={28} src={filterIcon} width={28} />
              </button>
            </div>
          </div>
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
