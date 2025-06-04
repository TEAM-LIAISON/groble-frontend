"use client";

import React, { useState } from "react";
import { UserCouponTypes } from "../types/payment-types";

export default function PaymentCouponSection({
  coupons,
}: {
  coupons: UserCouponTypes[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  const selectedCouponData = coupons.find(
    (coupon) => coupon.couponCode === selectedCoupon,
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`;
  };

  const formatDiscount = (coupon: UserCouponTypes) => {
    if (coupon.couponType === "PERCENT") {
      return `${coupon.discountValue}`;
    } else {
      return `₩${coupon.discountValue.toLocaleString()}`;
    }
  };

  const formatMinAmount = (amount: number) => {
    return `₩${amount.toLocaleString()} 이상 구매 시`;
  };

  // 토글 함수 - 같은 쿠폰 클릭시 선택 해제, 다른 쿠폰 클릭시 선택
  const handleCouponToggle = (couponId: string) => {
    if (selectedCoupon === couponId) {
      setSelectedCoupon(null); // 같은 쿠폰 클릭시 선택 해제
    } else {
      setSelectedCoupon(couponId); // 다른 쿠폰 클릭시 선택
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white px-4 py-5">
      {/* 헤더 - 클릭 가능 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full cursor-pointer items-center justify-between text-left"
      >
        <h2 className="flex gap-1 text-headline-1 font-semibold text-label-normal">
          사용 가능 쿠폰{" "}
          <p className="text-primary-sub-1">{coupons.length}장</p>
        </h2>
        <svg
          className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
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

      {/* 확장된 쿠폰 목록 */}
      {isExpanded && (
        <div className="grid grid-cols-2 gap-2">
          {coupons.map((coupon) => (
            <div
              key={coupon.couponCode}
              onClick={() => handleCouponToggle(coupon.couponCode)}
              className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                selectedCoupon === coupon.couponCode
                  ? "border-primary-sub-1 bg-blue-50"
                  : "border-line-normal bg-white hover:border-gray-300"
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
                      {" "}
                      {coupon.couponType === "PERCENT" ? "%" : ""}
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
          ))}
        </div>
      )}
    </div>
  );
}
