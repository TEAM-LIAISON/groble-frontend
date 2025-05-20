"use client";

import { useUserInfo } from "@/lib/api/auth";
import { useAuthError } from "@/lib/api/fetch";
import { useUserStore } from "@/lib/store/useUserStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { GrobleLogo } from "../icons/GrobleLogo";
import MobileHeader from "./mobile-header";
import NavLink from "./nav-link";
import UserSection from "./user-section";

/**
 * 메인 헤더 컴포넌트
 * 데스크탑과 모바일 헤더 UI를 포함
 */
export default function Header() {
  const pathname = usePathname();

  // React Query를 통한 사용자 정보 가져오기
  const { isLoading: isQueryLoading, refetch: refetchUser } = useUserInfo();

  // Zustand 스토어에서 사용자 상태 관리
  const { user, isLoading: isStoreLoading, setUser } = useUserStore();

  // 인증 오류 발생 시 로그아웃 처리
  const { handleAuthError } = useAuthError();

  // 로딩 상태 및 로그인 상태 계산
  const isLoading = isQueryLoading || isStoreLoading;
  const isLoggedIn = !!user && user.isLogin === true;

  // 사용자 정보 갱신 함수
  const refreshUserInfo = useCallback(async () => {
    try {
      // React Query 갱신을 통해 최신 사용자 정보 가져오기
      await refetchUser();
    } catch (error) {
      console.error("사용자 정보 갱신 실패:", error);
    }
  }, [refetchUser]);

  // 인증 오류 처리 설정
  useEffect(() => {
    const cleanup = handleAuthError();
    return cleanup;
  }, [handleAuthError]);

  // 사용자 정보 갱신 및 브라우저 포커스 관리
  useEffect(() => {
    // 초기 로드 시 사용자 정보 가져오기
    refreshUserInfo();

    // 브라우저 포커스 변경 감지 함수
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
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
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 클린업 함수
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
            href="https://groble-maker.oopy.io/"
            className="px-3 py-2 text-body-2-normal text-label-normal hover:text-label-alternative"
          >
            메이커 등록
          </Link>
          <Link
            href="/contents"
            className="px-3 py-2 text-body-2-normal text-label-normal hover:text-label-alternative"
          >
            내 콘텐츠 / 내 스토어
          </Link>
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

  return (
    <header className="sticky top-0 z-50 border-line-normal bg-background-normal md:border-b">
      {/* 데스크탑 헤더 */}
      <div className="hidden h-[66px] items-center justify-between px-5 md:flex">
        <div className="flex items-center">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <GrobleLogo variant="row" width={127} height={40} />
          </Link>

          {/* 네비게이션 메뉴 */}
          <nav className="ml-3 flex items-center">
            <NavLink
              href="/category/contents"
              active={pathname.startsWith("/category/contents")}
            >
              자료
            </NavLink>
            <NavLink
              href="/category/coaching"
              active={pathname.startsWith("/category/coaching")}
            >
              코칭
            </NavLink>
          </nav>
        </div>

        {/* 오른쪽 메뉴 - 사용자 상태에 따라 변경 */}
        {renderUserSection()}
      </div>

      {/* 모바일 헤더 */}
      <MobileHeader
        pathname={pathname}
        isLoading={isLoading && !user?.isLogin}
        user={user || { isLogin: false }}
      />
    </header>
  );
}
