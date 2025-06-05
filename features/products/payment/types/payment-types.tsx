export interface ProductPaymentTypes {
  contentType: string;
  optionName: string;
  price: number;
  sellerName: string;
  thumbnailUrl: string;
  title: string;
  userCoupons?: UserCouponTypes[];
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
}
