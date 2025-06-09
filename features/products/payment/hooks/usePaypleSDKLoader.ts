import { useEffect, useState } from "react";
import { useLoadScript } from "@/hooks/useLoadScript";

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

  // jQuery 로드
  const jQueryScript = useLoadScript({
    src: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
    globalName: "jQuery",
    timeout: 10000,
    onLoad: () => {
      console.log("✅ jQuery 로드 완료, Payple SDK 로드 시작");
      setShouldLoadPayple(true);
    },
    onError: (error) => {
      console.error("❌ jQuery 로드 실패:", error);
    },
  });

  // Payple SDK 로드 (jQuery 로드 완료 후에만)
  const paypleScript = useLoadScript({
    src: "https://democpay.payple.kr/js/v1/payment.js",
    globalName: "PaypleCpayAuthCheck",
    timeout: 15000,
    onLoad: () => {
      console.log("✅ Payple SDK 로드 완료");
    },
    onError: (error) => {
      console.error("❌ Payple SDK 로드 실패:", error);
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
