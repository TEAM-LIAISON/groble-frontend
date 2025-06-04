"use client";
import { fetchPaymentData } from "@/features/products/payment/api/payment-api";
import PaymentCard from "@/features/products/payment/components/payment-card";
import PaymentCouponSection from "@/features/products/payment/components/payment-coupon-section";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function ProductPaymentPage() {
  // ↓ useParams()로 동적 세그먼트(id, optionId) 가져오기
  const params = useParams();
  const id = params?.id;
  const optionId = params?.optionId;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentData", id, optionId],
    queryFn: () => fetchPaymentData(Number(id), Number(optionId)),
    enabled: !!id && !!optionId,
    staleTime: 0,
  });
  console.log(data?.data);

  return (
    <div className="flex w-full flex-col items-center bg-background-alternative">
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

        <PaymentCouponSection coupons={data?.data?.userCoupons ?? []} />
      </div>
    </div>
  );
}
