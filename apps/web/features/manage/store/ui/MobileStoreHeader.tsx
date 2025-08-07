'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogout } from '@/features/profile/hooks/useLogout';
import {
  MenuIcon,
  HomeIcon,
  WalletIcon,
} from '@/components/(improvement)/icons';
import BackArrowIcon from '@/shared/icons/BackArrowIcon';
import {
  DashboardIcon,
  StoreIcon,
  BoxIcon,
  CustomerIcon,
  SidebarLogoutIcon,
  InformationIcon,
} from '@/features/manage/store/ui/icons';

interface MobileStoreHeaderProps {
  title?: string;
  back?: string; // 'back' 또는 특정 URL
}

/**
 * 마켓 관리용 모바일 헤더 컴포넌트
 */
export default function MobileStoreHeader({
  title = '마켓 관리',
  back,
}: MobileStoreHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logoutMutation = useLogout();

  // 메뉴 항목 선택 상태 확인 함수
  const isActivePath = (path: string) => {
    return pathname === path;
  };

  // 메뉴 항목 스타일 생성 함수
  const getMenuItemStyle = (path: string) => {
    const baseStyle =
      'flex items-center gap-2 rounded-lg px-2 py-3 text-body-2-normal';

    if (isActivePath(path)) {
      return `${baseStyle} text-primary-sub-1 bg-[#EEFFFA]`;
    }

    return `${baseStyle} text-label-alternative hover:bg-background-alternative`;
  };

  // 메뉴가 열릴 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      setShouldRender(true);
      // DOM 렌더링 후 충분한 시간 지연으로 부드러운 애니메이션 보장
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
      // 애니메이션이 완료된 후 렌더링 제거
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 400);
      return () => clearTimeout(timer);
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    closeMenu();
    logoutMutation.mutate();
  };

  const handleBackClick = () => {
    if (back === 'back') {
      router.back();
    } else if (back) {
      router.push(back);
    }
  };

  return (
    <>
      {/* 모바일 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-background-normal/95 backdrop-blur-md md:hidden ">
        <div className="flex h-16 items-center justify-between px-4">
          {/* 왼쪽: 뒤로가기 버튼 또는 메뉴 버튼 */}
          {back ? (
            <button
              onClick={handleBackClick}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-background-alternative"
              aria-label="뒤로 가기"
            >
              <BackArrowIcon className="h-6 w-6 text-label-normal" />
            </button>
          ) : (
            <button
              onClick={toggleMenu}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-background-alternative"
              aria-label="메뉴 열기"
            >
              <MenuIcon className="h-6 w-6 text-label-normal" />
            </button>
          )}

          {/* 가운데: 제목 */}
          <h1 className="text-body-1-normal text-[#1D212C] font-semibold">
            {title}
          </h1>

          {/* 오른쪽: 홈 버튼 */}
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-background-alternative"
            aria-label="홈으로 가기"
          >
            <HomeIcon className="h-6 w-6 text-label-normal" />
          </Link>
        </div>
      </header>
      {/* 모바일 헤더 높이만큼 띄우기 */}
      <div className="h-16 md:hidden"></div>

      {/* 모바일 사이드바 오버레이 - back prop이 없을 때만 렌더링 */}
      {!back && shouldRender && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 z-[110] bg-black/50 md:hidden"
            style={{
              opacity: isAnimating ? 1 : 0,
              transition: 'opacity 400ms ease-out',
            }}
            onClick={closeMenu}
          />

          {/* 사이드바 메뉴 */}
          <div
            style={{
              transform: isAnimating ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform',
            }}
            className="fixed left-0 top-0 z-[120] h-full w-[18.75rem] bg-background-normal md:hidden py-[3rem] px-5"
          >
            <div className="flex h-full flex-col">
              {/* 메뉴 항목들 */}
              <nav className="flex-1 overflow-y-auto ">
                <div className="space-y-3">
                  {/* 대시보드 */}
                  <Link
                    href="/manage/store/dashboard"
                    onClick={closeMenu}
                    className={getMenuItemStyle('/manage/store/dashboard')}
                  >
                    <DashboardIcon
                      className={`w-5 h-5 ${
                        isActivePath('/manage/store/dashboard')
                          ? 'text-primary-sub-1'
                          : 'text-label-alternative'
                      }`}
                    />
                    대시보드
                  </Link>

                  {/* 마켓 관리 */}
                  <Link
                    href="/manage/store/info"
                    onClick={closeMenu}
                    className={getMenuItemStyle('/manage/store/info')}
                  >
                    <StoreIcon
                      className={`w-5 h-5 ${
                        isActivePath('/manage/store/info')
                          ? 'text-primary-sub-1'
                          : 'text-label-alternative'
                      }`}
                    />
                    마켓 관리
                  </Link>

                  {/* 상품 관리 */}
                  <Link
                    href="/manage/store/products"
                    onClick={closeMenu}
                    className={getMenuItemStyle('/manage/store/products')}
                  >
                    <BoxIcon
                      className={`w-5 h-5 ${
                        isActivePath('/manage/store/products')
                          ? 'text-primary-sub-1'
                          : 'text-label-alternative'
                      }`}
                    />
                    상품 관리
                  </Link>

                  {/* 정산 관리 */}
                  <Link
                    href="/manage/store/settlement"
                    onClick={closeMenu}
                    className={getMenuItemStyle('/manage/store/settlement')}
                  >
                    <WalletIcon
                      className={`w-5 h-5 ${
                        isActivePath('/manage/store/settlement')
                          ? 'text-primary-sub-1'
                          : 'text-label-alternative'
                      }`}
                    />
                    정산 관리
                  </Link>

                  {/* 고객 관리 */}
                  <Link
                    href="/manage/store/customers"
                    onClick={closeMenu}
                    className={getMenuItemStyle('/manage/store/customers')}
                  >
                    <CustomerIcon
                      className={`w-5 h-5 ${
                        isActivePath('/manage/store/customers')
                          ? 'text-primary-sub-1'
                          : 'text-label-alternative'
                      }`}
                    />
                    고객 관리
                  </Link>
                </div>

                {/* 구분선 */}
                <div className="my-3 border-t border-line-alternative" />

                {/* 로그아웃 */}
                <div className="">
                  <button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-3 text-body-2-normal text-label-alternative hover:bg-background-alternative disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <SidebarLogoutIcon className="w-5 h-5" />
                    {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
