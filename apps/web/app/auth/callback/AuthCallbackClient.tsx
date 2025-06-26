'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { saveRecentLoginProvider } from '@/features/account/sign-in/ui/SocialLoginButtons';
import { SocialProvider } from '@/features/account/sign-in/types/social-types';

interface AuthCallbackClientProps {
  redirectTo: string;
}

function AuthCallbackClientContent({ redirectTo }: AuthCallbackClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 provider 정보 추출
  const provider = searchParams.get('provider') as SocialProvider;

  // provider가 있으면 로컬스토리지에 저장
  if (provider && ['google', 'naver', 'kakao'].includes(provider)) {
    saveRecentLoginProvider(provider);
  }

  // 지정된 경로로 리다이렉트
  router.replace(redirectTo);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p>로그인 처리 중...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackClient({
  redirectTo,
}: AuthCallbackClientProps) {
  return <AuthCallbackClientContent redirectTo={redirectTo} />;
}
