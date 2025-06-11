export interface ProductPaymentTypes {
  contentType: string;
  optionName: string;
  price: number;
  sellerName: string;
  thumbnailUrl: string;
  title: string;
  userCoupons?: UserCouponTypes[];
}

export interface PaymentResultTypes {
  contentDescription: string;
  contentId: number;
  contentThumbnailUrl: string;
  contentTitle: string;
  discountPrice: number;
  finalPrice: number;
  isFreePurchase: boolean;
  merchantUid: string;
  orderNumber: string;
  orderStatus: string;
  originalPrice: number;
  purchaseStatus: string;
  purchasedAt: string;
  selectedOptionId: number;
  selectedOptionType: string;
}

export interface UserCouponTypes {
  couponCode: string;
  name: string;
  couponType: string;
  discountValue: number;
  validUntil: string;
  minOrderPrice: number;
}

// 결제 요청 관련 타입들 추가
export interface OrderOptionTypes {
  optionId: number;
  optionType: string;
  quantity: number;
}

export interface CreateOrderRequestTypes {
  contentId: number;
  options: OrderOptionTypes[];
  couponCodes: string[];
  orderTermsAgreed: boolean;
}

export interface CreateOrderResponseTypes {
  orderId: string;
  paymentUrl?: string;
  totalAmount: number;
  merchantUid: string; // 페이플 주문번호
  email: string; // 구매자 이메일
  phoneNumber: string; // 구매자 전화번호
  totalPrice: number; // 결제 금액
  contentTitle: string; // 콘텐츠 제목
}
