import ArrowIcon from '../icons/ArrowIcon';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

// 페이지 범위를 계산하는 유틸리티 함수
function calculatePageRange(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
) {
  if (totalPages <= maxVisible) {
    return {
      pages: Array.from({ length: totalPages }, (_, i) => i + 1),
      showStartEllipsis: false,
      showEndEllipsis: false,
    };
  }

  const halfVisible = Math.floor(maxVisible / 2);
  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  // 끝쪽에 가까우면 시작을 조정
  if (endPage === totalPages) {
    startPage = Math.max(1, totalPages - maxVisible + 1);
  }

  // 시작쪽에 가까우면 끝을 조정
  if (startPage === 1) {
    endPage = Math.min(totalPages, maxVisible);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return {
    pages,
    showStartEllipsis: startPage > 1,
    showEndEllipsis: endPage < totalPages,
  };
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(totalPages, page + 1));

  const { pages, showStartEllipsis, showEndEllipsis } = calculatePageRange(
    page,
    totalPages
  );

  return (
    <nav className="inline-flex items-center space-x-[0.38rem]">
      {/* 이전 버튼 */}
      <button
        onClick={prev}
        disabled={page === 1}
        className="flex items-center justify-center rounded-lg border border-line-normal disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100 w-8 h-8 bg-white cursor-pointer"
      >
        <ArrowIcon direction="left" />
      </button>

      {/* 첫 페이지 */}
      {showStartEllipsis && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`flex items-center justify-center rounded-lg border w-8 h-8 cursor-pointer ${
              1 === page
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-line-normal bg-white hover:bg-gray-100'
            }`}
          >
            1
          </button>
          <span className="flex items-center justify-center w-8 h-8 text-gray-500">
            ...
          </span>
        </>
      )}

      {/* 페이지 번호들 */}
      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`flex items-center justify-center rounded-lg border w-8 h-8 cursor-pointer ${
            num === page
              ? 'border-primary-sub-1 text-primary-sub-1'
              : 'border-line-normal bg-white hover:bg-gray-100'
          }`}
        >
          {num}
        </button>
      ))}

      {/* 마지막 페이지 */}
      {showEndEllipsis && (
        <>
          <span className="flex items-center justify-center w-8 h-8 text-gray-500">
            ...
          </span>
          <button
            onClick={() => onPageChange(totalPages)}
            className={`flex items-center justify-center rounded-lg border w-8 h-8 cursor-pointer ${
              totalPages === page
                ? 'border-primary-sub-1 text-primary-sub-1'
                : 'border-line-normal bg-white hover:bg-gray-100'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* 다음 버튼 */}
      <button
        onClick={next}
        disabled={page === totalPages}
        className="flex items-center justify-center rounded-lg border border-line-normal disabled:opacity-50 hover:bg-gray-100 w-8 h-8 bg-white cursor-pointer"
      >
        <ArrowIcon direction="right" />
      </button>
    </nav>
  );
}
