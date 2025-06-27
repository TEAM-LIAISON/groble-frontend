// 사용자 개별 정보
export interface User {
  createdAt: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  verificationStatus:
    | 'NONE'
    | 'PENDING'
    | 'IN_PROGRESS'
    | 'FAILED'
    | 'VERIFIED'
    | string;
  businessSeller: boolean;
  sellerTermsAgreed: boolean;
  marketingAgreed: boolean;
  sellerInfo: boolean;
}
