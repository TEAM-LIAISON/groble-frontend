"use client";

import Link from "next/link";
import { User } from "@/lib/store/useUserStore";
import ProfileAvatar from "./profile-avatar";
import NotificationIcon from "./notification-icon";

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

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/#"
        className="px-3 py-2 text-body-2-normal text-label-normal hover:text-label-alternative"
      >
        판매자 등록
      </Link>
      <Link
        href="/#"
        className="px-3 py-2 text-body-2-normal text-label-normal hover:text-label-alternative"
      >
        내 스토어
      </Link>
      <NotificationIcon count={user.unreadNotificationCount || 0} />
      <Link href="/users/me" className="flex items-center gap-2">
        <ProfileAvatar user={user} />
      </Link>
    </div>
  );
}
