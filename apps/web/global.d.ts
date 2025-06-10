export {};

declare global {
  interface Window {
    // jQuery
    $: any;
    jQuery: any;

    // 페이플 인증 체크 함수
    PaypleCpayAuthCheck: (options: PaypleOptions) => void;
  }

  interface PaypleOptions {
    clientKey: string; // 클라이언트 키 (필수)

    // 결제창 방식 설정
    is_direct?: string; // 결제창 방식 (Y: DIRECT/리다이렉트, N: POPUP)
    IS_DIRECT?: string; // 결제창 방식 (대문자 버전)

    // 페이플 공식 파라미터 (공식 문서 기준)
    PCD_PAY_TYPE?: string; // 결제수단 (card, transfer)
    PCD_PAY_WORK?: string; // 결제요청방식 (CERT, PAY, AUTH)
    PCD_CARD_VER?: string; // 카드결제 방식 (01: 정기, 02: 앱카드)
    PCD_PAY_GOODS?: string; // 결제 상품명
    PCD_PAY_TOTAL?: number; // 결제 금액
    PCD_PAY_OID?: string; // 주문번호
    PCD_PAYER_NAME?: string; // 결제자 이름
    PCD_PAYER_EMAIL?: string; // 결제자 Email
    PCD_PAYER_HP?: string; // 결제자 휴대폰 번호
    PCD_RST_URL?: string; // 결제결과 수신 URL

    // SPA용 콜백 함수
    callbackFunction?: (params: PaypleCallbackParams) => void;

    [key: string]: any; // 추가 파라미터 허용
  }

  // 페이플 콜백 파라미터 타입
  interface PaypleCallbackParams {
    PCD_PAY_RST?: string; // 결제 결과 (success/error) - 실제 파라미터명
    PCD_PAY_CODE?: string; // 응답 코드
    PCD_PAY_MSG?: string; // 응답 메시지
    PCD_PAY_OID?: string; // 주문번호
    PCD_PAY_TYPE?: string; // 결제수단
    PCD_PAY_WORK?: string; // 결제요청 방식
    PCD_PAYER_NAME?: string; // 결제자 이름
    PCD_PAY_GOODS?: string; // 상품명
    PCD_PAY_TOTAL?: number; // 결제금액
    PCD_PAY_TIME?: string; // 결제완료 시간
    [key: string]: any;
  }
}
