"use client";

import { InformationIcon } from "@/components/(improvement)/icons/InformationIcon";
import Button from "@/components/button";
import InfoTooltip from "@/components/ui/InfoTooltip";
import { fetchPaymentData } from "@/features/products/payment/api/payment-api";
import PaymentAgreeForm from "@/features/products/payment/components/payment-agree-form";
import PaymentCard from "@/features/products/payment/components/payment-card";
import PaymentCouponSection from "@/features/products/payment/components/payment-coupon-section";
import PaymentPriceInformation from "@/features/products/payment/components/payment-price-Information";
import { UserCouponTypes } from "@/features/products/payment/types/payment-types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductPaymentPage() {
  // ↓ useParams()로 동적 세그먼트(id, optionId) 가져오기
  const params = useParams();
  const id = params?.id;
  const optionId = params?.optionId;

  // 선택된 쿠폰 상태 관리
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentData", id, optionId],
    queryFn: () => fetchPaymentData(Number(id), Number(optionId)),
    enabled: !!id && !!optionId,
    staleTime: 0,
  });

  console.log(data?.data);

  // 할인 금액 계산 함수
  const calculateDiscountAmount = (): number => {
    if (!selectedCoupon || !data?.data?.userCoupons) return 0;

    const selectedCouponData = data.data.userCoupons.find(
      (coupon: UserCouponTypes) => coupon.couponCode === selectedCoupon,
    );

    if (!selectedCouponData) return 0;

    const orderAmount = data?.data?.price || 0;

    // 최소 주문 금액 체크
    if (orderAmount < selectedCouponData.minOrderPrice) return 0;

    if (selectedCouponData.couponType === "PERCENT") {
      // 퍼센트 할인
      return Math.floor((orderAmount * selectedCouponData.discountValue) / 100);
    } else {
      // 고정 금액 할인
      return Math.min(selectedCouponData.discountValue, orderAmount);
    }
  };

  const orderAmount = data?.data?.price || 0;
  const discountAmount = calculateDiscountAmount();
  const totalAmount = orderAmount - discountAmount;

  return (
    <div className="flex w-full flex-col items-center bg-background-alternative pb-10">
      <div className="flex w-full max-w-[1250px] flex-col gap-3 px-5 pt-9 sm:px-8 lg:px-12">
        <h1 className="mb-3 text-heading-1 font-bold text-label-normal">
          결제
        </h1>
        <PaymentCard
          optionName={data?.data?.optionName ?? ""}
          price={data?.data?.price ?? 0}
          sellerName={data?.data?.sellerName ?? ""}
          title={data?.data?.title ?? ""}
          thumbnailUrl={data?.data?.thumbnailUrl ?? ""}
        />

        <PaymentCouponSection
          coupons={data?.data?.userCoupons ?? []}
          selectedCoupon={selectedCoupon}
          onCouponSelect={setSelectedCoupon}
        />

        <PaymentPriceInformation
          orderAmount={orderAmount}
          discountAmount={discountAmount}
          totalAmount={totalAmount}
        />

        <PaymentAgreeForm />

        {/* 세금계산서 발행 안내 */}
        <div className="mt-1 flex items-center gap-2">
          <p className="text-body-2-normal text-label-alternative">
            세금계산서 발행 안내
          </p>
          <InfoTooltip
            text="구매 상품에 대한 세금계산서는 메이커에게 문의해 주세요."
            direction="right"
            width="10.5rem"
          />
        </div>

        <div className="mt-10 flex w-full justify-center">
          <Button className="w-[97%]" size="small" group="solid" type="primary">
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}
