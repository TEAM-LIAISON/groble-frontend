// shared/types/PaginationTypes.ts

/**
 * 페이지네이션 요청 파라미터
 */
export interface PaginationParams {
  /** 1-based 페이지 번호 */
  page: number;
  /** 페이지당 항목 수 */
  size: number;
  /** 정렬 기준: "property,direction" 형식 (예: "createdAt,desc") */
  sort?: string;
}

/**
 * 페이징된 응답의 메타 정보
 */
export interface PageInfo {
  /** 0-based 현재 페이지 인덱스 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지당 항목 수 */
  pageSize: number;
  /** 전체 항목 수 */
  totalElements: number;
  /** 첫 페이지 여부 */
  first: boolean;
  /** 마지막 페이지 여부 */
  last: boolean;
  /** 항목이 없는지 여부 */
  empty: boolean;
}

/**
 * 서버 정렬 메타 정보
 */
export interface SortMeta {
  /** 정렬 기준 프로퍼티 이름 */
  sortBy: string;
  /** 정렬 방향 ("ASC" | "DESC") */
  sortDirection: 'ASC' | 'DESC' | string;
}

/**
 * 페이징된 데이터 형태
 */
export interface Paginated<T> {
  /** 실제 데이터 배열 */
  items: T[];
  /** 페이징 정보 */
  pageInfo: PageInfo;
  /** 정렬 메타 */
  meta: SortMeta;
}

/**
 * 공통 API 응답 래퍼
 */
export interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
  timestamp: string;
}
