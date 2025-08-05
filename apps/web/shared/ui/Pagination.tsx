'use client';

import ArrowIcon from '@/components/(improvement)/icons/ArrowIcon';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 페이지 이동 처리
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  // 표시할 페이지 범위 계산
  const getPageRange = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageRange = getPageRange();

  return (
    <div className="flex items-center justify-center gap-1">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-sm disabled:opacity-40"
        aria-label="이전 페이지"
      >
        <ArrowIcon direction="left" />
      </button>

      {/* 페이지 번호 버튼 */}
      {pageRange.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`flex h-9 w-9 items-center justify-center rounded-md text-sm ${
            currentPage === page
              ? 'border border-primary-sub-1 text-primary-sub-1'
              : 'border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-sm disabled:opacity-40"
        aria-label="다음 페이지"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}
