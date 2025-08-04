import { useState, useEffect, useCallback } from 'react';

export interface UseLoadScriptOptions {
  src: string;
  globalName: string;
  onLoad?: () => void;
  onError?: (error: Event) => void;
  timeout?: number;
}

export interface UseLoadScriptReturn {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  loadScript: () => void;
}

/**
 * 스크립트를 idempotent하게 로드하는 커스텀 훅
 * @param options 스크립트 로딩 옵션
 * @returns 로딩 상태와 제어 함수들
 */
export const useLoadScript = (
  options: UseLoadScriptOptions
): UseLoadScriptReturn => {
  const { src, globalName, onLoad, onError, timeout = 10000 } = options;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 글로벌 객체 확인 함수
  const checkGlobalObject = useCallback(() => {
    return (
      typeof window !== 'undefined' &&
      window[globalName as keyof Window] !== undefined
    );
  }, [globalName]);

  // 이미 로드된 스크립트 확인 함수
  const isScriptAlreadyLoaded = useCallback(() => {
    if (typeof document === 'undefined') return false;

    const existingScript = document.querySelector(`script[src="${src}"]`);
    return existingScript !== null;
  }, [src]);

  // 스크립트 로드 함수
  const loadScript = useCallback(() => {
    // 이미 로드되었거나 로딩 중인 경우 중복 실행 방지
    if (isLoaded || isLoading) {
      return;
    }

    // 글로벌 객체가 이미 존재하는 경우
    if (checkGlobalObject()) {
      setIsLoaded(true);
      onLoad?.();
      return;
    }

    // 스크립트가 이미 DOM에 있는 경우
    if (isScriptAlreadyLoaded()) {
      setIsLoading(true);

      // 주기적으로 글로벌 객체 확인
      const checkInterval = setInterval(() => {
        if (checkGlobalObject()) {
          clearInterval(checkInterval);
          setIsLoading(false);
          setIsLoaded(true);
          onLoad?.();
        }
      }, 100);

      // 타임아웃 처리
      setTimeout(() => {
        if (isLoading) {
          clearInterval(checkInterval);
          setIsLoading(false);
          setError(`${globalName} 로딩 타임아웃`);
          const timeoutEvent = new Event('timeout');
          onError?.(timeoutEvent);
        }
      }, timeout);

      return;
    }

    setIsLoading(true);
    setError(null);

    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    script.onload = () => {
      // 글로벌 객체 확인을 위한 대기
      const checkGlobal = () => {
        if (checkGlobalObject()) {
          setIsLoading(false);
          setIsLoaded(true);
          onLoad?.();
        } else {
          // 짧은 지연 후 재확인
          setTimeout(checkGlobal, 50);
        }
      };

      checkGlobal();
    };

    script.onerror = (event: Event | string) => {
      console.error(`❌ ${globalName} 스크립트 로드 실패:`, event);
      setIsLoading(false);
      setError(`${globalName} 로드 실패`);
      const errorEvent = event instanceof Event ? event : new Event('error');
      onError?.(errorEvent);
    };

    // 타임아웃 설정
    setTimeout(() => {
      if (isLoading && !isLoaded) {
        console.warn(`⏰ ${globalName} 로딩 타임아웃`);
        setIsLoading(false);
        setError(`${globalName} 로딩 타임아웃`);
        const timeoutEvent = new Event('timeout');
        onError?.(timeoutEvent);
      }
    }, timeout);

    document.head.appendChild(script);
  }, [
    src,
    globalName,
    isLoaded,
    isLoading,
    checkGlobalObject,
    isScriptAlreadyLoaded,
    onLoad,
    onError,
    timeout,
  ]);

  // 초기 상태 확인
  useEffect(() => {
    if (checkGlobalObject()) {
      setIsLoaded(true);
    }
  }, [checkGlobalObject]);

  return {
    isLoaded,
    isLoading,
    error,
    loadScript,
  };
};
