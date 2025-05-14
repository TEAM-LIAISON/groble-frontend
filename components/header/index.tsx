"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useUserInfo } from "@/lib/api/auth";
import { useUserStore } from "@/lib/store/useUserStore";
import { GrobleLogo } from "../icons/GrobleLogo";
import NavLink from "./nav-link";
import UserSection from "./user-section";
import MobileHeader from "./mobile-header";
import { useAuthError } from "@/lib/api/fetch";

/**
 * 메인 헤더 컴포넌트
 * 데스크탑과 모바일 헤더 UI를 포함
 */
export default function Header() {
  const pathname = usePathname();
  const {
    data: userFromQuery,
    isLoading: isQueryLoading,
    isError: isQueryError,
  } = useUserInfo();

  // Zustand 스토어에서 사용자 상태 가져오기
  const {
    user,
    isLoading: isStoreLoading,
    fetchUser,
    setUser,
  } = useUserStore();

  // 인증 오류 발생 시 로그아웃 처리
  const { handleAuthError } = useAuthError();
  useEffect(() => {
    const cleanup = handleAuthError();
    return cleanup;
  }, [handleAuthError]);

  // 컴포넌트 마운트 시 및 사용자 로그인 상태 변경 시 fetchUser 호출
  useEffect(() => {
    // 초기 마운트 시 또는 user 정보가 없을 때 한 번 fetchUser 실행
    if (!user?.isLogin) {
      fetchUser();
    }

    // 로그인 상태일 때 주기적으로 알림 정보 등 갱신
    const intervalId = setInterval(() => {
      if (user?.isLogin) {
        fetchUser();
      }
    }, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchUser, user?.isLogin]); // user.isLogin 변경 시에도 useEffect 재실행

  // React Query에서 데이터가 성공적으로 로드되면 Zustand 스토어 업데이트
  useEffect(() => {
    if (userFromQuery && !isQueryLoading && !isQueryError) {
      setUser(userFromQuery);
    }
  }, [userFromQuery, isQueryLoading, isQueryError, setUser]);

  // React Query에서 에러 발생 시 Zustand 스토어도 로그아웃 처리 (선택적)
  useEffect(() => {
    if (isQueryError && user?.isLogin) {
      // 실제로는 apiFetch 내부에서 401/403 시 이벤트 발생 후 useAuthError에서 처리
      // 여기서는 명시적으로 스토어 상태를 변경할 수도 있음 (중복 처리 가능성 유의)
      // setUser({ isLogin: false });
      console.log(
        "useUserInfo 에러로 스토어 업데이트 시도 (실제 처리는 useAuthError)",
      );
    }
  }, [isQueryError, user?.isLogin, setUser]);

  // 로딩 상태: React Query 로딩 또는 Zustand 스토어 로딩 중 하나라도 true이면 로딩으로 간주
  const isLoading = isQueryLoading || isStoreLoading;

  // 사용자 로그인 상태 확인: Zustand 스토어의 user 상태를 기준으로 판단
  const isLoggedIn = !!user && user.isLogin === true;

  const renderUserSection = () => {
    if (isLoading && !user?.isLogin) {
      // 초기 로딩 중이면서 아직 로그인 상태가 아닐 때
      return (
        <div className="h-10 w-24 animate-pulse rounded-md bg-background-alternative"></div>
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
    // user가 null이 아니고 isLogin이 true임이 보장됨
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
        isLoading={isLoading && !user?.isLogin}
        user={user || { isLogin: false }}
      />
    </header>
  );
}
