'use client';

import { User } from '@/lib/store/useUserStore';
import { twMerge } from '@/lib/tailwind-merge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import NotificationIcon from './notification-icon';
import ProfileAvatar from './profile-avatar';
import { ChevronIcon, GrobleLogo } from '../../icons';
import { CheckIcon } from '../../icons/CheckIcon';
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

interface MobileDropdownProps {
  isOpen: boolean;
  pathname: string;
}

/**
 * 모바일 화면에서 표시되는 드롭다운 메뉴 컴포넌트
 */
function MobileDropdown({ isOpen, pathname }: MobileDropdownProps) {
  if (!isOpen) return null;

  return (
    <div
      id="mobile-dropdown"
      className="absolute top-8 left-0 z-100 w-[6.63rem] rounded-8 border border-line-normal bg-[#fff]"
      style={{
        boxShadow:
          '0px 5px 12px 0px rgba(0, 0, 0, 0.05), 0px 1px 5px 0px rgba(0, 0, 0, 0.05), 0px 0px 2px 0px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="flex flex-col">
        <Link
          href="/category/coach"
          className={twMerge(
            'flex items-center gap-2 px-4 py-2 transition-colors hover:bg-background-alternative',
            pathname.startsWith('/coaching') && 'font-medium'
          )}
        >
          <CheckIcon
            className={`h-5 w-5 text-label-disable ${
              pathname.startsWith('/category/coach') && 'text-label-normal'
            }`}
          />
          코칭
        </Link>
        <Link
          href="/category/contents"
          className={twMerge(
            'flex items-center gap-2 px-4 py-2 transition-colors hover:bg-background-alternative',
            pathname.startsWith('/store') && 'font-medium'
          )}
        >
          <CheckIcon
            className={`h-5 w-5 text-label-disable ${
              pathname.startsWith('/category/contents') && 'text-label-normal'
            }`}
          />
          자료
        </Link>
      </div>
    </div>
  );
}

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 현재 경로에 따라 활성화된 탭 결정
  const activeTab = pathname.startsWith('/')
    ? '자료'
    : pathname.startsWith('/coaching')
    ? '코칭'
    : '';

  // /contents나 /coaching 경로에서만 모바일 헤더 표시
  const shouldShowMobileHeader =
    pathname.startsWith('/') || pathname.startsWith('/coaching');

  // 모바일 화면에서 메뉴 바깥 영역 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdown = document.getElementById('mobile-dropdown');
      const button = document.getElementById('dropdown-button');

      if (
        dropdown &&
        !dropdown.contains(target) &&
        button &&
        !button.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 페이지 이동 시 드롭다운 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (!shouldShowMobileHeader) return null;

  // mobileTitle 또는 mobileBack이 있는 경우 특별한 헤더 렌더링
  if (mobileTitle || mobileBack) {
    return (
      <div className="flex h-[60px] items-center justify-between px-5 md:hidden">
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
    <div className="flex h-[60px] items-center justify-between px-5 md:hidden">
      <div className="relative flex items-center gap-5 z-50">
        {/* 로고 */}
        <Link
          href="/"
          className={twMerge('flex items-center', isMenuOpen && 'opacity-50')}
        >
          <GrobleLogo variant="default" width={24} height={24} />
        </Link>

        {/* 드롭다운 메뉴 버튼 */}
        <div>
          <button
            id="dropdown-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={twMerge(
              'flex items-center gap-2 text-body-1-normal font-semibold text-[#1D212C]',
              isMenuOpen && 'opacity-50'
            )}
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
          >
            {activeTab}
            <ChevronIcon
              variant="triangle"
              direction={isMenuOpen ? 'up' : 'down'}
              className={twMerge(
                'transition-transform duration-200',
                isMenuOpen && 'rotate-180'
              )}
            />
          </button>

          {/* 드롭다운 메뉴 */}
          <MobileDropdown isOpen={isMenuOpen} pathname={pathname} />
        </div>
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
