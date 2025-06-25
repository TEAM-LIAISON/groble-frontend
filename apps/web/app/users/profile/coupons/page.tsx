'use client';

import { useMyCoupons } from '@/features/profile/hooks/useCoupons';
import CouponCard from '@/features/profile/ui/CouponCard';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

export default function CouponsPage() {
  const { data: couponsData, isLoading, error } = useMyCoupons();

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <h3 className="text-title-3 font-bold text-label-normal mb-6">쿠폰</h3>
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <h3 className="text-title-3 font-bold text-label-normal mb-6">쿠폰</h3>
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">쿠폰을 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  const coupons = couponsData?.userCouponResponses || [];
  const hasNoCoupons = coupons.length === 0;

  return (
    <div className="flex flex-col">
      <h3 className="text-title-3 font-bold text-label-normal mb-3">
        쿠폰({couponsData?.userCouponResponses.length})
      </h3>

      {hasNoCoupons ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <p className="text-gray-500 mb-2">보유하신 쿠폰이 없습니다.</p>
            <p className="text-sm text-gray-400">
              이벤트나 구매를 통해 쿠폰을 받아보세요!
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* 쿠폰 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coupons.map((coupon) => (
              <CouponCard key={coupon.couponCode} coupon={coupon} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
