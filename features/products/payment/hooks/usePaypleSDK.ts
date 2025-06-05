import { useState, useEffect } from "react";

export const usePaypleSDK = () => {
  const [isPaypleSdkLoaded, setIsPaypleSdkLoaded] = useState(false);
  const [isJQueryLoaded, setIsJQueryLoaded] = useState(false);
  const [sdkLoadAttempts, setSdkLoadAttempts] = useState(0);
  const maxAttempts = 3;

  // SDK 로딩 확인 함수
  const checkPaypleSdkLoaded = () => {
    return (
      typeof window !== "undefined" &&
      window.PaypleCpayAuthCheck &&
      typeof window.PaypleCpayAuthCheck === "function"
    );
  };

  // jQuery 로딩 확인 함수
  const checkJQueryLoaded = () => {
    return (
      typeof window !== "undefined" &&
      window.$ &&
      typeof window.$ === "function" &&
      window.jQuery &&
      typeof window.jQuery === "function"
    );
  };

  // SDK 재로드 함수
  const reloadSDK = () => {
    if (sdkLoadAttempts < maxAttempts) {
      setSdkLoadAttempts((prev) => prev + 1);

      // 기존 스크립트 제거
      const existingScript = document.getElementById("payple-sdk");
      if (existingScript) {
        existingScript.remove();
      }

      // jQuery가 로드된 경우에만 페이플 SDK 로드
      if (isJQueryLoaded) {
        // 새 스크립트 추가
        const script = document.createElement("script");
        script.id = "payple-sdk";
        script.src = "https://democpay.payple.kr/js/v1/payment.js";
        script.onload = () => {
          setTimeout(() => {
            if (checkPaypleSdkLoaded()) {
              setIsPaypleSdkLoaded(true);
            } else {
              setTimeout(() => reloadSDK(), 1000);
            }
          }, 1000);
        };
        script.onerror = () => {
          setTimeout(() => reloadSDK(), 2000); // 2초 후 재시도
        };
        document.head.appendChild(script);
      }
    }
  };

  // 컴포넌트 마운트 시 SDK 상태 확인
  useEffect(() => {
    // jQuery 로딩 체크
    const checkJQuery = () => {
      if (checkJQueryLoaded()) {
        setIsJQueryLoaded(true);
        return true;
      }
      return false;
    };

    // 페이플 SDK 로딩 체크
    const checkSDK = () => {
      if (checkPaypleSdkLoaded()) {
        setIsPaypleSdkLoaded(true);
        return true;
      }
      return false;
    };

    let checkCount = 0;
    const maxChecks = 200; // 20초간 체크 (100ms * 200)

    const checkInterval = setInterval(() => {
      checkCount++;

      // jQuery 먼저 체크
      if (!isJQueryLoaded && checkJQuery()) {
        // jQuery 로드 완료 후 잠시 대기 후 페이플 SDK 체크 시작
        setTimeout(() => {
          if (!checkSDK()) {
            reloadSDK();
          }
        }, 500);
      }

      // 페이플 SDK 체크
      if (isJQueryLoaded && checkSDK()) {
        clearInterval(checkInterval);
      } else if (checkCount >= maxChecks) {
        clearInterval(checkInterval);
        if (isJQueryLoaded && !isPaypleSdkLoaded) {
          reloadSDK();
        }
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
    };
  }, [isJQueryLoaded, sdkLoadAttempts]);

  return {
    isPaypleSdkLoaded,
    isJQueryLoaded,
    sdkLoadAttempts,
    maxAttempts,
    checkPaypleSdkLoaded,
    checkJQueryLoaded,
    reloadSDK,
    setIsJQueryLoaded,
    setIsPaypleSdkLoaded,
  };
};
