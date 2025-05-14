/**
 * 필터링 가능한 페이지 검색 파라미터 타입
 */
export interface FilterSearchParams {
  categoryId?: string;
  page?: string;
  sort?: string;
  [key: string]: string | string[] | undefined;
}

/**
 * 코칭/상품 페이지 Props 타입
 */
export interface ContentPageProps {
  params?: Record<string, string | string[]>;
  searchParams: FilterSearchParams;
}

/**
 * 페이지네이션 정보 타입
 */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}
