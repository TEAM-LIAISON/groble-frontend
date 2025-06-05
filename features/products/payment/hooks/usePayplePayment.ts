import { createOid } from "../utils/paymentUtils";

export const usePayplePayment = () => {
  // SPA 콜백 함수 생성
  const createPaymentCallback = (id: string | string[]) => {
    return (params: PaypleCallbackParams) => {
      if (params.PCD_PAY_RESULT === "success") {
        // 결제 성공 시 결과 페이지로 이동
        const searchParams = new URLSearchParams({
          PCD_PAY_RST: params.PCD_PAY_RST || "success",
          PCD_PAY_CODE: params.PCD_PAY_CODE || "",
          PCD_PAY_MSG: params.PCD_PAY_MSG || "",
          PCD_PAY_OID: params.PCD_PAY_OID || "",
          PCD_PAY_TYPE: params.PCD_PAY_TYPE || "",
          PCD_PAY_WORK: params.PCD_PAY_WORK || "",
          PCD_PAYER_NAME: params.PCD_PAYER_NAME || "",
          PCD_PAY_GOODS: params.PCD_PAY_GOODS || "",
          PCD_PAY_TOTAL: params.PCD_PAY_TOTAL?.toString() || "",
          PCD_PAY_TIME: params.PCD_PAY_TIME || "",
        });

        window.location.href = `/products/${id}/payment-result?${searchParams.toString()}`;
      } else {
        alert(`결제 실패: ${params.PCD_PAY_MSG}`);
      }
    };
  };

  // 페이플 결제 객체 생성
  const createPaypleObject = (
    orderData: {
      merchantUid: string;
      email: string;
      phoneNumber: string;
      totalPrice: number;
      contentTitle: string;
    },
    callbackFunction: (params: PaypleCallbackParams) => void,
  ): PaypleOptions => {
    return {
      clientKey: "test_DF55F29DA654A8CBC0F0A9DD4B556486", // 테스트 키
      IS_DIRECT: "N", // 결제창 방식 (N: POPUP, Y: DIRECT/리다이렉트)
      PCD_PAY_TYPE: "card", // 결제수단
      PCD_PAY_WORK: "CERT", // 결제요청방식 (결제요청->결제확인->결제완료)
      PCD_CARD_VER: "02", // 카드결제 방식 (02: 앱카드)
      PCD_PAY_GOODS: orderData.contentTitle, // 결제 상품명
      PCD_PAY_TOTAL: orderData.totalPrice, // 결제 금액
      PCD_PAY_OID: orderData.merchantUid, // 주문번호
      PCD_PAYER_NAME: orderData.contentTitle, // 결제자 이름
      PCD_PAYER_EMAIL: orderData.email, // 결제자 Email
      PCD_PAYER_HP: orderData.phoneNumber, // 결제자 휴대폰 번호
      PCD_RST_URL: "/payment-result", // 상대경로 (레이어팝업용)
      callbackFunction, // SPA 콜백 함수
    };
  };

  // 결제창 호출
  const executePayment = (
    paypleObj: PaypleOptions,
    checkPaypleSdkLoaded: () => boolean,
  ) => {
    if (checkPaypleSdkLoaded()) {
      try {
        window.PaypleCpayAuthCheck(paypleObj);
      } catch (error) {
        alert(
          "결제창 호출 중 오류가 발생했습니다. 페이지를 새로고침 후 다시 시도해주세요.",
        );
      }
    } else {
      alert(
        "페이플 SDK가 제대로 로드되지 않았습니다. 페이지를 새로고침 후 다시 시도해주세요.",
      );
    }
  };

  return {
    createPaymentCallback,
    createPaypleObject,
    executePayment,
  };
};
