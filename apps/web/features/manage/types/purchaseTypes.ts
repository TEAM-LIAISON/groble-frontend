/** 구매자 전용 콘텐츠 미리보기 카드 응답 DTO */
export interface PurchaserContentPreviewCardResponse {
  /** 주문 고유 ID */
  merchantUid: string;
  /** 콘텐츠 ID */
  contentId: number;
  /** 콘텐츠 유형 */
  contentType: 'COACHING' | 'CONTENT';
  /** 구매 일시 */
  purchasedAt: string;
  /** 콘텐츠 제목 */
  title: string;
  /** 썸네일 이미지 URL */
  thumbnailUrl: string;
  /** 판매자 이름 */
  sellerName: string;
  /** 콘텐츠 원래 가격 (null인 경우 -> 가격미정) */
  originalPrice: number | null;
  /** 콘텐츠 최종 가격 */
  finalPrice: number;
  /** 가격 옵션 개수 */
  priceOptionLength: number;
  /** 콘텐츠 주문 상태 */
  orderStatus: 'PAID' | 'EXPIRED' | 'CANCELLED';
}

/** 페이지 정보 */
export interface PageInfo {
  /** 현재 페이지 번호 (0부터 시작) */
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
  /** 결과가 비어있는지 여부 */
  empty: boolean;
}

/** 추가 메타데이터 */
export interface MetaData {
  /** 검색어 */
  searchTerm?: string;
  /** 적용된 필터 */
  filter?: string;
  /** 정렬 기준 */
  sortBy?: string;
  /** 정렬 방향 */
  sortDirection?: string;
  /** 카테고리 ID 목록 */
  categoryIds?: string[];
}

/** 구매한 콘텐츠 목록 응답 */
export interface PurchasedContentsResponse {
  /** 구매한 콘텐츠 목록 */
  items: PurchaserContentPreviewCardResponse[];
  /** 페이지 정보 */
  pageInfo: PageInfo;
  /** 추가 메타데이터 */
  meta?: MetaData;
}

/** 구매한 콘텐츠 조회 파라미터 */
export interface PurchasedContentsParams {
  /** 페이지 번호 (0부터 시작) */
  page?: number;
  /** 페이지 크기 */
  size?: number;
  /** 정렬 기준 */
  sort?: string;
  /** 구매한 콘텐츠 상태 필터 */
  state?: 'PAID' | 'CANCEL' | '';
}

/** 구매한 콘텐츠 상태 필터 옵션 */
export type PurchaseFilterType = '' | 'PAID' | 'CANCEL';
