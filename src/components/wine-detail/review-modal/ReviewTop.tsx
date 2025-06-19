"use client";

import { useWineStore } from "@/store/useWineStore";

import ReviewTitle from "./ReviewTitle";
import ReviewWrite from "./ReviewWrite";

export default function ReviewTop() {
  const { wine } = useWineStore();

  if (!wine) {
    return <span className="text-center p-4">와인 정보를 불러오는 중...</span>;
  }

  return (
    <section className="w-[480px] max-mb:w-full flex flex-col items-start gap-6">
      <ReviewTitle wineName={wine.name} />
      <ReviewWrite />
    </section>
  );
}
