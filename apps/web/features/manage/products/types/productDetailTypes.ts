export interface SellManageDetailResponse {
  /** 해당 콘텐츠에 대한 총 결제 금액 */
  totalPaymentPrice: number;
  /** 해당 콘텐츠에 대한 총 구매자 수 */
  totalPurchaseCustomer: number;
  /** 해당 콘텐츠에 대한 총 리뷰 수 */
  totalReviewCount: number;
}

export interface ContentSellItem {
  /** 구매 ID */
  purchaseId: number;
  /** 콘텐츠 제목 */
  contentTitle: string;
  /** 구매 일시 */
  purchasedAt?: string;
  /** 구매자 닉네임 */
  purchaserNickname: string;
  /** 구매자 이메일 */
  purchaserEmail: string;
  /** 구매자 핸드폰 번호 */
  purchaserPhoneNumber: string;
  /** 구매한 콘텐츠 옵션 이름 */
  selectedOptionName: string;
  /** 콘텐츠 결제 가격 */
  finalPrice: number;
}

export interface ContentReviewItem {
  /** 콘텐츠 리뷰 ID */
  reviewId: number;
  /** 콘텐츠 제목 */
  contentTitle: string;
  /** 리뷰 작성 일시 */
  createdAt?: string;
  /** 리뷰 작성자 닉네임 */
  reviewerNickname: string;
  /** 리뷰 작성 내용 */
  reviewContent: string;
  /** 구매한 콘텐츠 옵션 이름 */
  selectedOptionName: string;
  /** 리뷰 별점 */
  rating: number;
}

export interface ContentManageDetailResponse {
  /** 콘텐츠 제목 */
  title: string;
  /** 판매 관리 부분 응답 */
  contentSellDetail: SellManageDetailResponse;
  /** 판매 리스트 정보 */
  contentSellList: ContentSellItem[];
  /** 리뷰 리스트 정보 */
  contentReviewList: ContentReviewItem[];
}

export interface ContentSellDetailResponse {
  purchaseId: number;
  contentTitle: string;
  purchasedAt?: string;
  purchaserNickname: string;
  purchaserEmail: string;
  purchaserPhoneNumber: string;
  selectedOptionName: string;
  finalPrice: number;
}

export interface PageInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface MetaData {
  searchTerm?: string;
  filter?: string;
  sortBy?: string;
  sortDirection?: string;
  categoryIds?: string[];
}

export interface PageResponseContentSellDetailResponse {
  items: ContentSellDetailResponse[];
  pageInfo: PageInfo;
  meta?: MetaData;
}
