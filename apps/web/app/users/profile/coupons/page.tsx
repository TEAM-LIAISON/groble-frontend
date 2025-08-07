'use client';

import { ProfileMobileHeader } from '@/features/profile';
import { useMyCoupons } from '@/features/profile/hooks/useCoupons';
import CouponCard from '@/features/profile/ui/CouponCard';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import NoContent from '@/shared/ui/NoContent';

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
    <>
      <ProfileMobileHeader back={'/users/profile'} title="쿠폰" />
      <div className="flex flex-col px-5 md:px-0">
        <h3 className="text-title-3 font-bold text-label-normal mb-3 hidden md:block">
          쿠폰
        </h3>

        {hasNoCoupons ? (
          <div className="flex justify-center items-center py-12">
            <NoContent message="아직 쿠폰이 없어요" size="small" />
          </div>
        ) : (
          <>
            {/* 쿠폰 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              {coupons.map((coupon) => (
                <CouponCard key={coupon.couponCode} coupon={coupon} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
