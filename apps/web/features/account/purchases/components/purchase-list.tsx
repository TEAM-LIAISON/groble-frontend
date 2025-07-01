'use client';

import { usePurchaseContents } from '../hooks/usePurchaseContents';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import Link from 'next/link';

interface PurchaseListProps {
  state?: string;
}

export default function PurchaseList({ state }: PurchaseListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePurchaseContents({ state });

  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-body-1-normal text-label-alternative">
          구매 내역을 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  const allItems =
    data?.pages.flatMap((page) => page.data?.content || []) || [];

  if (allItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-body-1-normal text-label-alternative">
          구매한 콘텐츠가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allItems.map((item, index) => (
        <div key={item.purchaseId}>
          {index > 0 && <hr className="text-line-normal" />}
          <Link
            href={`/account/purchases/${item.purchaseId}`}
            className="block py-4 hover:opacity-80 transition-opacity"
          >
            <div className="flex flex-col gap-2">
              <span className="text-caption-1 font-semibold text-label-alternative">
                No.{item.purchaseId} •{' '}
                {new Date(item.purchaseDate)
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\./g, '.')}
              </span>

              <div className="flex gap-4">
                <div className="w-[9.8rem] h-[7.3rem] bg-background-alternative rounded-[0.37rem] relative overflow-hidden">
                  {item.thumbnailUrl && (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-[0.13rem] flex-1">
                  <p className="text-label-1-normal font-semibold text-label-alternative">
                    {item.sellerName}
                  </p>
                  <p className="text-body-1-normal font-semibold text-label-normal line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-label-1-normal text-label-alternative">
                    {item.optionName}
                  </p>
                  <span className="flex text-body-1-normal font-bold">
                    {item.price.toLocaleString()}
                    <span className="font-medium">원</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="h-4">
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
}
