import { ApiFilterOptions, ApiResponse } from "../types/apiTypes";
import { ContentListResponse, ContentMetaInfo } from "../types/contentTypes";
import { PaginationInfo } from "../types/pageTypes";
import { apiFetch } from "./fetch";

/**
 * 카테고리별 콘텐츠 조회 API
 * @param options 필터 옵션
 * @returns API 응답
 */
export async function getCategoryContents(
  options: ApiFilterOptions = {},
): Promise<ApiResponse<ContentListResponse>> {
  const { categoryId, page = 0, size = 24, sort = "createdAt" } = options;

  // URL 쿼리 파라미터 생성
  const queryParams = new URLSearchParams();

  // 카테고리 ID가 있는 경우 추가
  if (categoryId) {
    queryParams.append("categoryId", categoryId);
  }

  // 페이지 정보 추가
  queryParams.append("page", page.toString());
  queryParams.append("size", size.toString());

  // 정렬 조건 추가
  queryParams.append("sort", `${sort},desc`);

  // API 요청
  try {
    const response = await apiFetch<ContentListResponse>(
      `/api/v1/contents/coaching/category?${queryParams.toString()}`,
    );
    return response;
  } catch (error) {
    console.error("콘텐츠 조회 실패:", error);
    return {
      status: "FAIL",
      code: 0,
      message: "콘텐츠 조회 중 오류가 발생했습니다",
      data: {
        items: [],
        pageInfo: {
          currentPage: 0,
          totalPages: 0,
          pageSize: 0,
          totalElements: 0,
        },
        meta: {
          categoryId: 0,
          categoryName: "",
          sortBy: sort,
          sortDirection: "desc",
        },
      },
      timestamp: new Date().toISOString(),
    };
  }
}
