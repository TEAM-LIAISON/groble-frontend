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

export type VerificationStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'FAILED'
  | 'VERIFIED';

export interface MarketInfoResponse {
  /** 프로필 이미지 경로 */
  profileImageUrl: string;
  /** 마켓 이름 */
  marketName: string;
  /** 메이커 인증 상태 */
  verificationStatus: VerificationStatus;
  /** 판매자의 문의처(연락처) 정보 */
  contactInfo?: ContactInfoResponse;
  /** 대표 콘텐츠 */
  representativeContent?: ContentPreviewCardResponse;
  /** 콘텐츠 카드 리스트 */
  contentCardList?: ContentPreviewCardResponse[];
}

export interface ContactInfoRequest {
  /** 인스타그램 URL */
  instagram?: string;
  /** 이메일 주소 */
  email?: string;
  /** 카카오 오픈채팅 URL */
  openChat?: string;
  /** 기타 연락처 */
  etc?: string;
}

export interface MarketInfoUpdateRequest {
  /** 마켓 이름 */
  marketName: string;
  /** 프로필 이미지 URL */
  profileImageUrl?: string;
  /** 마켓 링크 URL */
  marketLinkUrl?: string;
  /** 연락처 정보 */
  contactInfo?: ContactInfoRequest;
  /** 대표 콘텐츠 ID (현재는 배제) */
  representativeContentId?: number;
}
