import ProductCard from '@/entities/product/ui/product-card';
import NoContent from '@/shared/ui/NoContent';
import MobileLoadMorePagination from '@/shared/ui/MobileLoadMorePagination';
import { getDropdownItems, renderActionButtons } from '../utils/productUtils';
import type {
  ContentPreviewCardResponse,
  ContentStatus,
} from '../types/productTypes';

interface ProductsGridProps {
  items: ContentPreviewCardResponse[];
  accumulatedItems: ContentPreviewCardResponse[];
  pageInfo: any;
  urlPage: number;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  handlers: {
    openEditModal: (contentId: number) => void;
    openStopModal: (contentId: number) => void;
    openDeleteModal: (contentId: number) => void;
    openCannotDeleteModal: (contentId: number) => void;
    openCannotSaleModal: (contentId: number) => void;
    handleActivateContent: (contentId: number) => void;
    handleManageContent: (contentId: number) => void;
    handleViewStats: (contentId: number) => void;
    handleEditContent: (contentId: number) => void;
  };
}

export default function ProductsGrid({
  items,
  accumulatedItems,
  pageInfo,
  urlPage,
  isLoadingMore,
  onLoadMore,
  handlers,
}: ProductsGridProps) {
  const displayItems = accumulatedItems.length > 0 ? accumulatedItems : items;

  return (
    <>
      {/* 콘텐츠 그리드 */}
      {displayItems.length > 0 ? (
        <div
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          style={{ gridAutoRows: '1fr' }}
        >
          {displayItems.map((content) => (
            <div key={content.contentId} className="flex flex-col min-h-0">
              <div className="flex-1">
                <ProductCard
                  contentId={content.contentId}
                  thumbnailUrl={content.thumbnailUrl}
                  title={content.title}
                  lowestPrice={content.lowestPrice ?? undefined}
                  priceOptionLength={content.priceOptionLength}
                  orderStatus={content.status as ContentStatus}
                  purchasedAt={content.createdAt}
                  dotDirection="vertical"
                  dropdownItems={getDropdownItems(content, {
                    openEditModal: handlers.openEditModal,
                    openStopModal: handlers.openStopModal,
                    openDeleteModal: handlers.openDeleteModal,
                    openCannotDeleteModal: handlers.openCannotDeleteModal,
                    handleEditContent: handlers.handleEditContent,
                  })}
                />
              </div>
              <div className="mt-auto">
                {renderActionButtons(content, {
                  handleActivateContent: handlers.handleActivateContent,
                  handleManageContent: handlers.handleManageContent,
                  handleViewStats: handlers.handleViewStats,
                  openCannotSaleModal: handlers.openCannotSaleModal,
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <NoContent message="아직 상품이 없어요" />
        </div>
      )}

      {/* 페이지네이션 */}
      {pageInfo && accumulatedItems.length > 0 && (
        <div className="mt-8">
          <MobileLoadMorePagination
            currentPage={urlPage} // UI 기준 페이지 번호 (1부터 시작)
            totalPages={pageInfo.totalPages}
            hasNextPage={!pageInfo.last}
            isLoadingMore={isLoadingMore}
            onLoadMore={onLoadMore}
          />
        </div>
      )}
    </>
  );
}
