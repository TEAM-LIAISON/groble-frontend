'use client';

import { useUserInfo } from '@/lib/api/auth';

import { useUserStore } from '@/lib/store/useUserStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import MobileHeader from './mobile-header';

import UserSection from './user-section';
import { GrobleLogo } from '../../icons';

interface WebHeaderProps {
  mobileTitle?: string;
  mobileBack?: string;
  useFixed?: boolean;
  useStatic?: boolean; // sticky 대신 static으로 설정할지 여부
  bgColor?: string;
  hideMobile?: boolean; // 모바일에서 헤더를 숨길지 여부
}

/**
 * 메인 헤더 컴포넌트
 * 데스크탑과 모바일 헤더 UI를 포함
 * @param hideMobile - true일 경우 모바일에서 헤더를 숨김 (md 이하에서만 적용)
 */
export default function WebHeader({
  mobileTitle,
  mobileBack,
  useFixed = false,
  useStatic = false,
  hideMobile = false,
}: WebHeaderProps = {}) {
  const pathname = usePathname();

  // React Query를 통한 사용자 정보 가져오기
  const { isLoading: isQueryLoading, refetch: refetchUser } = useUserInfo();

  // Zustand 스토어에서 사용자 상태 관리
  const { user, isLoading: isStoreLoading, setUser } = useUserStore();

  // 인증 오류 발생 시 로그아웃 처리
  // const { handleAuthError } = useAuthError();

  // 로딩 상태 및 로그인 상태 계산
  const isLoading = isQueryLoading || isStoreLoading;
  const isLoggedIn = !!user && user.isLogin === true;

  // 사용자 정보 갱신 함수
  const refreshUserInfo = useCallback(async () => {
    try {
      // React Query 갱신을 통해 최신 사용자 정보 가져오기
      await refetchUser();
    } catch (error) {
      console.error('사용자 정보 갱신 실패:', error);
    }
  }, [refetchUser]);

  // 인증 오류 처리 설정
  useEffect(() => {
    // const cleanup = handleAuthError();
    // return cleanup;
  }, []);

  // 사용자 정보 갱신 및 브라우저 포커스 관리
  useEffect(() => {
    // 초기 로드 시 사용자 정보 가져오기
    refreshUserInfo();

    // 브라우저 포커스 변경 감지 함수
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // 페이지가 다시 보일 때 최신 사용자 정보 강제 갱신
        refreshUserInfo();
      }
    };

    // 주기적인 사용자 정보 갱신을 위한 인터벌 설정 (로그인 상태일 때만)
    const intervalId = setInterval(() => {
      if (isLoggedIn) {
        refreshUserInfo();
      }
    }, 60 * 1000);

    // 브라우저 포커스 변경 이벤트 리스너 등록
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 클린업 함수
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshUserInfo, isLoggedIn]);

  // 사용자 섹션 렌더링 함수
  const renderUserSection = () => {
    if (isLoading && !user?.isLogin) {
      // 초기 로딩 중이면서 아직 로그인 상태가 아닐 때
      return (
        <div className="h-10 w-24 animate-pulse rounded-md bg-background-alternative"></div>
      );
    }

    if (!isLoggedIn) {
      return (
        <div className="flex items-center gap-5">
          <Link
            href="/auth/sign-in"
            className="rounded-lg bg-primary-normal px-4 py-2 text-body-2-normal text-label-normal hover:brightness-95"
          >
            로그인
          </Link>
        </div>
      );
    }

    // 로그인된 사용자 UI
    return <UserSection user={user} />;
  };

  // 헤더 위치 스타일 결정
  const getPositionClass = () => {
    if (useFixed) return 'fixed w-full';
    if (useStatic) return 'static';
    return 'sticky';
  };

  return (
    <header
      className={`top-0 z-50 border-line-normal md:bg-white md:border-b bg-transparent ${getPositionClass()}`}
    >
      {/* 데스크탑 헤더 */}
      <div className="hidden h-[66px] items-center justify-between px-5 md:flex">
        <div className="flex items-center">
          {/* 로고 */}
          <Link href="/intro" className="flex items-center gap-2">
            <GrobleLogo variant="row" width={127} height={40} />
          </Link>

          {/* 네비게이션 메뉴 */}
        </div>

        {/* 오른쪽 메뉴 - 사용자 상태에 따라 변경 */}
        {renderUserSection()}
      </div>

      {/* 모바일 헤더 - hideMobile이 true이면 숨김 */}
      {!hideMobile && (
        <MobileHeader
          pathname={pathname}
          isLoading={isLoading && !user?.isLogin}
          user={user || { isLogin: false }}
          mobileTitle={mobileTitle}
          mobileBack={mobileBack}
        />
      )}
    </header>
  );
}
