'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { SocialProvider } from '../types/social-types';
import GoogleIcon from '@/shared/ui/icons/GoogleIcon';
import NaverIcon from '@/shared/ui/icons/NaverIcon';
import KakaoIcon from '@/shared/ui/icons/KakaoIcon';

const socialProviders = [
  {
    provider: 'google' as SocialProvider,
    name: '구글로 시작하기',
    icon: GoogleIcon,
  },
  {
    provider: 'naver' as SocialProvider,
    name: '네이버로 시작하기',
    icon: NaverIcon,
  },
  {
    provider: 'kakao' as SocialProvider,
    name: '카카오로 시작하기',
    icon: KakaoIcon,
  },
];

// 최근 로그인 provider를 로컬스토리지에 저장하는 함수 (로그인 성공 시 호출용)
export const saveRecentLoginProvider = (provider: SocialProvider) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('recentSocialLogin', provider);
  } catch {
    // 로컬스토리지 저장 실패 시 무시
  }
};

export default function SocialLoginButtons() {
  const [recentProvider, setRecentProvider] = useState<SocialProvider | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const mountedRef = useRef(false);

  // 컴포넌트 마운트 후 로컬스토리지 확인
  if (!mountedRef.current && typeof window !== 'undefined') {
    mountedRef.current = true;
    // 다음 이벤트 루프에서 실행
    Promise.resolve().then(() => {
      try {
        const recent = localStorage.getItem(
          'recentSocialLogin'
        ) as SocialProvider | null;
        setRecentProvider(recent);
        setIsLoaded(true);
      } catch {
        // 로컬스토리지 접근 실패 시 무시
        setIsLoaded(true);
      }
    });
  }

  // 콜백 페이지로 리다이렉트
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const redirectURI = `${baseURL}/auth/callback`;

  return (
    <div className="flex flex-col gap-3">
      {socialProviders.map(({ provider, name, icon: IconComponent }) => {
        const authUrl = `${
          process.env.NEXT_PUBLIC_API_BASE
        }/api/v1/oauth2/authorize?redirect_uri=${encodeURIComponent(
          `${redirectURI}?provider=${provider}`
        )}&provider=${encodeURIComponent(provider)}`;

        const isRecentLogin = isLoaded && recentProvider === provider;

        return (
          <Link
            key={provider}
            href={authUrl}
            className="px-4 py-3 flex items-center justify-between rounded-md border border-line-normal bg-white hover:brightness-95 relative"
          >
            <IconComponent className="w-5 h-5" />
            <span className="text-label-normal text-body-2-normal">{name}</span>
            <span></span>

            {isRecentLogin && (
              <Image
                src="/images/recent-login.svg"
                alt="최근 로그인"
                width={93}
                height={24}
                className="absolute top-[-15px] left-[120px]"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
