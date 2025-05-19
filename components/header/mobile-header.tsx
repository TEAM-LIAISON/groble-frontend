"use client";

import { User } from "@/lib/store/useUserStore";
import { twMerge } from "@/lib/tailwind-merge";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronIcon } from "../icons";
import { CheckIcon } from "../icons/CheckIcon";
import { GrobleLogo } from "../icons/GrobleLogo";
import NotificationIcon from "./notification-icon";
import ProfileAvatar from "./profile-avatar";

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
          "0px 5px 12px 0px rgba(0, 0, 0, 0.05), 0px 1px 5px 0px rgba(0, 0, 0, 0.05), 0px 0px 2px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="flex flex-col">
        <Link
          href="/category/coaching"
          className={twMerge(
            "flex items-center gap-2 px-4 py-2 transition-colors hover:bg-background-alternative",
            pathname.startsWith("/coaching") && "font-medium",
          )}
        >
          <CheckIcon
            className={`h-5 w-5 text-label-disable ${pathname.startsWith("/category/coaching") && "text-label-normal"}`}
          />
          코칭
        </Link>
        <Link
          href="/category/contents"
          className={twMerge(
            "flex items-center gap-2 px-4 py-2 transition-colors hover:bg-background-alternative",
            pathname.startsWith("/contents") && "font-medium",
          )}
        >
          <CheckIcon
            className={`h-5 w-5 text-label-disable ${pathname.startsWith("/category/contents") && "text-label-normal"}`}
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
}

/**
 * 모바일 화면용 헤더 컴포넌트
 */
export default function MobileHeader({
  pathname,
  isLoading,
  user,
}: MobileHeaderProps) {
  // user가 undefined/null인 경우 기본값 설정
  const safeUser = user || { isLogin: false };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const segments = useSelectedLayoutSegments();

  // 현재 경로에 따라 활성화된 탭 결정
  const activeTab = pathname.startsWith("/")
    ? "자료"
    : pathname.startsWith("/coaching")
      ? "코칭"
      : "";

  // /contents나 /coaching 경로에서만 모바일 헤더 표시
  const shouldShowMobileHeader =
    pathname.startsWith("/") || pathname.startsWith("/coaching");

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

  if (!shouldShowMobileHeader) return null;

  return (
    (segments.length == 0 || segments[0] == "category") && (
      <div className="flex h-[60px] items-center justify-between px-5 md:hidden">
        <div className="relative flex items-center gap-5">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <GrobleLogo variant="default" width={24} height={24} />
          </Link>

          {/* 드롭다운 메뉴 버튼 */}
          <div>
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
            <MobileDropdown isOpen={isMenuOpen} pathname={pathname} />
          </div>
        </div>

        {/* 모바일 오른쪽 메뉴 - 사용자 상태에 따라 변경 */}
        {isLoading ? (
          <div className="h-8 w-8 animate-pulse rounded-full bg-background-alternative"></div>
        ) : safeUser.isLogin ? (
          <div className="flex items-center gap-3">
            <NotificationIcon count={safeUser.unreadNotificationCount || 0} />
            <Link
              href="/users/me"
              className="flex items-center justify-center overflow-hidden rounded-full"
            >
              <ProfileAvatar user={safeUser} size="sm" />
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
    )
  );
}
