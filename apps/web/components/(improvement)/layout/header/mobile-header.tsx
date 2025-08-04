'use client';

import { User } from '@/lib/store/useUserStore';
import { twMerge } from '@/lib/tailwind-merge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import NotificationIcon from './notification-icon';
import ProfileAvatar from './profile-avatar';

// 뒤로가기 화살표 아이콘 컴포넌트
const BackArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface MobileHeaderProps {
  pathname: string;
  isLoading: boolean;
  user: User | null;
  mobileTitle?: string;
  mobileBack?: string;
}

/**
 * 모바일 화면용 헤더 컴포넌트
 */
export default function MobileHeader({
  pathname,
  isLoading,
  user,
  mobileTitle,
  mobileBack,
}: MobileHeaderProps) {
  // user가 undefined/null인 경우 기본값 설정
  const safeUser = user || { isLogin: false };
  const router = useRouter();

  // mobileTitle 또는 mobileBack이 있는 경우 특별한 헤더 렌더링
  if (mobileTitle || mobileBack) {
    return (
      <div className="flex h-[60px] items-center justify-between px-5 md:hidden ">
        {/* 왼쪽 영역 */}
        <div className="flex items-center gap-3">
          {mobileBack && (
            <>
              {mobileBack === 'back' ? (
                <button
                  onClick={() => router.back()}
                  className="flex items-center"
                >
                  <BackArrowIcon />
                </button>
              ) : (
                <Link href={mobileBack} className="flex items-center">
                  <BackArrowIcon />
                </Link>
              )}
            </>
          )}
          {mobileTitle && !mobileBack && (
            <h1 className="text-headline-1 font-bold text-[#1D212C]">
              {mobileTitle}
            </h1>
          )}
        </div>

        {/* 가운데 영역 */}
        {mobileTitle && mobileBack && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-body-1-normal font-semibold text-[#1D212C]">
              {mobileTitle}
            </h1>
          </div>
        )}

        {/* 오른쪽 영역 - 빈 div로 레이아웃 유지 */}
        <div></div>
      </div>
    );
  }

  return (
    <div className="flex h-[60px] items-center justify-between px-5 md:hidden bg-white">
      <div className="relative flex items-center gap-5 z-50">
        {/* 로고 */}
        <Link href="/" className="flex items-center ">
          <Image
            src="/assets/logos/groble-row.svg"
            alt="Groble Logo"
            width={110}
            height={24}
            className=" w-auto"
          />
        </Link>
      </div>

      {/* 모바일 오른쪽 메뉴 - 사용자 상태에 따라 변경 */}
      {isLoading ? (
        <div className="h-8 w-8 animate-pulse rounded-full bg-background-alternative"></div>
      ) : safeUser.isLogin ? (
        <div className="flex items-center gap-3">
          <NotificationIcon count={safeUser.unreadNotificationCount || 0} />
          {/* <Link
            href="/users/me"
            className="flex items-center justify-center overflow-hidden rounded-full"
          >
            <ProfileAvatar user={safeUser} size="sm" />
          </Link> */}
        </div>
      ) : (
        <Link
          href="/auth/sign-in"
          className="rounded-md border border-line-normal px-3 py-1.5 text-body-2-normal font-medium text-label-normal"
        >
          로그인
        </Link>
      )}
    </div>
  );
}
