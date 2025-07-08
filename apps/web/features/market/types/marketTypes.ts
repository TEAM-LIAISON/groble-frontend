/** 연락처 정보 */
export interface ContactInfoResponse {
  /** 인스타그램 URL */
  instagram?: string;
  /** 이메일 주소 */
  email?: string;
  /** 카카오 오픈채팅 URL */
  openChat?: string;
  /** 기타 연락처 */
  etc?: string;
}

/** 콘텐츠 미리보기 카드 */
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
  /** 콘텐츠 최저가 가격 (null인 경우 -> 가격미정) */
  lowestPrice: number | null;
  /** 가격 옵션 개수 */
  priceOptionLength: number;
  /** 콘텐츠 상태 */
  status: 'ACTIVE' | 'DRAFT' | 'PENDING' | 'VALIDATED' | 'REJECTED';
}

/** 마켓 소개 데이터 */
export interface MarketIntroData {
  /** 프로필 이미지 경로 */
  profileImageUrl: string;
  /** 마켓 이름 */
  marketName: string;
  /** 마켓 링크 URL */
  marketLinkUrl: string;
  /** 메이커 인증 상태 */
  verificationStatus: 'PENDING' | 'IN_PROGRESS' | 'FAILED' | 'VERIFIED';
  /** 연락처 정보 */
  contactInfo?: ContactInfoResponse;
  /** 대표 콘텐츠 */
  representativeContent?: ContentPreviewCardResponse;
}

/** 마켓 소개 페이지 API 응답 */
export interface MarketIntroResponse {
  /** 응답 데이터 */
  data: MarketIntroData;
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

/** 메타데이터 */
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

/** 마켓 콘텐츠 목록 데이터 */
export interface MarketContentsData {
  /** 콘텐츠 목록 */
  items: ContentPreviewCardResponse[];
  /** 페이지 정보 */
  pageInfo: PageInfo;
  /** 추가 메타데이터 */
  meta?: MetaData;
}

/** 마켓 콘텐츠 목록 API 응답 */
export interface MarketContentsResponse {
  /** 응답 데이터 */
  data: MarketContentsData;
}

/** 마켓 콘텐츠 조회 파라미터 */
export interface MarketContentsParams {
  /** 마켓 링크 URL */
  marketLinkUrl: string;
  /** 페이지 번호 (0부터 시작) */
  page?: number;
  /** 페이지 크기 */
  size?: number;
  /** 정렬 기준 */
  sort?: 'createdAt' | 'title' | 'price';
}
