// 판매중/작성중 콘텐츠 관련 타입 정의

export interface ContentPreviewCardResponse {
  /** 콘텐츠 ID */
  contentId: number;
  /** 생성 일시 */
  createdAt: string;
  /** 콘텐츠 제목 */
  title: string;
  /** 썸네일 이미지 URL */
  thumbnailUrl: string;
  /** 판매자 이름 */
  sellerName: string;
  /** 콘텐츠 최저가 가격 (null인 경우 가격미정) */
  lowestPrice: number | null;
  /** 가격 옵션 개수 */
  priceOptionLength: number;
  /** 콘텐츠 상태 */
  status: ContentStatus;
  /** 삭제 가능 여부 */
  isDeletable: boolean;
  /** 판매 가능 여부 */
  isAvailableForSale: boolean;
}

export type ContentStatus = 'ACTIVE' | 'DRAFT' | 'DELETED' | 'DISCONTINUED';

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

export interface SellingContentsResponse {
  /** 콘텐츠 아이템 목록 */
  items: ContentPreviewCardResponse[];
  /** 페이지 정보 */
  pageInfo: PageInfo;
  /** 추가 메타데이터 */
  meta: MetaData;
}

export interface SellingContentsParams {
  /** 페이지 번호 (0부터 시작) */
  page?: number;
  /** 페이지당 항목 수 */
  size?: number;
  /** 정렬 기준 */
  sort?: string;
  /** 콘텐츠 상태 필터 */
  state?: ContentStatus;
}

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  destructive?: boolean;
}
