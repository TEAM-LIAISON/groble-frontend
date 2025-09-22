import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useOrderSubmit } from "./useOrderSubmit";
import { usePaypleSDKLoader } from "./usePaypleSDKLoader";
import { usePayplePayment } from "./usePayplePayment";
import type { PayplePayMethod } from "@/lib/config/payple";
import { amplitudeEvents } from "@/lib/utils/amplitude";

interface PaymentData {
  data?: {
    contentType: string;
    price?: number;
    userCoupons?: unknown[];
    [key: string]: unknown;
  };
}

interface UsePaymentLogicProps {
  id: string | string[] | undefined;
  optionId: string | string[] | undefined;
  data: PaymentData | undefined;
  selectedCoupon: string | null;
  isAgree: boolean;
  selectedPayMethod: PayplePayMethod | null;
  isLoggedIn: boolean;
  isGuestAuthenticated: boolean;
  guestInfo: { email: string; username: string; phoneNumber: string } | null;
}

export const usePaymentLogic = ({
  id,
  optionId,
  data,
  selectedCoupon,
  isAgree,
  selectedPayMethod,
  isLoggedIn,
  isGuestAuthenticated,
  guestInfo,
}: UsePaymentLogicProps) => {
  const router = useRouter();
  const orderMutation = useOrderSubmit();
  const sdkLoader = usePaypleSDKLoader();
  const paymentHook = usePayplePayment();

  // Payple SDK 준비 상태 확인 함수
  const checkPaypleSdkLoaded = useCallback(() => {
    if (typeof window === "undefined") return false;
    return (
      window.PaypleCpayAuthCheck &&
      typeof window.PaypleCpayAuthCheck === "function"
    );
  }, []);

  // 무료 콘텐츠 결제 처리 - SDK 없이 API만 호출
  const handleFreeContentPayment = useCallback(async () => {
    if (!isAgree) {
      alert("결제 진행 필수 동의를 체크해주세요.");
      return;
    }

    // 비회원인 경우 인증 완료 여부 체크
    if (!isLoggedIn && !isGuestAuthenticated) {
      alert("비회원 인증을 완료해주세요.");
      return;
    }

    if (!id || !optionId) {
      alert("결제 정보가 올바르지 않습니다.");
      return;
    }

    // 무료 결제 시작 이벤트 트래킹
    await amplitudeEvents.trackEvent("Free Payment Started", {
      product_id: id,
      option_id: optionId,
      content_type: data?.data?.contentType,
      price: 0,
      payment_method: "free",
      is_logged_in: isLoggedIn,
      user_type: isLoggedIn
        ? isGuestAuthenticated
          ? "guest"
          : "member"
        : "anonymous",
    });

    const orderData = {
      contentId: Number(id),
      options: [
        {
          optionId: Number(optionId),
          optionType: `${data?.data.contentType}_OPTION`,
          quantity: 1,
        },
      ],
      couponCodes: selectedCoupon ? [selectedCoupon] : [],
      orderTermsAgreed: isAgree,
    };

    orderMutation.mutate(orderData, {
      onSuccess: async (response) => {
        const orderResp = response.data;

        // 무료 결제 완료 이벤트 트래킹
        await amplitudeEvents.purchase(String(id), 0, "KRW", {
          option_id: optionId,
          content_type: data?.data?.contentType,
          payment_method: "free",
          merchant_uid: orderResp.merchantUid,
          success: true,
        });

        // 무료 콘텐츠는 바로 결제 완료 페이지로 이동
        router.push(
          `/products/${id}/payment-result?merchantUid=${orderResp.merchantUid}&success=true`
        );
      },
      onError: async (error) => {
        console.error("❌ 무료 콘텐츠 주문 생성 오류:", error);

        // 무료 결제 실패 이벤트 트래킹
        await amplitudeEvents.trackEvent("Free Payment Failed", {
          product_id: id,
          option_id: optionId,
          content_type: data?.data?.contentType,
          error_message: error.message,
          success: false,
        });

        alert("주문 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      },
    });
  }, [
    id,
    optionId,
    data,
    selectedCoupon,
    isAgree,
    isLoggedIn,
    isGuestAuthenticated,
    orderMutation,
    router,
  ]);

  // 유료 콘텐츠 결제 처리 - Payple SDK 사용
  const handlePaidContentPayment = useCallback(async () => {
    // SDK 로딩 체크
    if (!sdkLoader.isReady || !checkPaypleSdkLoaded()) {
      alert("결제 시스템 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (!isAgree) {
      alert("결제 진행 필수 동의를 체크해주세요.");
      return;
    }

    // 비회원인 경우 인증 완료 여부 체크
    if (!isLoggedIn && !isGuestAuthenticated) {
      alert("비회원 인증을 완료해주세요.");
      return;
    }

    if (!id || !optionId) {
      alert("결제 정보가 올바르지 않습니다.");
      return;
    }

    // 유료 결제 시작 이벤트 트래킹
    await amplitudeEvents.trackEvent("Paid Payment Started", {
      product_id: id,
      option_id: optionId,
      content_type: data?.data?.contentType,
      price: data?.data?.price,
      payment_method: selectedPayMethod || "unknown",
      is_logged_in: isLoggedIn,
      user_type: isLoggedIn
        ? isGuestAuthenticated
          ? "guest"
          : "member"
        : "anonymous",
      has_coupon: !!selectedCoupon,
    });

    const orderData = {
      contentId: Number(id),
      options: [
        {
          optionId: Number(optionId),
          optionType: `${data?.data.contentType}_OPTION`,
          quantity: 1,
        },
      ],
      couponCodes: selectedCoupon ? [selectedCoupon] : [],
      orderTermsAgreed: isAgree,
    };

    orderMutation.mutate(orderData, {
      onSuccess: async (response) => {
        const orderResp = response.data;

        // 유료 결제 진행 이벤트 트래킹 (SDK 호출 전)
        await amplitudeEvents.trackEvent("Paid Payment Processing", {
          product_id: id,
          option_id: optionId,
          content_type: data?.data?.contentType,
          price: data?.data?.price,
          payment_method: selectedPayMethod || "unknown",
          merchant_uid: orderResp.merchantUid,
        });

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
      onError: async (error) => {
        console.error("❌ 유료 콘텐츠 주문 생성 오류:", error);

        // 유료 결제 실패 이벤트 트래킹
        await amplitudeEvents.trackEvent("Paid Payment Failed", {
          product_id: id,
          option_id: optionId,
          content_type: data?.data?.contentType,
          price: data?.data?.price,
          payment_method: selectedPayMethod || "unknown",
          error_message: error.message,
          success: false,
        });

        alert("주문 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      },
    });
  }, [
    id,
    optionId,
    data,
    selectedCoupon,
    isAgree,
    selectedPayMethod,
    isLoggedIn,
    isGuestAuthenticated,
    sdkLoader,
    checkPaypleSdkLoaded,
    orderMutation,
    paymentHook,
  ]);

  return {
    handleFreeContentPayment,
    handlePaidContentPayment,
    checkPaypleSdkLoaded,
  };
};
