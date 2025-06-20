// src/hooks/useInfiniteScroll.ts

import { useCallback, useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  hasNext: boolean;
  isLoading: boolean;
  onLoadMore: () => void | Promise<void>;
  threshold?: number;
  rootMargin?: string;
}

const DEFAULT_THRESHOLD = 1;
const DEFAULT_ROOT_MARGIN = "0px";

export const useInfiniteScroll = ({
  hasNext,
  isLoading,
  onLoadMore,
  threshold = DEFAULT_THRESHOLD,
  rootMargin = DEFAULT_ROOT_MARGIN,
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const observerInstanceRef = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting && hasNext && !isLoading) {
        observerInstanceRef.current?.disconnect();

        const maybePromise = onLoadMore();

        if (maybePromise instanceof Promise) {
          maybePromise.finally(() => {
            const el = observerRef.current;
            if (el) observerInstanceRef.current?.observe(el);
          });
        } else {
          const el = observerRef.current;
          if (el) observerInstanceRef.current?.observe(el);
        }
      }
    },
    [hasNext, isLoading, onLoadMore]
  );

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    if (observerInstanceRef.current) {
      observerInstanceRef.current.disconnect();
    }

    observerInstanceRef.current = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin,
    });

    observerInstanceRef.current.observe(el);

    return () => {
      observerInstanceRef.current?.disconnect();
    };
  }, [handleObserver, threshold, rootMargin]);

  return { observerRef };
};
