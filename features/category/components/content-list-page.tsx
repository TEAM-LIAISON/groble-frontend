import ProductFilter from "@/features/category/filters/product-filter";
import ProductCard from "@/entities/product/ui/product-card";
import Pagination from "@/shared/ui/Pagination";

import { ProductCardProps, ProductContentType } from "@/entities/product/model";
import { ApiFilterOptions } from "@/shared/types/api-types";
import { CategorySearchParams } from "../types/search-params";
import { fetchCategoryContents } from "../api/category-content-api";

const DEFAULT_PAGE_SIZE = 24;

export interface ContentListPageProps {
  contentType: ProductContentType;
  searchParams: CategorySearchParams;
  title?: string;
}

export default async function ContentListPage({
  contentType,
  searchParams,
  title,
}: ContentListPageProps) {
  // 1. 검색 파라미터 파싱
  const categoryId = searchParams.categoryId;
  const pageIndex = Number(searchParams.page ?? "1") - 1;
  const sortBy = searchParams.sort ?? "createdAt";

  // 2. API 호출 옵션 준비
  const apiOptions: ApiFilterOptions = {
    categoryId,
    page: pageIndex,
    sort: sortBy,
    size: DEFAULT_PAGE_SIZE,
  };

  // 3. 데이터 페칭
  const { data } = await fetchCategoryContents(contentType, apiOptions);
  const { items = [], pageInfo } = data;

  // 4. 렌더링
  return (
    <div className="flex w-full flex-col items-center pb-20">
      <div className="w-full max-w-[1250px] px-5 pt-5 sm:px-8 lg:px-12">
        {title && <h1 className="mb-6 text-2xl font-bold">{title}</h1>}

        {/* 필터 */}
        <ProductFilter contentType={contentType} />

        {/* 상품 목록 */}
        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {items.map((item: ProductCardProps) => (
              <div
                key={item.contentId}
                className="flex justify-center md:justify-start"
              >
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="my-12 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}

        {/* 페이지네이션 */}
        {pageInfo.totalPages > 0 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={pageInfo.currentPage + 1} // API는 0부터 시작하므로 +1 처리
              totalPages={pageInfo.totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
}
