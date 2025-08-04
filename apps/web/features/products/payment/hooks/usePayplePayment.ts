import { fetchClient } from '@/shared/api/api-fetch';
import { showLoadingModal, removeLoadingModal } from '../utils/loadingModal';
import { paypleConfig, PayplePayMethod } from '@/lib/config/payple';

export const usePayplePayment = () => {
  // SPA 콜백 함수 생성
  const createPaymentCallback = (id: string | string[]) => {
    return async (params: PaypleCallbackParams) => {
      // 특히 URL 관련 파라미터들 확인
      const urlParams = Object.keys(params).filter(
        (key) =>
          key.toLowerCase().includes('url') ||
          key.toLowerCase().includes('cofurl') ||
          key.toLowerCase().includes('host')
      );

      // 실제로는 PCD_PAY_RST로 결과가 옵니다
      if (params.PCD_PAY_RST === 'success') {
        try {
          // 로딩 모달 표시
          showLoadingModal();

          // 서버에 페이플 응답 검증 요청
          const verifyResponse = await fetchClient(
            '/api/v1/payments/payple/app-card/request',
            {
              method: 'POST',
              body: JSON.stringify(params), // 페이플에서 받은 응답을 그대로 전송
            }
          );

          // 로딩 모달 제거
          removeLoadingModal();

          if (verifyResponse.status === 'SUCCESS') {
            // 서버 검증 성공 시 결제 완료 페이지로 이동
            const searchParams = new URLSearchParams({
              PCD_PAY_RST: params.PCD_PAY_RST || 'success',
              PCD_PAY_CODE: params.PCD_PAY_CODE || '',
              PCD_PAY_MSG: params.PCD_PAY_MSG || '',
              PCD_PAY_OID: params.PCD_PAY_OID || '',
              PCD_PAY_TYPE: params.PCD_PAY_TYPE || '',
              PCD_PAY_WORK: params.PCD_PAY_WORK || '',
              PCD_PAYER_NAME: params.PCD_PAYER_NAME || '',
              PCD_PAY_GOODS: params.PCD_PAY_GOODS || '',
              PCD_PAY_TOTAL: params.PCD_PAY_TOTAL?.toString() || '',
              PCD_PAY_TIME: params.PCD_PAY_TIME || '',
              // 간편페이 정보도 함께 전달
              PCD_PAY_METHOD: params.PCD_PAY_METHOD || '',
              PCD_EASY_PAY_METHOD: params.PCD_EASY_PAY_METHOD || '',
            });

            window.location.href = `/products/${id}/payment-result?merchantUid=${params.PCD_PAY_OID}&success=true`;
          } else {
            const errorData = verifyResponse.data || {};
            alert(
              `결제 검증에 실패했습니다: ${
                (errorData as any)?.message || '서버 오류가 발생했습니다.'
              }`
            );
          }
        } catch (error) {
          // 로딩 모달 제거 (에러 시)
          removeLoadingModal();

          alert('결제 검증 중 오류가 발생했습니다. 고객센터에 문의해주세요.');
        }
      } else {
        alert(
          `결제 실패: ${
            params.PCD_PAY_MSG || '알 수 없는 오류가 발생했습니다.'
          }`
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
    payMethod?: PayplePayMethod | null // null도 허용하도록 수정
  ): PaypleOptions => {
    // 안전한 처리를 위한 값들
    const safeGoodsName = orderData.contentTitle || '상품';
    const safeBuyerName = orderData.contentTitle || '구매자';
    const safePhoneNumber = (orderData.phoneNumber || '').replace(/-/g, '');
    const safeEmail = orderData.email || '';
    const safeMerchantUid = orderData.merchantUid || '';
    const safeTotalPrice = orderData.totalPrice || 0;

    // 클라이언트 키와 SDK 정보 로그
    const clientKey = paypleConfig.getClientKey();
    const sdkUrl = paypleConfig.getSDKUrl();

    const paypleObject: PaypleOptions = {
      clientKey, // 환경변수에서 가져오기
      IS_DIRECT: 'N', // 결제창 방식 (N: POPUP, Y: DIRECT/리다이렉트)
      PCD_PAY_TYPE: 'card', // 결제수단
      PCD_PAY_WORK: 'CERT', // 결제요청방식 (결제요청->결제확인->결제완료)
      PCD_CARD_VER: '02', // 카드결제 방식 (02: 앱카드)
      PCD_PAY_GOODS: safeGoodsName, // 결제 상품명
      PCD_PAY_TOTAL: safeTotalPrice, // 결제 금액
      PCD_PAY_OID: safeMerchantUid, // 주문번호
      PCD_PAYER_NAME: safeBuyerName, // 결제자 이름
      PCD_PAYER_EMAIL: safeEmail, // 결제자 Email
      PCD_PAYER_HP: safePhoneNumber, // 하이픈 제거
      PCD_RST_URL: '/payment-result',
      callbackFunction, // SPA 콜백 함수
      // 간편페이 파라미터 (선택사항) - null이 아닌 경우에만 설정
      PCD_PAY_METHOD: payMethod || undefined,
    };

    return paypleObject;
  };

  // 결제창 호출
  const executePayment = (
    paypleObj: PaypleOptions,
    checkPaypleSdkLoaded: () => boolean
  ) => {
    if (checkPaypleSdkLoaded()) {
      try {
        window.PaypleCpayAuthCheck(paypleObj);
      } catch (error) {
        alert(
          '결제창 호출 중 오류가 발생했습니다. 페이지를 새로고침 후 다시 시도해주세요.'
        );
      }
    } else {
      alert(
        '페이플 SDK가 제대로 로드되지 않았습니다. 페이지를 새로고침 후 다시 시도해주세요.'
      );
    }
  };

  return {
    createPaymentCallback,
    createPaypleObject,
    executePayment,
  };
};
