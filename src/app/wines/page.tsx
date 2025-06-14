"use client";

import { useMemo, useState } from "react";

import MonthlyWines from "@/components/about-wine/MonthlyWines";
import WineInfoCard from "@/components/about-wine/WineInfoCard";
import Button from "@/components/Button";
import PriceFilter from "@/components/Filters/PriceFilter";
import RatingFilter from "@/components/Filters/RatingFilter";
import TypeFilter from "@/components/Filters/TypeFilter";
import SearchInput from "@/components/input/SearchInput";
import winesData from "@/mocks/winesData.json";
import type { BaseWineData } from "@/types/Wine";

export default function WinesPage() {
  const wines = winesData.list as BaseWineData[];
  const [search, setSearch] = useState("");

  const filteredWines = useMemo(() => {
    return wines.filter((wine) => wine.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, wines]);

  return (
    <main className="flex flex-col items-center">
      <MonthlyWines />
      <div className="flex w-full max-w-[80rem] gap-12 mt-6">
        {/* 왼쪽: 필터 */}
        <aside className="w-full max-w-[284px] shrink-0 flex flex-col gap-6 mt-30">
          <TypeFilter />
          <PriceFilter />
          <RatingFilter />
          <Button className="rounded-2xl max-w-[284px] mt-6" size="lg" variant="primary">
            와인 등록하기
          </Button>
        </aside>

        {/* 오른쪽: 검색 + 와인 리스트 (우측 정렬) */}
        <section className="flex-1">
          <div className="flex flex-col w-full max-w-[50rem] ml-auto">
            <SearchInput
              className="mb-10"
              placeholder="와인을 검색해보세요"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {filteredWines.map((wine) => (
              <WineInfoCard key={wine.id} data={wine} />
            ))}
            {filteredWines.length === 0 && (
              <p className="text-center text-gray-500 mt-8">검색 결과가 없습니다.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
