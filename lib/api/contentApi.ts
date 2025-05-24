import { ApiFilterOptions, ApiResponse } from "../types/apiTypes";
import {
  ContentDetailResponse,
  ContentListResponse,
} from "../types/contentTypes";
import { apiFetch } from "./fetch";

export type ContentType = "COACHING" | "DOCUMENT";

/**
 * 카테고리별 콘텐츠 조회 API
 * @param contentType 콘텐츠 타입 (coaching: 코칭, document: 자료)
 * @param options 필터 옵션
 * @returns API 응답
 */
export async function getCategoryContents(
  contentType: ContentType = "COACHING",
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

  // 콘텐츠 타입에 따른 API 엔드포인트 설정
  const endpoint = `/api/v1/contents/${contentType}/category`;

  // API 요청
  try {
    // No cache
    const response = await apiFetch<ContentListResponse>(
      `${endpoint}?${queryParams.toString()}`,
      {
        cache: "no-cache",
      },
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

/**
 * 콘텐츠 상세 조회 API
 * @param contentId 콘텐츠 ID
 * @returns API 응답
 */
export async function getContentDetail(
  contentId: string,
): Promise<ApiResponse<ContentDetailResponse>> {
  const endpoint = `/api/v1/content/${contentId}`;

  try {
    // No cache
    const response = await apiFetch<ContentDetailResponse>(endpoint, {
      cache: "no-cache",
    });
    return response;
  } catch (error) {
    console.error("콘텐츠 상세 조회 실패:", error);
    return {
      status: "FAIL",
      code: 0,
      message: "콘텐츠 상세 조회 중 오류가 발생했습니다",
      data: {
        contentId: 0,
        status: "",
        thumbnailUrl: "",
        contentType: "COACHING",
        categoryId: 0,
        title: "",
        sellerProfileImageUrl: "",
        sellerName: "",
        lowestPrice: 0,
        options: [],
      } as ContentDetailResponse,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * 자료 파일 업로드 API
 * @param file 업로드할 PDF 또는 ZIP 파일
 * @returns API 응답 (fileUrl 포함)
 */
export async function uploadDocumentFile(file: File) {
  if (!file) {
    throw new Error("파일이 선택되지 않았습니다.");
  }

  // 파일 크기 검증 (10MB 제한)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error("파일 크기는 10MB 이하여야 합니다.");
  }

  const formData = new FormData();
  formData.append("contentDocumentFile", file);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/content/document/upload/file`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error(
        `파일 업로드에 실패했습니다. 상태 코드: ${response.status}`,
      );
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("자료 파일 업로드 중 오류 발생:", error);
    throw error;
  }
}
