import { UserCouponResponse } from '../api/couponApi';

interface CouponCardProps {
  coupon: UserCouponResponse;
}

export default function CouponCard({ coupon }: CouponCardProps) {
  // 만료 여부 확인
  const isExpired = () => {
    const [year, month, day, hour, minute, second] = coupon.validUntil;
    const expiryDate = new Date(year, month - 1, day, hour, minute, second);
    return new Date() > expiryDate;
  };

  const expired = isExpired();

  // 할인 표시 렌더링
  const renderDiscountText = () => {
    if (coupon.couponType === 'PERCENTAGE' || coupon.couponType === 'PERCENT') {
      return (
        <>
          <span className="text-title-3 font-bold text-label-normal">
            {coupon.discountValue}
          </span>
          <span className="text-body-1-normal text-label-normal">%</span>
        </>
      );
    } else {
      return (
        <>
          <span className="text-title-3 font-bold text-label-normal">
            {coupon.discountValue.toLocaleString()}
          </span>
          <span className="text-body-1-normal text-label-normal">원</span>
        </>
      );
    }
  };

  // 만료일 포맷팅
  const formatValidUntil = () => {
    const [year, month, day] = coupon.validUntil;
    return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(
      2,
      '0'
    )} 까지`;
  };

  // 최소 주문 금액 포맷팅
  const formatMinOrderPrice = () => {
    if (coupon.minOrderPrice > 0) {
      return `${coupon.minOrderPrice.toLocaleString()}원 이상 구매 시`;
    }
    return '제한 없음';
  };

  return (
    <div
      className={`
        border rounded-lg p-4 transition-all duration-200
        ${
          expired
            ? 'border-gray-200 bg-gray-50 opacity-50'
            : 'border-line-normal bg-background-normal hover:border-primary-normal hover:shadow-sm'
        }
      `}
    >
      <div className="flex flex-col">
        {/* 쿠폰 이름 */}
        <h4
          className={`text-label-1-normal font-semibold ${
            expired ? 'text-label-disabled' : 'text-label-normal'
          }`}
        >
          {coupon.name}
        </h4>

        {/* 할인 값 */}
        <div
          className={` ${
            expired ? 'text-label-disabled' : 'text-label-normal my-[0.13rem]'
          }`}
        >
          {renderDiscountText()}
        </div>

        {/* 만료일 */}
        <div
          className={`text-caption-1-normal  ${
            expired ? 'text-label-disabled' : 'text-label-alternative'
          }`}
        >
          {formatValidUntil()}
        </div>

        {/* 최소 주문 금액 */}
        <div
          className={`text-caption-1-normal ${
            expired ? 'text-label-disabled' : 'text-label-alternative'
          }`}
        >
          {formatMinOrderPrice()}
        </div>

        {/* 만료 상태 */}
        {expired && (
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-xs rounded bg-gray-200 text-gray-500">
              기간 만료
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
