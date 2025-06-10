"use client";

import { getPurchaseContents } from "@/features/manage/api/manage-products-api";
import {
  PurchaseContentsParams,
  PurchaseContentsResponse,
} from "@/features/manage/types/purchase-types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
import ProductManageItem from "@/features/manage/components/product-manage-item";

export default function PurchaseCoachingPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<PurchaseContentsResponse, Error>({
    queryKey: ["purchase-coaching", status],
    queryFn: ({ pageParam }) => {
      const params: PurchaseContentsParams = {
        type: "COACHING",
        state: status || undefined,
        cursorRequest: {
          cursor: pageParam as string | undefined,
          size: 20, // 페이지당 아이템 수
        },
      };
      return getPurchaseContents(params);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage: PurchaseContentsResponse) => {
      // API 응답에서 다음 페이지 커서 추출
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5분
  });

  // Intersection Observer를 사용한 무한 스크롤
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
      rootMargin: "20px",
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-sub-1 border-t-transparent"></div>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-body-1-normal text-status-error">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
        <p className="mt-2 text-body-2-normal text-label-alternative">
          {error?.message}
        </p>
      </div>
    );
  }

  // 모든 페이지의 데이터를 합침
  const allItems = data?.pages.flatMap((page) => page.items || []) || [];
  console.log(allItems);

  return (
    <div className="flex flex-col gap-4">
      {/* 데이터 표시 */}
      {allItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-body-1-normal text-label-alternative">
            구매한 코칭이 없습니다.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allItems.map((item, index) => (
            <ProductManageItem
              key={`${item.contentId}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      )}

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="h-10 w-full">
        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-sub-1 border-t-transparent"></div>
            <span className="ml-2 text-body-2-normal text-label-alternative">
              더 많은 콘텐츠를 불러오는 중...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
