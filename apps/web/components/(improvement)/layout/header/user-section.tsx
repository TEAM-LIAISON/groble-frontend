'use client';

import { User } from '@/lib/store/useUserStore';
import Link from 'next/link';
import NotificationIcon from './notification-icon';
import ProfileAvatar from './profile-avatar';

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
      {/* lastUserType을 기준으로 다른 링크 표시 */}
      {!user.isGuest && user.lastUserType === 'SELLER' ? (
        <Link
          href="/manage/store/dashboard"
          className="px-3 py-2 text-body-2-normal text-label-normal hover:text-label-alternative"
        >
          내 스토어
        </Link>
      ) : (
        <Link
          href="/manage/purchase"
          className="px-3 py-2 text-body-2-normal text-label-normal hover:text-label-alternative"
        >
          내 콘텐츠
        </Link>
      )}

      {!user.isGuest && <NotificationIcon count={user.unreadNotificationCount || 0} />}

      {!user.isGuest && (
        <Link href="/users/profile/info" className="flex items-center gap-2">
          <ProfileAvatar user={user} />
        </Link>
      )}
    </div>
  );
}
