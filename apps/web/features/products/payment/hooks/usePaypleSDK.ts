import { useState, useEffect, useCallback } from 'react';
import { paypleConfig } from '@/lib/config/payple';

export const usePaypleSDK = () => {
  const [isPaypleSdkLoaded, setIsPaypleSdkLoaded] = useState(false);
  const [isJQueryLoaded, setIsJQueryLoaded] = useState(false);
  const [sdkLoadAttempts, setSdkLoadAttempts] = useState(0);
  const maxAttempts = 3;

  // SDK 로딩 확인 함수
  const checkPaypleSdkLoaded = useCallback(() => {
    return (
      typeof window !== 'undefined' &&
      window.PaypleCpayAuthCheck &&
      typeof window.PaypleCpayAuthCheck === 'function'
    );
  }, []);

  // jQuery 로딩 확인 함수
  const checkJQueryLoaded = useCallback(() => {
    return (
      typeof window !== 'undefined' &&
      window.$ &&
      typeof window.$ === 'function' &&
      window.jQuery &&
      typeof window.jQuery === 'function'
    );
  }, []);

  // SDK 재로드 함수
  const reloadSDK = useCallback(() => {
    if (sdkLoadAttempts < maxAttempts) {
      console.log(
        `🔄 페이플 SDK 재로드 시도: ${sdkLoadAttempts + 1}/${maxAttempts}`
      );
      setSdkLoadAttempts((prev) => prev + 1);

      // 기존 스크립트 제거
      const existingScript = document.getElementById('payple-sdk');
      if (existingScript) {
        existingScript.remove();
      }

      // jQuery가 로드된 경우에만 페이플 SDK 로드
      if (isJQueryLoaded) {
        // 새 스크립트 추가
        const script = document.createElement('script');
        script.id = 'payple-sdk';
        // 환경별 Payple SDK URL 설정 (중앙 관리)
        script.src = paypleConfig.getSDKUrl();
        script.onload = () => {
          console.log('📦 페이플 SDK 스크립트 재로드 완료, 함수 확인 중...');
          setTimeout(() => {
            if (checkPaypleSdkLoaded()) {
              console.log('✅ 페이플 SDK 재로드 성공!');
              setIsPaypleSdkLoaded(true);
            } else {
              console.warn('⚠️ 재로드 후에도 SDK 함수 없음');
              if (sdkLoadAttempts + 1 < maxAttempts) {
                setTimeout(() => reloadSDK(), 2000);
              }
            }
          }, 1500);
        };
        script.onerror = () => {
          console.error('❌ 페이플 SDK 재로드 실패');
          if (sdkLoadAttempts + 1 < maxAttempts) {
            setTimeout(() => reloadSDK(), 3000);
          }
        };
        document.head.appendChild(script);
      }
    } else {
      console.error(`❌ 페이플 SDK 재로드 최대 시도 횟수 초과: ${maxAttempts}`);
    }
  }, [sdkLoadAttempts, maxAttempts, isJQueryLoaded, checkPaypleSdkLoaded]);

  // 초기 로딩 상태 확인
  useEffect(() => {
    // 이미 로드된 상태인지 초기 확인
    if (checkJQueryLoaded()) {
      console.log('🎯 jQuery 이미 로드됨');
      setIsJQueryLoaded(true);
    }

    if (checkPaypleSdkLoaded()) {
      console.log('🎯 페이플 SDK 이미 로드됨');
      setIsPaypleSdkLoaded(true);
    }
  }, [checkJQueryLoaded, checkPaypleSdkLoaded]);

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
