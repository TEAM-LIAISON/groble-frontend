import { fetchClient } from "@/shared/api/api-fetch";

export const usePayplePayment = () => {
  // SPA 콜백 함수 생성
  const createPaymentCallback = (id: string | string[]) => {
    return async (params: PaypleCallbackParams) => {
      console.log("🎯 페이플 콜백 파라미터:", params);

      // 실제로는 PCD_PAY_RST로 결과가 옵니다
      if (params.PCD_PAY_RST === "success") {
        console.log("✅ 페이플 결제 성공! 서버 검증 시작...");

        try {
          // 로딩 상태 표시
          const loadingAlert = document.createElement("div");
          loadingAlert.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); 
                        z-index: 10000; text-align: center;">
              <div style="margin-bottom: 10px;">⏳ 결제 완료 처리 중...</div>
              <div style="color: #666; font-size: 14px;">잠시만 기다려 주세요.</div>
            </div>
          `;
          document.body.appendChild(loadingAlert);

          // 서버에 페이플 응답 검증 요청
          const verifyResponse = await fetchClient(
            "/api/v1/payments/payple/app-card/request",
            {
              method: "POST",
              body: JSON.stringify(params), // 페이플에서 받은 응답을 그대로 전송
            },
          );

          // 로딩 제거
          document.body.removeChild(loadingAlert);

          if (verifyResponse.status === "success") {
            console.log("✅ 서버 검증 성공! 결제 완료 페이지로 이동");

            // 서버 검증 성공 시 결제 완료 페이지로 이동
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
            console.error("❌ 서버 검증 실패:", verifyResponse.status);
            const errorData = await verifyResponse.json().catch(() => ({}));
            alert(
              `결제 검증에 실패했습니다: ${errorData.message || "서버 오류가 발생했습니다."}`,
            );
          }
        } catch (error) {
          console.error("❌ 서버 검증 요청 중 오류:", error);

          // 로딩 제거 (에러 시)
          const loadingAlert = document.querySelector(
            'div[style*="position: fixed"]',
          );
          if (loadingAlert) {
            document.body.removeChild(loadingAlert);
          }

          alert("결제 검증 중 오류가 발생했습니다. 고객센터에 문의해주세요.");
        }
      } else {
        console.log("❌ 결제 실패:", params);
        alert(
          `결제 실패: ${params.PCD_PAY_MSG || "알 수 없는 오류가 발생했습니다."}`,
        );
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
    // 안전한 상품명 생성 (한글 문제 방지)
    const safeGoodsName = orderData.contentTitle || "상품";
    const safeBuyerName = orderData.contentTitle || "구매자";

    console.log("🛒 결제 객체 생성:", {
      merchantUid: orderData.merchantUid,
      email: orderData.email,
      phoneNumber: orderData.phoneNumber,
      totalPrice: orderData.totalPrice,
      contentTitle: orderData.contentTitle,
    });

    return {
      clientKey: "test_DF55F29DA654A8CBC0F0A9DD4B556486", // 테스트 키
      IS_DIRECT: "N", // 결제창 방식 (N: POPUP, Y: DIRECT/리다이렉트)
      PCD_PAY_TYPE: "card", // 결제수단
      PCD_PAY_WORK: "CERT", // 결제요청방식 (결제요청->결제확인->결제완료)
      PCD_CARD_VER: "02", // 카드결제 방식 (02: 앱카드)
      PCD_PAY_GOODS: safeGoodsName, // 결제 상품명
      PCD_PAY_TOTAL: orderData.totalPrice, // 결제 금액
      PCD_PAY_OID: orderData.merchantUid, // 주문번호
      PCD_PAYER_NAME: safeBuyerName, // 결제자 이름
      PCD_PAYER_EMAIL: orderData.email, // 결제자 Email
      PCD_PAYER_HP: orderData.phoneNumber.replace(/-/g, ""), // 하이픈 제거
      PCD_RST_URL: "/payment-result",
      callbackFunction, // SPA 콜백 함수
    };
  };

  // 결제창 호출
  const executePayment = (
    paypleObj: PaypleOptions,
    checkPaypleSdkLoaded: () => boolean,
  ) => {
    console.log("🚀 결제창 호출 시작");
    console.log("📋 결제 파라미터:", paypleObj);

    if (checkPaypleSdkLoaded()) {
      try {
        console.log("✅ 페이플 SDK 준비 완료, 결제창 호출");
        window.PaypleCpayAuthCheck(paypleObj);
      } catch (error) {
        console.error("❌ 결제창 호출 중 오류:", error);
        alert(
          "결제창 호출 중 오류가 발생했습니다. 페이지를 새로고침 후 다시 시도해주세요.",
        );
      }
    } else {
      console.error("❌ 페이플 SDK가 로드되지 않음");
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
