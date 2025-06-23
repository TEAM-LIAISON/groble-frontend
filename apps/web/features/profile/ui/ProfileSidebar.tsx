'use client';

import { useUserDetail } from '../model/queries';
import { UserProfileCard } from './UserProfileCard';
import { ProfileMenuList } from './ProfileMenuList';
import { profileMenuGroups } from '../config/menuData';

export function ProfileSidebar() {
  const { data: userResponse, isLoading } = useUserDetail();

  return (
    <div className="w-[22.5rem] flex flex-col">
      {/* 사용자 프로필 카드 */}
      {userResponse?.data && (
        <UserProfileCard userDetail={userResponse.data} isLoading={isLoading} />
      )}

      {/* 메뉴 리스트 */}
      <ProfileMenuList menuGroups={profileMenuGroups} />
    </div>
  );
}
