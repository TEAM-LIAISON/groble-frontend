import ProductCard from '@/entities/product/ui/product-card';
import Pagination from '@/shared/ui/Pagination';
import type { MarketContentsData } from '../types/marketTypes';

interface ContentListSectionProps {
  contentsData: MarketContentsData;
  marketLinkUrl: string;
}

/**
 * 콘텐츠 목록 섹션 컴포넌트
 */
export function ContentListSection({
  contentsData,
  marketLinkUrl,
}: ContentListSectionProps) {
  const { items, pageInfo } = contentsData;

  return (
    <section>
      {/* 콘텐츠 그리드 */}
      <div className="grid grid-cols-2 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 sm:gap-5 mb-8">
        {items.map((item) => (
          <ProductCard
            key={item.contentId}
            contentId={item.contentId.toString()}
            thumbnailUrl={item.thumbnailUrl}
            title={item.title}
            lowestPrice={item.lowestPrice || 0}
            priceOptionLength={item.priceOptionLength}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      {pageInfo.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={pageInfo.currentPage + 1} // API는 0부터 시작하므로 +1
            totalPages={pageInfo.totalPages}
          />
        </div>
      )}
    </section>
  );
}
