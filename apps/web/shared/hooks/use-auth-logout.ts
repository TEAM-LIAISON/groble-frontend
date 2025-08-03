import { useEffect } from 'react';

/**
 * 인증 오류(401/403) 발생 시 콜백 호출 훅
 * @param onLogout 인증 오류 발생 시 호출되는 콜백 (status 전달)
 */
export function useAuthLogout(onLogout: (status: number) => void) {
  useEffect(() => {
    const handler = (event: Event) => {
      const { status } = (event as CustomEvent<{ status: number }>).detail;
      onLogout(status);
    };

    window.addEventListener('auth:logout', handler);
    return () => void window.removeEventListener('auth:logout', handler);
  }, [onLogout]);
}
