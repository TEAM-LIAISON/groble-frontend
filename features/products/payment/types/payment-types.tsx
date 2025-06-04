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
