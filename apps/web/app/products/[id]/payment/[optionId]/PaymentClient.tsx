'use client';

import InfoTooltip from '@/components/ui/InfoTooltip';
import { fetchPaymentData } from '@/features/products/payment/api/payment-api';
import PaymentMethodSelector from '@/features/products/payment/components/PaymentMethodSelector';
import PaymentAgreeForm from '@/features/products/payment/components/payment-agree-form';
import PaymentCard from '@/features/products/payment/components/payment-card';
import PaymentCouponSection from '@/features/products/payment/components/payment-coupon-section';
import PaymentPriceInformation from '@/features/products/payment/components/payment-price-Information';
import { useOrderSubmit } from '@/features/products/payment/hooks/useOrderSubmit';
import { usePayplePayment } from '@/features/products/payment/hooks/usePayplePayment';
import { usePaypleSDKLoader } from '@/features/products/payment/hooks/usePaypleSDKLoader';
import type { UserCouponTypes } from '@/features/products/payment/types/payment-types';
import type { PayplePayMethod } from '@/lib/config/payple';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { Button } from '@groble/ui';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PaymentClient() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const optionId = params?.optionId;

  // 선택된 쿠폰 상태 관리
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  // 약관 동의 상태 관리
  const [isAgree, setIsAgree] = useState(false);
  // 간편페이 선택 상태 관리
  const [selectedPayMethod, setSelectedPayMethod] =
    useState<PayplePayMethod | null>(null);

  // 훅들
  const sdkLoader = usePaypleSDKLoader();
  const orderMutation = useOrderSubmit();
  const paymentHook = usePayplePayment();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['paymentData', id, optionId],
    queryFn: () => fetchPaymentData(Number(id), Number(optionId)),
    enabled: !!id && !!optionId,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // 할인 금액 계산 함수
  const calculateDiscountAmount = (): number => {
    if (!selectedCoupon || !data?.data?.userCoupons) return 0;

    const selectedCouponData = data.data.userCoupons.find(
      (coupon: UserCouponTypes) => coupon.couponCode === selectedCoupon
    );

    if (!selectedCouponData) return 0;

    const orderAmount = data?.data?.price || 0;

    // 최소 주문 금액 체크
    if (orderAmount < selectedCouponData.minOrderPrice) return 0;

    if (selectedCouponData.couponType === 'PERCENT') {
      // 퍼센트 할인
      return Math.floor((orderAmount * selectedCouponData.discountValue) / 100);
    }
    // 고정 금액 할인
    return Math.min(selectedCouponData.discountValue, orderAmount);
  };

  // Payple SDK 준비 상태 확인 함수
  const checkPaypleSdkLoaded = () => {
    return (
      typeof window !== 'undefined' &&
      window.PaypleCpayAuthCheck &&
      typeof window.PaypleCpayAuthCheck === 'function'
    );
  };

  // 무료 콘텐츠 결제 처리 - SDK 없이 API만 호출
  const handleFreeContentPayment = () => {
    if (!isAgree) {
      alert('결제 진행 필수 동의를 체크해주세요.');
      return;
    }

    if (!id || !optionId) {
      alert('결제 정보가 올바르지 않습니다.');
      return;
    }

    const orderData = {
      contentId: Number(id),
      options: [
        {
          optionId: Number(optionId),
          optionType: 'COACHING_OPTION',
          quantity: 1,
        },
      ],
      couponCodes: selectedCoupon ? [selectedCoupon] : [],
      orderTermsAgreed: isAgree,
    };

    orderMutation.mutate(orderData, {
      onSuccess: (response) => {
        const orderResp = response.data;
        // 무료 콘텐츠는 바로 결제 완료 페이지로 이동
        router.push(
          `/products/${id}/payment-result?merchantUid=${orderResp.merchantUid}&success=true`
        );
      },
      onError: (error) => {
        console.error('❌ 무료 콘텐츠 주문 생성 오류:', error);
        alert('주문 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      },
    });
  };

  // 유료 콘텐츠 결제 처리 - Payple SDK 사용
  const handlePaidContentPayment = () => {
    // SDK 로딩 체크
    if (!sdkLoader.isReady || !checkPaypleSdkLoaded()) {
      alert('결제 시스템 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (!isAgree) {
      alert('결제 진행 필수 동의를 체크해주세요.');
      return;
    }

    if (!id || !optionId) {
      alert('결제 정보가 올바르지 않습니다.');
      return;
    }

    const orderData = {
      contentId: Number(id),
      options: [
        {
          optionId: Number(optionId),
          optionType: 'COACHING_OPTION',
          quantity: 1,
        },
      ],
      couponCodes: selectedCoupon ? [selectedCoupon] : [],
      orderTermsAgreed: isAgree,
    };

    orderMutation.mutate(orderData, {
      onSuccess: (response) => {
        const orderResp = response.data;

        // 결제 콜백 함수 생성
        const handlePaymentResult = paymentHook.createPaymentCallback(id);

        // 페이플 결제 객체 생성 (간편페이 선택 포함)
        const paypleObj = paymentHook.createPaypleObject(
          {
            merchantUid: orderResp.merchantUid,
            email: orderResp.email,
            phoneNumber: orderResp.phoneNumber,
            totalPrice: orderResp.totalPrice,
            contentTitle: orderResp.contentTitle,
          },
          handlePaymentResult,
          selectedPayMethod // 선택된 간편페이 전달
        );

        // 결제창 호출
        paymentHook.executePayment(paypleObj, checkPaypleSdkLoaded);
      },
      onError: (error) => {
        console.error('❌ 유료 콘텐츠 주문 생성 오류:', error);
        alert('주문 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      },
    });
  };

  // 결제하기 버튼 클릭 핸들러 - 무료/유료에 따라 분기
  const handlePaymentSubmit = () => {
    if (isFreeContent) {
      handleFreeContentPayment();
    } else {
      handlePaidContentPayment();
    }
  };

  const orderAmount = data?.data?.price || 0;
  const discountAmount = calculateDiscountAmount();
  const totalAmount = orderAmount - discountAmount;

  // 무료 콘텐츠 여부 체크 - 가독성을 위해 명확한 이름 사용
  const isFreeContent = totalAmount <= 0;

  // 결제 버튼 비활성화 조건 - 무료 콘텐츠일 때는 SDK 로딩 체크 제외
  const isPaymentDisabled = isFreeContent
    ? orderMutation.isPending || !isAgree
    : orderMutation.isPending || !sdkLoader.isReady || !isAgree;

  // 결제 버튼 텍스트 - 무료/유료에 따라 다른 텍스트 표시
  const getPaymentButtonText = () => {
    if (orderMutation.isPending) return <LoadingSpinner />;

    return '결제하기';
  };

  return (
    <div className="flex w-full flex-col items-center bg-background-alternative pb-10">
      <div className="flex w-full max-w-[1250px] flex-col gap-3 px-5 pt-9 sm:px-8 lg:px-12">
        <h1 className="mb-3 text-heading-1 font-bold text-label-normal">
          결제
        </h1>
        <PaymentCard
          optionName={data?.data?.optionName ?? ''}
          price={data?.data?.price ?? 0}
          sellerName={data?.data?.sellerName ?? ''}
          title={data?.data?.title ?? ''}
          thumbnailUrl={data?.data?.thumbnailUrl ?? ''}
        />

        <PaymentCouponSection
          coupons={data?.data?.userCoupons ?? []}
          selectedCoupon={selectedCoupon}
          onCouponSelect={setSelectedCoupon}
          currentOrderAmount={orderAmount}
        />

        {/* 간편페이 선택 섹션 - 유료 콘텐츠일 때만 표시 */}
        {!isFreeContent && (
          <PaymentMethodSelector
            selectedMethod={selectedPayMethod}
            onMethodSelect={setSelectedPayMethod}
          />
        )}

        <PaymentPriceInformation
          orderAmount={orderAmount}
          discountAmount={discountAmount}
          totalAmount={totalAmount}
        />

        <PaymentAgreeForm isAgree={isAgree} onAgreeChange={setIsAgree} />

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

        {/* SDK 로딩 상태 표시 - 유료 콘텐츠일 때만 표시 */}
        {!isFreeContent && !sdkLoader.isReady && (
          <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-600 border-t-transparent" />
              <div className="flex-1">
                {sdkLoader.isJQueryLoading ? (
                  <p className="text-sm font-medium text-yellow-800">
                    jQuery 라이브러리 로딩 중...
                  </p>
                ) : sdkLoader.isPaypleSDKLoading ? (
                  <p className="text-sm font-medium text-yellow-800">
                    결제 시스템 로딩 중... (간편페이 지원)
                  </p>
                ) : sdkLoader.jQueryError ? (
                  <p className="text-sm font-medium text-red-800">
                    jQuery 로딩 실패: {sdkLoader.jQueryError}
                  </p>
                ) : sdkLoader.paypleSDKError ? (
                  <p className="text-sm font-medium text-red-800">
                    결제 시스템 로딩 실패: {sdkLoader.paypleSDKError}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-yellow-800">
                    결제 시스템 준비 중... (간편페이 지원)
                  </p>
                )}
              </div>
            </div>

            {(sdkLoader.jQueryError || sdkLoader.paypleSDKError) && (
              <div className="mt-3 rounded bg-red-100 p-3">
                <p className="text-sm font-medium text-red-800">
                  결제 시스템 로딩에 실패했습니다
                </p>
                <p className="mt-1 text-xs text-red-600">
                  페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                >
                  페이지 새로고침
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-10 flex w-full justify-center">
          <Button
            className="w-[97%]"
            size="small"
            group="solid"
            type="primary"
            onClick={handlePaymentSubmit}
            disabled={isPaymentDisabled}
          >
            {getPaymentButtonText()}
          </Button>
        </div>
      </div>
    </div>
  );
}
