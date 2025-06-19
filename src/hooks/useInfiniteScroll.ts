import { useCallback, useEffect, useRef } from "react";

/**
 * 무한 스크롤 훅의 옵션 인터페이스
 */
interface UseInfiniteScrollOptions {
  /** 추가로 로드할 데이터가 있는지 여부 */
  hasNext: boolean;
  /** 현재 로딩 중인지 여부 */
  isLoading: boolean;
  /** 추가 데이터 로드를 위한 콜백 함수 */
  onLoadMore: () => void | Promise<void>;
  /** Intersection Observer의 임계값 (0.0 ~ 1.0) */
  threshold?: number;
  /** Intersection Observer의 루트 마진 */
  rootMargin?: string;
}

/**
 * 기본값 상수 정의
 */
/** 기본 임계값 - 요소의 10%가 보일 때 트리거 */
const DEFAULT_THRESHOLD = 0.1;
/** 기본 루트 마진 - 뷰포트 하단에서 100px(6.25rem) 전에 트리거 */
const DEFAULT_ROOT_MARGIN = "6.25rem";

/**
 * 무한 스크롤 기능을 제공하는 커스텀 훅
 *
 * Intersection Observer API를 사용하여 지정된 요소가 뷰포트에 들어올 때
 * 자동으로 추가 데이터를 로드하는 기능을 제공합니다.
 *
 * @param options - 무한 스크롤 설정 옵션
 * @returns observerRef - 관찰할 요소에 연결할 ref 객체
 *
 * @example
 * ```tsx
 * const { observerRef } = useInfiniteScroll({
 *   hasNext: hasMoreData,
 *   isLoading: loading,
 *   onLoadMore: fetchMoreData,
 * });
 *
 * return (
 *   <div>
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *     <div ref={observerRef} />
 *   </div>
 * );
 * ```
 */
export const useInfiniteScroll = ({
  hasNext,
  isLoading,
  onLoadMore,
  threshold = DEFAULT_THRESHOLD,
  rootMargin = DEFAULT_ROOT_MARGIN,
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const observerInstanceRef = useRef<IntersectionObserver | null>(null);

  /**
   * Intersection Observer 콜백 함수
   * 관찰 중인 요소가 뷰포트에 들어왔을 때 실행됩니다.
   *
   * @param entries - IntersectionObserverEntry 배열
   */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      // 요소가 교차하고, 더 로드할 데이터가 있으며, 현재 로딩 중이 아닐 때만 실행
      if (entry.isIntersecting && hasNext && !isLoading) {
        onLoadMore();
      }
    },
    [hasNext, isLoading, onLoadMore]
  );

  /**
   * IntersectionObserver 설정 및 관찰 시작
   * 의존성이 변경될 때마다 새로운 observer를 생성합니다.
   */
  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    // 기존 observer가 있다면 연결 해제
    if (observerInstanceRef.current) observerInstanceRef.current.disconnect();

    // 새로운 IntersectionObserver 인스턴스 생성
    observerInstanceRef.current = new IntersectionObserver(handleObserver, {
      threshold, // 요소의 몇 %가 보일 때 트리거할지 설정
      rootMargin, // 루트의 마진을 확장하여 더 일찍 트리거하도록 설정
    });

    // 요소 관찰 시작
    observerInstanceRef.current.observe(element);

    // 정리 함수 - effect가 다시 실행되거나 컴포넌트가 언마운트될 때 실행
    return () => {
      if (observerInstanceRef.current) {
        observerInstanceRef.current.disconnect();
      }
    };
  }, [handleObserver, threshold, rootMargin]);

  /**
   * 컴포넌트 언마운트 시 observer 정리
   */
  useEffect(() => {
    return () => {
      if (observerInstanceRef.current) {
        observerInstanceRef.current.disconnect();
      }
    };
  }, []);

  return { observerRef };
};
