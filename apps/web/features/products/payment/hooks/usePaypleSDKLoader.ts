import { useEffect, useState } from 'react';
import { useLoadScript } from '@/hooks/useLoadScript';
import { paypleConfig } from '@/lib/config/payple';

export interface PaypleSDKLoaderState {
  isJQueryLoaded: boolean;
  isPaypleSDKLoaded: boolean;
  isJQueryLoading: boolean;
  isPaypleSDKLoading: boolean;
  jQueryError: string | null;
  paypleSDKError: string | null;
  isReady: boolean;
}

export const usePaypleSDKLoader = (): PaypleSDKLoaderState => {
  const [shouldLoadPayple, setShouldLoadPayple] = useState(false);

  // SDK URL 미리 가져오기 (로그 확인용)
  const paypleSDKUrl = paypleConfig.getSDKUrl();

  // jQuery 로드
  const jQueryScript = useLoadScript({
    src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
    globalName: 'jQuery',
    timeout: 10000,
    onLoad: () => {
      setShouldLoadPayple(true);
    },
    onError: (error) => {
      console.error('❌ jQuery 로드 실패:', error);
    },
  });

  // Payple SDK 로드 (jQuery 로드 완료 후에만) - 새로운 SDK URL 사용
  const paypleScript = useLoadScript({
    src: paypleSDKUrl,
    globalName: 'PaypleCpayAuthCheck',
    timeout: 15000,
    onLoad: () => {},
    onError: (error) => {
      console.error('❌ Payple SDK 로드 실패:', {
        error,
        sdkUrl: paypleSDKUrl,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      });
    },
  });

  // jQuery가 로드되지 않았으면 로드 시작
  useEffect(() => {
    if (!jQueryScript.isLoaded && !jQueryScript.isLoading) {
      jQueryScript.loadScript();
    }
  }, [jQueryScript.isLoaded, jQueryScript.isLoading, jQueryScript.loadScript]);

  // jQuery 로드 완료 후 Payple SDK 로드
  useEffect(() => {
    if (shouldLoadPayple && !paypleScript.isLoaded && !paypleScript.isLoading) {
      paypleScript.loadScript();
    }
  }, [
    shouldLoadPayple,
    paypleScript.isLoaded,
    paypleScript.isLoading,
    paypleScript.loadScript,
    paypleSDKUrl,
  ]);

  const isReady = jQueryScript.isLoaded && paypleScript.isLoaded;

  return {
    isJQueryLoaded: jQueryScript.isLoaded,
    isPaypleSDKLoaded: paypleScript.isLoaded,
    isJQueryLoading: jQueryScript.isLoading,
    isPaypleSDKLoading: paypleScript.isLoading,
    jQueryError: jQueryScript.error,
    paypleSDKError: paypleScript.error,
    isReady,
  };
};
