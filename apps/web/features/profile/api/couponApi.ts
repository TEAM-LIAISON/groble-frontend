import { fetchClient } from '@/shared/api/api-fetch';

export interface UserCouponResponse {
  couponCode: string;
  name: string;
  couponType: 'PERCENTAGE' | 'PERCENT' | 'FIXED_PRICE';
  discountValue: number;
  validUntil: [number, number, number, number, number, number]; // [year, month, day, hour, minute, second]
  minOrderPrice: number;
}

export interface MyCouponsApiResponse {
  userCouponResponses: UserCouponResponse[];
}

/**
 * 내 쿠폰 목록 조회 API
 */
export const getMyCoupons = async (): Promise<MyCouponsApiResponse> => {
  const response = await fetchClient<MyCouponsApiResponse>(
    '/api/v1/coupon/my-coupons',
    {
      method: 'GET',
    }
  );
  return response.data;
};
