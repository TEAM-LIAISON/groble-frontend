// File: src/features/category/api/category-content-api.ts
import {
  ProductContentType,
  ProductListResponse,
} from "@/entities/product/model";
import { fetchClient } from "@/shared/api/api-fetch";
import { ApiFilterOptions, ApiResponse } from "@/shared/types/api-types";

const CATEGORY_API_BASE = "/api/v1/contents";

/**
 * 카테고리별 콘텐츠 목록 조회
 * @param contentType 콘텐츠 타입 ("COACHING" | "DOCUMENT")
 * @param options 필터 옵션 (categoryId, page, size, sort)
 * @returns ApiResponse<ContentListResponse>
 */
export async function fetchCategoryContents(
  contentType: ProductContentType,
  {
    categoryId,
    page = 0,
    size = 24,
    sort = "createdAt",
  }: ApiFilterOptions = {},
): Promise<ApiResponse<ProductListResponse>> {
  // 1) URLSearchParams 객체 초기화
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort: `${sort},desc`,
  });
  if (categoryId) {
    params.append("categoryId", categoryId);
  }

  // 2) 최종 요청 URL 조합
  // 여기서는 소문자로 들어가야함(coaching, document)
  const contentTypeLowerCase = contentType.toLowerCase();
  const url = `${CATEGORY_API_BASE}/${contentTypeLowerCase}/category?${params}`;

  // 3) apiFetch 호출 (에러는 상위로 throw)
  return fetchClient<ProductListResponse>(url, {
    cache: "no-cache",
  });
}
