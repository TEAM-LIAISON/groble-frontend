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

// 리뷰 정보 타입
export interface MyReview {
  /** 콘텐츠 리뷰 ID */
  reviewId: number;
  /** 콘텐츠 제목 */
  contentTitle: string;
  /** 리뷰 작성 일시 */
  createdAt: string;
  /** 리뷰 작성자 닉네임 */
  reviewerNickname: string;
  /** 구매한 콘텐츠 옵션 이름 */
  selectedOptionName: string;
  /** 리뷰 별점 */
  rating: number;
  /** 리뷰 내용 */
  reviewContent?: string;
}

// 구매 상세 정보 타입
export interface PurchaseDetailResponse {
  cancelRequestedAt: string | null;
  cancelledAt: string | null;
  cancelReason: string | null;
  contentId: number;
  thumbnailUrl: string;
  contentTitle: string;
  discountPrice: number;
  documentOptionActionUrl: string | null;
  finalPrice: number;
  isFreePurchase: boolean;
  isRefundable: boolean;
  merchantUid: string;
  orderStatus: 'PAID' | 'CANCELLED' | 'REFUND';
  originalPrice: number;
  payCardName: string | null;
  payCardNum: string | null;
  payType: string | null;
  purchasedAt: string;
  selectedOptionName: string | null;
  selectedOptionQuantity: number | null;
  selectedOptionType: string | null;
  sellerName: string;
  /** 내가 작성한 리뷰 정보 */
  myReview?: MyReview;
}

// 구매 상세 컴포넌트 Props (기존 - 호환성 유지)
export interface PurchaseProductCardProps {
  data: PurchaseDetailResponse;
}

// 유연한 구매 상품 카드 Props (새로운 버전)
export interface FlexiblePurchaseProductCardProps {
  // 필수 상품 정보
  contentId: number;
  contentTitle: string;
  sellerName: string;
  thumbnailUrl?: string;
  finalPrice: number;

  // 선택적 옵션 정보
  selectedOptionName?: string;
  selectedOptionQuantity?: number;

  // 주문 정보 표시 여부 및 데이터
  showOrderInfo?: boolean;
  merchantUid?: string;
  purchasedAt?: string;
  cancelledAt?: string;

  // 버튼 영역 표시 여부 및 관련 데이터
  showButtons?: boolean;
  orderStatus?: 'PAID' | 'CANCELLED' | 'REFUND';
  isRefundable?: boolean;
  cancelReason?: string;

  // 리뷰 정보 (편집 모드 판단용)
  myReview?: MyReview;

  // 버튼 콜백 함수들 (선택적)
  onInquiry?: () => void;
  onRefund?: () => void;
  onReview?: () => void;
}

// 문의 수단 정보 타입
export interface InquiryMethod {
  type: 'openChat' | 'instagram' | 'email' | 'etc';
  label: string;
  value: string; // URL 또는 이메일 주소
}

// 문의 수단 응답 타입 (실제 API 응답 구조에 맞게 수정)
export interface InquiryResponse {
  email?: string;
  openChat?: string;
  instagram?: string;
  etc?: string;
  // 다른 문의 수단들도 필요하면 추가
}

// 문의 모달 Props
export interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantUid: string;
}

// 결제 취소 사유 타입
export type CancelReason =
  | 'OTHER_PAYMENT_METHOD'
  | 'CHANGED_MIND'
  | 'FOUND_CHEAPER_CONTENT'
  | 'ETC';

// 결제 취소 요청 타입
export interface PaymentCancelRequest {
  cancelReason: CancelReason;
  detailReason?: string;
}

// 결제 취소 응답 타입
export interface PaymentCancelResponse {
  success: boolean;
  message?: string;
}

// 취소 사유 옵션 타입
export interface CancelReasonOption {
  value: CancelReason;
  label: string;
}
