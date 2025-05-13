"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useUserInfo } from "@/lib/api/auth";
import { useUserStore } from "@/lib/store/useUserStore";
import { GrobleLogo } from "../icons/GrobleLogo";
import NavLink from "./nav-link";
import UserSection from "./user-section";
import MobileHeader from "./mobile-header";

/**
 * 메인 헤더 컴포넌트
 * 데스크탑과 모바일 헤더 UI를 포함
 */
export default function Header() {
  const pathname = usePathname();
  const { data: userFromQuery, isLoading: isQueryLoading } = useUserInfo();
  const queryClient = useQueryClient();

  // Zustand 스토어에서 사용자 상태 가져오기
  const { user, isLoading: isStoreLoading, fetchUser } = useUserStore();

  // 컴포넌트 마운트 시 사용자 정보 로드
  useEffect(() => {
    fetchUser();

    // 로그인 상태면 알림 정보 주기적 갱신 (60초마다)
    let intervalId: NodeJS.Timeout | null = null;

    if (user?.isLogin) {
      intervalId = setInterval(() => {
        fetchUser(); // 알림 개수 등의 최신 정보를 가져옴
      }, 60 * 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchUser, user?.isLogin]);

  // React Query에서 데이터가 변경되면 Zustand 스토어 업데이트
  useEffect(() => {
    if (userFromQuery && !isQueryLoading) {
      useUserStore.getState().setUser(userFromQuery);
    }
  }, [userFromQuery, isQueryLoading]);

  // 로딩 상태 통합
  const isLoading = isStoreLoading && isQueryLoading;

  // 사용자 로그인 상태 확인 (null 체크 추가)
  const isLoggedIn = !!user && user.isLogin === true;

  // 로그인 상태 UI 렌더링
  const renderUserSection = () => {
    // 초기 로딩 중인 경우 (아직 데이터가 없을 때)
    if (isLoading && !user) {
      return (
        <div className="rounded-md h-10 w-24 animate-pulse bg-background-alternative"></div>
      );
    }

    if (!isLoggedIn) {
      return (
        <Link
          href="/auth/sign-in"
          className="rounded-md border border-line-normal px-4 py-2 text-body-2-normal font-medium text-label-normal hover:bg-background-alternative"
        >
          로그인
        </Link>
      );
    }

    // user가 null이 아님이 이미 확인됨
    return <UserSection user={user} />;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line-normal bg-background-normal">
      {/* 데스크탑 헤더 */}
      <div className="hidden h-[66px] items-center justify-between px-5 md:flex">
        <div className="flex items-center">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <GrobleLogo variant="row" width={127} height={40} />
          </Link>

          {/* 네비게이션 메뉴 */}
          <nav className="ml-3 flex items-center">
            <NavLink href="/contents" active={pathname.startsWith("/contents")}>
              자료
            </NavLink>
            <NavLink href="/coaching" active={pathname.startsWith("/coaching")}>
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
        isLoading={isLoading && !user}
        user={user || { isLogin: false }} // 기본값 제공
      />
    </header>
  );
}
