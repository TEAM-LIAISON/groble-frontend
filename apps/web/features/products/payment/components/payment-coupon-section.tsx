'use client';

import React, { useState, useEffect } from 'react';
import { UserCouponTypes } from '../types/payment-types';

interface PaymentCouponSectionProps {
  coupons: UserCouponTypes[];
  selectedCoupon: string | null;
  onCouponSelect: (couponCode: string | null) => void;
  currentOrderAmount: number;
}

export default function PaymentCouponSection({
  coupons,
  selectedCoupon,
  onCouponSelect,
  currentOrderAmount,
}: PaymentCouponSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedCouponData = coupons.find(
    (coupon) => coupon.couponCode === selectedCoupon
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}. ${String(date.getDate()).padStart(2, '0')}`;
  };

  const formatDiscount = (coupon: UserCouponTypes) => {
    if (coupon.couponType === 'PERCENT') {
      return `${coupon.discountValue}`;
    } else {
      return `${coupon.discountValue.toLocaleString()}원`;
    }
  };

  const formatMinAmount = (amount: number) => {
    return `${amount.toLocaleString()}원 이상 구매 시`;
  };

  // 쿠폰 사용 가능 여부 체크
  const isCouponUsable = (coupon: UserCouponTypes): boolean => {
    return currentOrderAmount >= coupon.minOrderPrice;
  };

  // 토글 함수 - 사용 가능한 쿠폰만 선택 가능
  const handleCouponToggle = (couponCode: string) => {
    const coupon = coupons.find((c) => c.couponCode === couponCode);
    if (!coupon || !isCouponUsable(coupon)) return;

    if (selectedCoupon === couponCode) {
      onCouponSelect(null);
    } else {
      onCouponSelect(couponCode);
    }
  };

  // 사용 가능한 쿠폰 갯수
  const usableCouponsCount = coupons.filter(isCouponUsable).length;

  // 펼치기/접기 가능 여부 - 쿠폰이 있을 때만 가능
  const canExpandCoupons = usableCouponsCount > 0;

  const handleToggleExpansion = () => {
    if (canExpandCoupons) {
      setIsExpanded(!isExpanded);
    }
  };

  // 쿠폰이 없을 때 펼쳐진 상태 자동으로 접기
  useEffect(() => {
    if (!canExpandCoupons && isExpanded) {
      setIsExpanded(false);
    }
  }, [canExpandCoupons, isExpanded]);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white px-4 py-5">
      {/* 헤더 - 쿠폰이 있을 때만 클릭 가능 */}
      <button
        onClick={handleToggleExpansion}
        disabled={!canExpandCoupons}
        className={`flex w-full items-center justify-between text-left ${
          canExpandCoupons
            ? 'cursor-pointer hover:opacity-80'
            : 'cursor-default opacity-60'
        }`}
      >
        <h2 className="flex gap-1 text-headline-1 font-semibold text-label-normal">
          사용 가능 쿠폰{' '}
          <p className="text-primary-sub-1">{usableCouponsCount}장</p>
        </h2>
        <svg
          className={`h-5 w-5 transition-transform duration-200 ${
            canExpandCoupons && isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 확장된 쿠폰 목록 - 쿠폰이 있고 펼쳐졌을 때만 표시 */}
      {canExpandCoupons && isExpanded && (
        <div className="grid grid-cols-2 gap-2">
          {coupons.map((coupon) => {
            const isUsable = isCouponUsable(coupon);
            const isSelected = selectedCoupon === coupon.couponCode;

            return (
              <div
                key={coupon.couponCode}
                onClick={() => handleCouponToggle(coupon.couponCode)}
                className={`rounded-lg border p-4 transition-colors ${
                  !isUsable
                    ? 'pointer-events-none border-line-normal opacity-50'
                    : isSelected
                    ? 'cursor-pointer border-primary-sub-1 bg-blue-50'
                    : 'cursor-pointer border-line-normal bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <span className="text-body-1-normal font-semibold text-label-normal">
                      {coupon.name}
                    </span>
                    <div className="mt-[0.12rem] flex items-center gap-[0.12rem] text-title-3 font-bold text-label-normal">
                      {formatDiscount(coupon)}
                      <p className="text-body-1-normal text-label-normal">
                        {' '}
                        {coupon.couponType === 'PERCENT' ? '%' : ''}
                      </p>
                    </div>

                    <span className="mt-[0.12rem] text-caption-1 text-label-alternative">
                      {formatDate(coupon.validUntil)} 까지
                    </span>
                    <span className="mt-[0.12rem] text-caption-1 text-label-alternative">
                      {formatMinAmount(coupon.minOrderPrice)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
