"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ChevronIcon } from "../icons/ChevronIcon";
import { ProductItemSummary } from "@/lib/types/productType";

interface ProductListProps {
  title: string;
  products: ProductItemSummary[];
  viewAllHref?: string;
  showViewAll?: boolean;
}

export default function ProductList({
  title,
  products,
  viewAllHref,
  showViewAll = true,
}: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 화면 크기별 표시 개수 (반응형 디자인에 맞춰 조정)
  const itemsPerPage = {
    sm: 2, // 모바일
    md: 2, // 태블릿
    lg: 3, // 소형 데스크톱
    xl: 4, // 중형 데스크톱
    "2xl": 4, // 대형 데스크톱 (5개에서 4개로 변경)
  };

  // 현재 페이지에 표시할 상품 계산
  const visibleProducts = products.slice(
    currentPage * itemsPerPage.xl,
    (currentPage + 1) * itemsPerPage.xl,
  );

  // 페이지 네비게이션
  const totalPages = Math.ceil(products.length / itemsPerPage.xl);
  const canGoPrev = currentPage > 0;
  const canGoNext =
    currentPage < totalPages - 1 && products.length > itemsPerPage.xl;

  // 페이지 이동 함수
  const navigate = (direction: "prev" | "next") => {
    // 스크롤 작동 (모바일에서 주로 사용)
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "prev" ? -1 : 1;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const scrollPosition = container.scrollLeft;

      // 스크롤 위치 계산
      container.scrollBy({
        left: scrollAmount * (clientWidth / 2),
        behavior: "smooth",
      });
    }

    // 페이지 전환 (모바일에서는 스크롤만 사용, 데스크톱에서는 페이지도 변경)
    setCurrentPage((prev) =>
      direction === "prev"
        ? Math.max(0, prev - 1)
        : Math.min(totalPages - 1, prev + 1),
    );
  };

  return (
    <section className="w-full">
      {/* 제목과 네비게이션 버튼 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="line-clamp-2 max-w-[80%] text-lg font-semibold md:text-heading-1 md:font-bold">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          {/* 화살표 네비게이션 - md 이하에서는 숨김 */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => navigate("prev")}
              disabled={!canGoPrev}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-40"
              aria-label="이전 상품 보기"
            >
              <ChevronIcon direction="left" className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("next")}
              disabled={!canGoNext}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-40"
              aria-label="다음 상품 보기"
            >
              <ChevronIcon direction="right" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 상품 리스트 - 순수 반응형으로 구현 */}
      <div
        ref={containerRef}
        className="scrollbar-hide flex gap-3 overflow-x-auto pb-4 md:gap-4 md:overflow-visible md:pb-0"
      >
        {products.map((product, index) => (
          <div
            key={product.contentId || index}
            className="min-w-[160px] flex-none px-1 sm:min-w-[180px] md:hidden"
          >
            <ProductCard {...product} />
          </div>
        ))}

        {/* 태블릿 이상 화면에서만 페이지네이션 표시 */}
        {visibleProducts.map((product, index) => (
          <div
            key={`desktop-${product.contentId || index}`}
            className="hidden px-1 md:block md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4"
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      {/* 자세히 보기 링크 - 섹션 오른쪽 하단에 배치 */}
      {showViewAll && viewAllHref && (
        <div className="mt-2 flex justify-end">
          <Link
            href={viewAllHref}
            className="hidden items-center text-sm font-medium text-primary-sub-1 hover:underline md:inline-flex"
          >
            자세히 보기 <span className="ml-0.5">›</span>
          </Link>
        </div>
      )}
    </section>
  );
}
