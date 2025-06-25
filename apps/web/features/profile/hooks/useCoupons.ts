import { useQuery } from '@tanstack/react-query';
import { getMyCoupons } from '../api/couponApi';

export const couponKeys = {
  all: ['coupons'] as const,
  myCoupons: () => [...couponKeys.all, 'my-coupons'] as const,
};

/**
 * 내 쿠폰 목록 조회 훅
 */
export const useMyCoupons = () => {
  return useQuery({
    queryKey: couponKeys.myCoupons(),
    queryFn: getMyCoupons,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
