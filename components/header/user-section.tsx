"use client";

import { User } from "@/lib/store/useUserStore";
import Link from "next/link";
import NotificationIcon from "./notification-icon";
import ProfileAvatar from "./profile-avatar";
import { useState } from "react";

interface UserSectionProps {
  user: User | null;
}

/**
 * 사용자 정보 섹션 컴포넌트
 * 로그인한 사용자의 프로필 및 기능 버튼을 표시
 */
export default function UserSection({ user }: UserSectionProps) {
  // null 체크 추가
  if (!user) return null;

  // 드롭다운 표시 상태를 관리하는 state 추가
  const [isMyContentOpen, setIsMyContentOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Link
        href="https://groble-maker.oopy.io/?utm_source=homepage&utm_medium=the+top"
        className="px-3 py-2 text-body-2-normal text-label-normal hover:text-label-alternative"
      >
        메이커 등록
      </Link>

      {/* hover 방식 대신 onMouseEnter와 onMouseLeave 이벤트 사용 */}
      <div
        className="relative"
        onMouseEnter={() => setIsMyContentOpen(true)}
        onMouseLeave={() => setIsMyContentOpen(false)}
      >
        <div className="cursor-pointer px-3 py-2 text-body-2-normal text-label-normal hover:text-label-alternative">
          {user.alreadyRegisteredAsSeller && "내 스토어 /"} 내 콘텐츠
        </div>

        {/* 조건부 렌더링으로 드롭다운 표시 - 드롭다운과 트리거 사이의 gap을 없애기 위한 invisible bridge 추가 */}
        {isMyContentOpen && (
          <>
            {/* 내 스토어 section */}
            {user.alreadyRegisteredAsSeller && (
              <Link
                href="/contents"
                className="flex cursor-pointer items-center justify-between gap-[0.38rem] rounded-sm px-4 py-2 hover:bg-background-alternative"
              >
                <span className="text-body-1-normal text-label-normal">
                  내 스토어
                </span>
                <div className="rounded-full bg-background-alternative px-2 py-1 text-caption-2 text-label-normal">
                  메이커
                </div>
              </Link>
            )}

            <hr className="my-1 w-[85%] border-line-alternative" />

            {/* 트리거와 드롭다운 사이의 invisible bridge */}
            <div className="absolute top-full left-0 z-50 h-1 w-full" />
            <div className="absolute top-[calc(100%+1px)] left-0 z-50 w-[10rem] rounded-lg bg-white shadow-lg">
              <div className="flex flex-col items-center py-1">
                {/* 내 콘텐츠 section */}
                <Link
                  href="/"
                  className="flex cursor-pointer items-center justify-between gap-[0.38rem] rounded-sm px-4 py-2 hover:bg-background-alternative"
                >
                  <span className="text-body-1-normal text-label-normal">
                    내 콘텐츠
                  </span>
                  <div className="rounded-full bg-primary-sub-1 px-2 py-1 text-caption-2 text-background-normal">
                    구매자
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <NotificationIcon count={user.unreadNotificationCount || 0} />
      <Link href="/users/me" className="flex items-center gap-2">
        <ProfileAvatar user={user} />
      </Link>
    </div>
  );
}
