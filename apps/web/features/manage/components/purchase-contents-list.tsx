import ProductManageItem from './product-manage-item';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

interface PurchaseContentsListProps {
  items: any[];
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
}

export default function PurchaseContentsList({
  items,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isLoading,
  isError,
  error,
}: PurchaseContentsListProps) {
  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

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

  return (
    <div className="flex flex-col gap-4">
      {/* 데이터 표시 */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-body-1-normal text-label-alternative">
            구매한 콘텐츠가 없습니다.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
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
