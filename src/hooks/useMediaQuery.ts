"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // 초기값 설정
    setMatches(media.matches);

    // 리스너 설정
    function listener(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    // 리스너 등록
    media.addEventListener("change", listener);

    // 클린업
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
