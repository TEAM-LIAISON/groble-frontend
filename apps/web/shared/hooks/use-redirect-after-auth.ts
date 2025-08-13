'use client';

import { useRouter } from 'next/navigation';

interface RedirectAfterAuthPayload {
  type?: 'payment' | string;
  contentId?: string | number;
  optionId?: string | number;
  path?: string;
  timestamp?: number;
}

/**
 * 인증 성공 이후, 세션에 저장된 리다이렉트 정보를 바탕으로 이동을 처리하는 훅
 * - sessionStorage key: `redirectAfterAuth`
 * - 지원하는 payload 예시: { type: 'payment', contentId, optionId, timestamp }
 * - 폴백 경로: '/'
 */
export function useRedirectAfterAuth() {
  const router = useRouter();

  const redirectAfterAuth = () => {
    try {
      const raw = sessionStorage.getItem('redirectAfterAuth');
      if (raw) {
        const payload: RedirectAfterAuthPayload = JSON.parse(raw);
        sessionStorage.removeItem('redirectAfterAuth');

        if (payload.type === 'payment' && payload.contentId) {
          router.push(`/products/${payload.contentId}`);
          return;
        }

        if (payload.path) {
          router.push(String(payload.path));
          return;
        }
      }
    } catch (_) {
      // JSON 파싱 에러 등은 무시하고 폴백 처리
    }

    router.push('/');
  };

  return { redirectAfterAuth };
}
