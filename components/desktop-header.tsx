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

// 프로필 아바타 컴포넌트
function ProfileAvatar({
  user,
  size = "md",
}: {
  user: any;
  size?: "sm" | "md";
}) {
  const sizeStyles = {
    sm: { width: "36px", height: "36px", fontSize: "14px" },
    md: { width: "32px", height: "32px", fontSize: "16px" },
  };

  const style = sizeStyles[size];

  // 이미지가 있으면 이미지 표시, 없으면 닉네임의 첫 글자로 아바타 생성
  if (user.profileImageUrl) {
    return (
      <div className="relative overflow-hidden rounded-full" style={style}>
        <Image
          src={user.profileImageUrl}
          alt={user.nickname || "프로필"}
          width={parseInt(style.width)}
          height={parseInt(style.height)}
          className="object-cover"
        />
      </div>
    );
  }

  // 닉네임이 있으면 첫 글자 추출, 없으면 기본 아이콘 사용
  const initial = user.nickname ? user.nickname.charAt(0).toUpperCase() : "";

  if (initial) {
    // 랜덤한 배경색 생성 (닉네임에 따라 결정적으로 생성)
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-yellow-500",
      "bg-indigo-500",
    ];
    const colorIndex = user.nickname.charCodeAt(0) % colors.length;

    return (
      <div
        className={`text-white flex items-center justify-center rounded-full ${colors[colorIndex]}`}
        style={style}
      >
        {initial}
      </div>
    );
  }

  // 기본 아이콘
  return (
    <div
      className="flex items-center justify-center rounded-full bg-background-alternative"
      style={style}
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
          d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM12 14C7.58172 14 4 17.5817 4 22C4 22.5523 4.44772 23 5 23H19C19.5523 23 20 22.5523 20 22C20 17.5817 16.4183 14 12 14Z"
          fill="#171717"
        />
      </svg>
    </div>
  );
}

// 알림 아이콘 컴포넌트
function NotificationIcon({ count = 0 }: { count?: number }) {
  return (
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
      {count > 0 && (
        <span className="bg-red-500 absolute top-1 right-1 h-2 w-2 rounded-full"></span>
      )}
    </Link>
  );
}

// 네비게이션 링크 컴포넌트
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={twMerge(
        "relative px-6 py-[21px] text-body-1-normal font-medium text-label-assistive transition-colors",
        active && "border-black border-b-[1.5px] text-label-normal",
        active &&
          "after:bg-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full",
      )}
    >
      {children}
    </Link>
  );
}

// 데스크탑 헤더의 사용자 섹션 컴포넌트
function UserSection({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-4">
      <button className="rounded-md border border-line-normal px-4 py-2 text-body-2-normal font-medium text-label-normal hover:bg-background-alternative">
        판매자 전환
      </button>
      <NotificationIcon count={user.unreadNotificationCount || 0} />
      <Link href="/users/me" className="flex items-center gap-2">
        <ProfileAvatar user={user} />
        {user.nickname && (
          <span className="hidden text-body-2-normal font-medium md:block">
            {user.nickname}
          </span>
        )}
      </Link>
    </div>
  );
}

// 모바일 드롭다운 메뉴 컴포넌트
function MobileDropdown({
  isOpen,
  pathname,
}: {
  isOpen: boolean;
  pathname: string;
}) {
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
  );
}

// 모바일 헤더 컴포넌트
function MobileHeader({
  pathname,
  isLoading,
  user,
}: {
  pathname: string;
  isLoading: boolean;
  user: any;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 현재 경로에 따라 활성화된 탭 결정
  const activeTab = pathname.startsWith("/contents")
    ? "자료"
    : pathname.startsWith("/coaching")
      ? "코칭"
      : "";

  // /contents나 /coaching 경로에서만 모바일 헤더 표시
  const shouldShowMobileHeader =
    pathname.startsWith("/contents") || pathname.startsWith("/coaching");

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
      ) : user.isLogin ? (
        <div className="flex items-center gap-3">
          <NotificationIcon count={user.unreadNotificationCount || 0} />
          <Link
            href="/users/me"
            className="flex items-center justify-center overflow-hidden rounded-full"
          >
            <ProfileAvatar user={user} size="sm" />
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
  );
}

export default function DesktopHeader() {
  const pathname = usePathname();
  const { data: user, isLoading } = useUserInfo();
  const queryClient = useQueryClient();

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
          href="/auth/sign-in"
          className="rounded-md border border-line-normal px-4 py-2 text-body-2-normal font-medium text-label-normal hover:bg-background-alternative"
        >
          로그인
        </Link>
      );
    }

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
      <MobileHeader pathname={pathname} isLoading={isLoading} user={user} />
    </header>
  );
}
