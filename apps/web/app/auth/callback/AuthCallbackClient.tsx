'use client';

import { useSearchParams } from 'next/navigation';
import { saveRecentLoginProvider } from '@/features/account/sign-in/ui/SocialLoginButtons';
import { SocialProvider } from '@/features/account/sign-in/types/social-types';
import { useRedirectAfterAuth } from '@/shared/hooks/use-redirect-after-auth';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { Suspense, useEffect } from 'react';

interface AuthCallbackClientProps {
  redirectTo: string;
}

function AuthCallbackClientContent({ redirectTo }: AuthCallbackClientProps) {
  const searchParams = useSearchParams();
  const { redirectAfterAuth } = useRedirectAfterAuth();

  useEffect(() => {
    const provider = searchParams.get('provider') as SocialProvider | null;

    if (provider && ['google', 'naver', 'kakao'].includes(provider)) {
      saveRecentLoginProvider(provider);
    }

    // 이메일 로그인과 동일한 리다이렉트 규칙 적용
    // 세션에 redirectAfterAuth가 있으면 우선 사용, 없으면 서버에서 받은 기본 redirectTo로 이동
    const raw = sessionStorage.getItem('redirectAfterAuth');
    if (raw) {
      redirectAfterAuth();
    } else if (redirectTo) {
      // 기본 폴백 경로
      window.location.replace(redirectTo);
    } else {
      window.location.replace('/');
    }
  }, [redirectAfterAuth, redirectTo, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoadingSpinner />
      </div>
    </div>
  );
}

export default function AuthCallbackClient({
  redirectTo,
}: AuthCallbackClientProps) {
  return (
    <Suspense fallback={<LoadingSpinner color="text-gray-500" />}>
      <AuthCallbackClientContent redirectTo={redirectTo} />
    </Suspense>
  );
}
