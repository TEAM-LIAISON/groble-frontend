import ProductFilter from "@/components/filters/ProductFilter";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/common/Pagination";
import { ProductItemSummary } from "@/lib/types/productType";
import { ApiFilterOptions } from "@/lib/types/apiTypes";
import { ContentType, getCategoryContents } from "@/lib/api/contentApi";

interface ContentListPageProps {
  contentType: ContentType;
  searchParams: {
    categoryId?: string;
    page?: string;
    sort?: string;
    [key: string]: string | string[] | undefined;
  };
  title?: string;
}

export default async function ContentListPage({
  contentType,
  searchParams,
  title,
}: ContentListPageProps) {
  // URL 파라미터에서 필터 정보 가져오기
  const categoryId = searchParams.categoryId;
  const page = searchParams.page ? parseInt(searchParams.page) - 1 : 0; // API는 0부터 시작하므로 -1 처리
  const sort = searchParams.sort || "createdAt";

  // API 요청 옵션 설정
  const apiOptions: ApiFilterOptions = {
    categoryId,
    page,
    sort,
  };

  // API 호출
  const response = await getCategoryContents(
    contentType.toLowerCase() as ContentType,
    apiOptions,
  );

  // 응답에서 필요한 데이터 추출
  const items = response?.data?.items || [];
  const pageInfo = response?.data?.pageInfo || {
    currentPage: 0,
    totalPages: 0,
    pageSize: 12,
    totalElements: 0,
  };

  return (
    <div className="flex w-full flex-col items-center pb-20">
      <div className="w-full max-w-[1250px] px-5 pt-5 sm:px-8 lg:px-12">
        {title && <h1 className="mb-6 text-2xl font-bold">{title}</h1>}

        {/* 필터 컴포넌트 */}
        <ProductFilter contentType={contentType} />

        {/* 상품 목록 */}
        {items.length === 0 ? (
          <div className="my-12 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {items.map((item: ProductItemSummary) => (
              <div
                key={item.contentId}
                className="flex justify-center md:justify-start"
              >
                <ProductCard {...item} />
              </div>
            ))}
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
