// 주문 개별 정보
export interface Order {
  id?: string;
  merchantUid?: string;
  createdAt: string;
  contentType: 'DOCUMENT' | 'COACHING' | string | null;
  purchaserName: string;
  contentTitle: string | null;
  contentId: string | null;
  finalPrice: number;
  orderStatus:
    | 'PENDING'
    | 'PAID'
    | 'CANCELLED'
    | 'CANCEL_REQUEST'
    | 'EXPIRED'
    | 'FAILED'
    | string;
  sellerId?: string;
  coachingId?: string;
  paymentMethod?: string;
  refundReason?: string;
}
