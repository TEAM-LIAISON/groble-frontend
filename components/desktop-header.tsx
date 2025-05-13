"use client";

import { twMerge } from "@/lib/tailwind-merge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrobleLogo } from "./icons/GrobleLogo";
import { useState, useEffect } from "react";
import { ChevronIcon } from "./icons";
import { CheckIcon } from "./icons/CheckIcon";
import { useUserInfo } from "@/lib/api/auth";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

export default function DesktopHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user, isLoading } = useUserInfo();
  const queryClient = useQueryClient();

  // 모바일 화면에서 메뉴 바깥 영역 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdown = document.getElementById("mobile-dropdown");
      const button = document.getElementById("dropdown-button");

      if (
        dropdown &&
        !dropdown.contains(target) &&
        button &&
        !button.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 페이지 이동 시 드롭다운 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // 현재 경로에 따라 활성화된 탭 결정 (모바일 화면용)
  const activeTab = pathname.startsWith("/contents")
    ? "자료"
    : pathname.startsWith("/coaching")
      ? "코칭"
      : "";

  // /contents나 /coaching 경로에서만 모바일 헤더 표시
  const shouldShowMobileHeader =
    pathname.startsWith("/contents") || pathname.startsWith("/coaching");

  // 로그인 상태 UI 렌더링
  const renderUserSection = () => {
    // 로딩 중인 경우 로딩 표시
    if (isLoading) {
      return (
        <div className="rounded-md h-10 w-24 animate-pulse bg-background-alternative"></div>
      );
    }

    if (!user.isLogin) {
      return (
        <Link
          href="/login"
          className="rounded-md border border-line-normal px-4 py-2 text-body-2-normal font-medium text-label-normal hover:bg-background-alternative"
        >
          로그인
        </Link>
      );
    }

    return (
      <div className="flex items-center gap-4">
        {user.canSwitchToSeller && (
          <button className="rounded-md border border-line-normal px-4 py-2 text-body-2-normal font-medium text-label-normal hover:bg-background-alternative">
            판매자 전환
          </button>
        )}
        <Link
          href="/notifications"
          className="relative flex items-center justify-center rounded-full bg-background-alternative p-2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C8.68629 2 6 4.68629 6 8V12.2986C6 12.7849 5.84956 13.2571 5.57143 13.6429L3.57143 16.3571C3.22798 16.8269 3 17.3944 3 18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18C21 17.3944 20.772 16.8269 20.4286 16.3571L18.4286 13.6429C18.1504 13.2571 18 12.7849 18 12.2986V8C18 4.68629 15.3137 2 12 2Z"
              fill="#171717"
            />
          </svg>
          {user.unreadNotificationCount && user.unreadNotificationCount > 0 && (
            <span className="bg-red-500 absolute top-1 right-1 h-2 w-2 rounded-full"></span>
          )}
        </Link>
        <Link href="/users/me" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            {user.profileImageUrl ? (
              <Image
                src={user.profileImageUrl}
                alt={user.nickname || "프로필"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-background-alternative">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM12 14C7.58172 14 4 17.5817 4 22C4 22.5523 4.44772 23 5 23H19C19.5523 23 20 22.5523 20 22C20 17.5817 16.4183 14 12 14Z"
                    fill="#171717"
                  />
                </svg>
              </div>
            )}
          </div>
          {user.nickname && (
            <span className="hidden text-body-2-normal font-medium md:block">
              {user.nickname}
            </span>
          )}
        </Link>
      </div>
    );
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
            <Link
              href="/contents"
              className={twMerge(
                "relative px-6 py-[21px] text-body-1-normal font-medium text-label-assistive transition-colors",
                pathname.startsWith("/contents") &&
                  "border-black border-b-[1.5px] text-label-normal",
                pathname.startsWith("/contents") &&
                  "after:bg-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full",
              )}
            >
              자료
            </Link>
            <Link
              href="/coaching"
              className={twMerge(
                "relative px-6 py-[21px] text-body-1-normal font-medium text-label-assistive transition-colors",
                pathname.startsWith("/coaching") &&
                  "border-black border-b-[1.5px] text-label-normal",
                pathname.startsWith("/coaching") &&
                  "after:bg-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full",
              )}
            >
              코칭
            </Link>
          </nav>
        </div>

        {/* 오른쪽 메뉴 - 사용자 상태에 따라 변경 */}
        {renderUserSection()}
      </div>

      {/* 모바일 헤더 */}
      {shouldShowMobileHeader && (
        <div className="flex h-[60px] items-center justify-between px-5 md:hidden">
          <div className="relative flex items-center gap-5">
            {/* 로고 */}
            <Link href="/" className="flex items-center">
              <GrobleLogo variant="default" width={24} height={24} />
            </Link>

            {/* 드롭다운 메뉴 버튼 */}
            <div className="">
              <button
                id="dropdown-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 text-headline-1 font-semibold"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                {activeTab}
                <ChevronIcon
                  direction={isMenuOpen ? "up" : "down"}
                  className="transition-transform duration-200"
                />
              </button>

              {/* 드롭다운 메뉴 */}
              {isMenuOpen && (
                <div
                  id="mobile-dropdown"
                  className="absolute top-8 left-0 z-100 w-[6.63rem] rounded-8 border border-line-normal bg-[#fff]"
                  style={{
                    boxShadow:
                      "0px 5px 12px 0px rgba(0, 0, 0, 0.05), 0px 1px 5px 0px rgba(0, 0, 0, 0.05), 0px 0px 2px 0px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="flex flex-col">
                    <Link
                      href="/coaching"
                      className={twMerge(
                        "flex items-center gap-2 px-4 py-2 transition-colors hover:bg-background-alternative",
                        pathname.startsWith("/coaching") && "font-medium",
                      )}
                    >
                      <CheckIcon
                        className={`h-5 w-5 text-label-disable ${pathname.startsWith("/coaching") && "text-label-normal"}`}
                      />
                      코칭
                    </Link>
                    <Link
                      href="/contents"
                      className={twMerge(
                        "flex items-center gap-2 px-4 py-2 transition-colors hover:bg-background-alternative",
                        pathname.startsWith("/contents") && "font-medium",
                      )}
                    >
                      <CheckIcon
                        className={`h-5 w-5 text-label-disable ${pathname.startsWith("/contents") && "text-label-normal"}`}
                      />
                      자료
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 모바일 오른쪽 메뉴 - 사용자 상태에 따라 변경 */}
          {isLoading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-background-alternative"></div>
          ) : user.isLogin ? (
            <div className="flex items-center gap-3">
              <Link
                href="/notifications"
                className="relative flex items-center justify-center rounded-full bg-background-alternative p-2"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C8.68629 2 6 4.68629 6 8V12.2986C6 12.7849 5.84956 13.2571 5.57143 13.6429L3.57143 16.3571C3.22798 16.8269 3 17.3944 3 18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18C21 17.3944 20.772 16.8269 20.4286 16.3571L18.4286 13.6429C18.1504 13.2571 18 12.7849 18 12.2986V8C18 4.68629 15.3137 2 12 2Z"
                    fill="#171717"
                  />
                </svg>
                {user.unreadNotificationCount &&
                  user.unreadNotificationCount > 0 && (
                    <span className="bg-red-500 absolute top-1 right-1 h-2 w-2 rounded-full"></span>
                  )}
              </Link>
              <Link
                href="/users/me"
                className="flex items-center justify-center overflow-hidden rounded-full bg-background-alternative"
                style={{ width: "36px", height: "36px" }}
              >
                {user.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    alt={user.nickname || "프로필"}
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM12 14C7.58172 14 4 17.5817 4 22C4 22.5523 4.44772 23 5 23H19C19.5523 23 20 22.5523 20 22C20 17.5817 16.4183 14 12 14Z"
                      fill="#171717"
                    />
                  </svg>
                )}
              </Link>
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
      )}
    </header>
  );
}
