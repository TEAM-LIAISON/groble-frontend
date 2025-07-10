import ProductCard from '@/entities/product/ui/product-card';
import Pagination from '@/shared/ui/Pagination';
import type {
  PurchaserContentPreviewCardResponse,
  PageInfo,
} from '../types/purchaseTypes';

interface PurchaseListProps {
  items: PurchaserContentPreviewCardResponse[];
  pageInfo?: PageInfo;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  emptyMessage?: string;
}

export default function PurchaseList({
  items,
  pageInfo,
  isLoading,
  isError,
  error,
  emptyMessage = '구매한 상품이 없습니다.',
}: PurchaseListProps) {
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
            {emptyMessage}
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <ProductCard
                key={`${item.contentId}-${index}`}
                contentId={item.contentId}
                thumbnailUrl={item.thumbnailUrl}
                title={item.title}
                sellerName={item.sellerName}
                finalPrice={item.finalPrice}
                originalPrice={item.originalPrice ?? undefined}
                // 구매 관리용 속성들
                state={true} // 상태와 구매 시간 표시
                price={true} // 가격 표시
                star={false} // 별점 표시 안함
                dot={false} // 더보기 버튼 표시 안함
                option={false} // 옵션 표시 안함
                // 상태 관련 데이터
                orderStatus={item.orderStatus}
                purchasedAt={item.purchasedAt}
                merchantUid={item.merchantUid}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          {pageInfo && pageInfo.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={pageInfo.currentPage + 1} // API는 0부터 시작, UI는 1부터 시작
                totalPages={pageInfo.totalPages}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
