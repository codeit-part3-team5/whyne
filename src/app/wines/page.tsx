//와인 목록 페이지

"use client";

import { useMemo, useState } from "react";

import MonthlyWines from "@/components/about-wine/MonthlyWines";
import WineInfoCard from "@/components/about-wine/WineInfoCard";
import SearchInput from "@/components/input/SearchInput";
import winesData from "@/mocks/winesData.json";
import type { BaseWineData } from "@/types/Wine";

export default function WinesPage() {
  const wines = winesData.list as BaseWineData[];
  const [search, setSearch] = useState("");

  // 검색 결과
  const filteredWines = useMemo(() => {
    return wines.filter((wine) => wine.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, wines]);

  return (
    <main>
      <MonthlyWines />
      <div className="w-full max-w-[50rem] my-4">
        <SearchInput
          placeholder="와인을 검색해보세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filteredWines.map((wine) => (
        <WineInfoCard key={wine.id} data={wine} />
      ))}
      {filteredWines.length === 0 && (
        <p className="text-center text-gray-500 mt-8">검색 결과가 없습니다.</p>
      )}
    </main>
  );
}
