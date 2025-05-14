import { PaginationInfo } from "./pageTypes";
import { ProductItemSummary } from "./productType";

/**
 * 콘텐츠 API 응답의 메타 정보 타입
 */
export interface ContentMetaInfo {
  categoryId: number;
  categoryName: string;
  sortBy: string;
  sortDirection: string;
}

/**
 * 콘텐츠 목록 API 응답 타입
 */
export interface ContentListResponse {
  items: ProductItemSummary[];
  pageInfo: PaginationInfo;
  meta: ContentMetaInfo;
}

/**
 * 콘텐츠 목록 페이지 상태 타입
 */
export interface ContentListState {
  items: ProductItemSummary[];
  pageInfo: PaginationInfo;
  isLoading: boolean;
  error: string | null;
}
