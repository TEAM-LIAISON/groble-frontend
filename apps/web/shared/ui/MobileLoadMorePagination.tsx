'use client';

import { Button } from '@groble/ui';
import LoadingSpinner from './LoadingSpinner';
import Pagination from './Pagination';

interface MobileLoadMorePaginationProps {
  // 데스크톱 페이지네이션용
  currentPage: number;
  totalPages: number;

  // 모바일 더보기용
  hasNextPage: boolean;
  isLoadingMore?: boolean;
  onLoadMore: () => void;

  // 선택적 스타일링
  className?: string;
}

/**
 * 모바일에서는 더보기 버튼, 데스크톱에서는 기존 페이지네이션을 제공하는 컴포넌트
 */
export default function MobileLoadMorePagination({
  currentPage,
  totalPages,
  hasNextPage,
  isLoadingMore = false,
  onLoadMore,
  className = '',
}: MobileLoadMorePaginationProps) {
  return (
    <>
      {/* 데스크톱 페이지네이션 */}
      {totalPages > 1 && (
        <div className={`hidden md:flex justify-center ${className}`}>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}

      {/* 모바일 더보기 버튼 */}
      {hasNextPage && (
        <div className={`md:hidden flex justify-center ${className}`}>
          <Button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            group="outlined"
            type="tertiary"
            size="x-small"
            className="w-full"
          >
            {isLoadingMore ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="small" />
                <span>로딩중...</span>
              </div>
            ) : (
              '더보기'
            )}
          </Button>
        </div>
      )}
    </>
  );
}
