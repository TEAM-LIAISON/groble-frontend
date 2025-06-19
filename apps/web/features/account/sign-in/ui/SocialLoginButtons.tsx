import Link from 'next/link';
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

export default function SocialLoginButtons() {
  // 콜백 페이지로 리다이렉트
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const redirectURI = `${baseURL}/auth/callback`;

  return (
    <div className="flex flex-col gap-3">
      {socialProviders.map(({ provider, name, icon: IconComponent }) => {
        const authUrl = `${
          process.env.NEXT_PUBLIC_API_BASE
        }/api/v1/oauth2/authorize?redirect_uri=${encodeURIComponent(
          redirectURI
        )}&provider=${encodeURIComponent(provider)}`;

        return (
          <Link
            key={provider}
            href={authUrl}
            className="px-4 py-3 flex items-center justify-between rounded-md border border-line-normal bg-white hover:brightness-95"
          >
            <IconComponent className="w-5 h-5" />
            <span className="text-label-normal text-body-2-normal">{name}</span>
            <span></span>
          </Link>
        );
      })}
    </div>
  );
}
