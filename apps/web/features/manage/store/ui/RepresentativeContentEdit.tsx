'use client';

import { useState } from 'react';
import Image from 'next/image';
import CheckBox from '@/components/ui/CheckBox';
import type { ContentPreviewCardResponse } from '../../types/storeTypes';

interface RepresentativeContentEditProps {
  contentList?: ContentPreviewCardResponse[];
  selectedContentId?: string;
  onContentSelect: (contentId: string) => void;
}

// 로컬 페이지네이션 컴포넌트 (web의 Pagination 스타일)
interface LocalPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function LocalPagination({
  currentPage,
  totalPages,
  onPageChange,
}: LocalPaginationProps) {
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
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-sm disabled:opacity-40"
        aria-label="이전 페이지"
      >
        &lt;
      </button>

      {/* 페이지 번호 버튼 */}
      {pageRange.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-sm disabled:opacity-40"
        aria-label="다음 페이지"
      >
        &gt;
      </button>
    </div>
  );
}

export function RepresentativeContentEdit({
  contentList = [],
  selectedContentId,
  onContentSelect,
}: RepresentativeContentEditProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(contentList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContents = contentList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleContentClick = (contentId: string) => {
    // 이미 선택된 항목을 다시 클릭하면 선택 해제, 아니면 새로 선택
    if (selectedContentId === contentId.toString()) {
      onContentSelect(''); // 선택 해제
    } else {
      onContentSelect(contentId.toString()); // 새로 선택
    }
  };

  const handleCheckboxChange = (contentId: string, checked: boolean) => {
    if (checked) {
      onContentSelect(contentId.toString()); // 새로 선택
    } else {
      onContentSelect(''); // 선택 해제
    }
  };

  // 가격 포맷팅 함수
  const formatPrice = (price: number | null) => {
    if (price === null) return '가격 미정';
    return `${price.toLocaleString()}원`;
  };

  // 빈 상태 처리
  if (contentList.length === 0) {
    return (
      <div className="flex flex-col mt-10">
        <h2 className="text-body-2-normal font-bold text-label-normal">
          대표 콘텐츠 설정
        </h2>
        <hr className="my-3 border-line-normal" />

        <div className="flex justify-center items-center py-20">
          <p className="text-label-1-normal text-label-alternative">
            등록된 콘텐츠가 없습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-10">
      <h2 className="text-body-2-normal font-bold text-label-normal">
        대표 콘텐츠 설정
      </h2>
      <hr className="my-3 border-line-normal" />

      <div className="space-y-4">
        {currentContents.map((content) => (
          <div
            key={content.contentId}
            className="flex items-center gap-3 cursor-pointer hover:bg-background-alternative rounded-lg p-2 transition-colors"
            onClick={() => handleContentClick(content.contentId.toString())}
          >
            <CheckBox
              selected={selectedContentId === content.contentId.toString()}
              onChange={(checked) =>
                handleCheckboxChange(content.contentId.toString(), checked)
              }
              size="medium"
            />

            <div className="flex gap-3 items-center flex-1 ml-3">
              <div className="w-[5rem] h-[5rem] rounded-sm relative">
                <Image
                  src={
                    content.thumbnailUrl || '/assets/common/icons/Avatar.svg'
                  }
                  alt={content.title}
                  fill
                  className="rounded-sm object-cover"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-body-1-normal font-semibold text-label-normal">
                  {content.title}
                </p>
                <p className="text-label-1-normal font-semibold text-label-alternative">
                  {content.sellerName}
                </p>
                <p className="text-label-1-normal font-semibold text-label-alternative">
                  {formatPrice(content.lowestPrice)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-6">
          <LocalPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
