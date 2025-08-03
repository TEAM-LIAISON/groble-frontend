// 페이플 결제 설정
export const paypleConfig = {
  // 환경별 설정 (NODE_ENV 기반으로 판단)
  environment: process.env.NODE_ENV || 'development',

  // 연동 정보 (서버에서만 사용되는 키들)
  cstId: process.env.PAYPLE_CST_ID,
  custKey: process.env.PAYPLE_CUST_KEY,
  refundKey: process.env.PAYPLE_REFUND_KEY,

  // 클라이언트에서 사용할 키 (Next.js public 환경변수로 노출)
  getClientKey: () => {
    const isProduction = process.env.NODE_ENV === 'production';
    console.log('🔑 Payple Client Key 환경:', {
      NODE_ENV: process.env.NODE_ENV,
      isProduction,
      timestamp: new Date().toISOString(),
    });

    // 프로덕션 환경에서는 실제 키, 개발환경에서는 테스트 키 사용
    if (isProduction) {
      return process.env.NEXT_PUBLIC_PAYPLE_CLIENT_KEY || '';
    }
    return 'test_DF55F29DA654A8CBC0F0A9DD4B556486'; // 테스트 키
  },

  // JavaScript SDK URL
  getSDKUrl: () => {
    const version = '20250613090000'; // 버전 파라미터 (캐시 방지)
    const isProduction = process.env.NODE_ENV === 'production';

    let sdkUrl: string;
    if (isProduction) {
      sdkUrl = `https://cpay.payple.kr/js/v1/payment.js?v=${version}`;
    } else {
      sdkUrl = `https://democpay.payple.kr/js/v1/payment.js?v=${version}`;
    }

    console.log('🌍 Payple SDK URL 환경:', {
      NODE_ENV: process.env.NODE_ENV,
      isProduction,
      sdkUrl,
      timestamp: new Date().toISOString(),
    });

    return sdkUrl;
  },

  // 도메인 검증
  allowedDomains: ['groble.im', 'localhost', '127.0.0.1'],

  // 간편페이 설정
  supportedPayMethods: {
    appCard: 'appCard',
    naverPay: 'naverPay',
    kakaoPay: 'kakaoPay',
  } as const,
} as const;

export type PayplePayMethod =
  (typeof paypleConfig.supportedPayMethods)[keyof typeof paypleConfig.supportedPayMethods];
