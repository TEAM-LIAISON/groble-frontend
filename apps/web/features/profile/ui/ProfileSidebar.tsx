'use client';

import { useMemo } from 'react';
import { useUserDetail } from '../model/queries';
import { UserProfileCard } from './UserProfileCard';
import { ProfileMenuList } from './ProfileMenuList';
import { profileMenuGroups, sellerProfileMenuGroups } from '../config/menuData';
import type { ProfileMenuGroup } from '../model/types';

export function ProfileSidebar() {
  const { data: userResponse, isLoading } = useUserDetail();

  const menuGroups = useMemo((): ProfileMenuGroup[] => {
    if (!userResponse?.data) return profileMenuGroups;

    const userData = userResponse.data;

    // 판매자인 경우 판매자용 메뉴 사용
    if (userData.userType === 'SELLER') {
      // 인증상태가 있다면 메뉴에 반영
      if (userData.verificationStatus) {
        const updatedMenuGroups = sellerProfileMenuGroups.map((group) => {
          if (group.id === 'verification') {
            return {
              ...group,
              items: group.items.map((item) => {
                if (item.id === 'verification-status') {
                  return {
                    ...item,
                    status: userData.verificationStatus,
                  };
                }
                return item;
              }),
            };
          }
          return group;
        });
        return updatedMenuGroups;
      }
      return sellerProfileMenuGroups;
    }

    // 구매자인 경우 기본 메뉴 사용
    return profileMenuGroups;
  }, [userResponse?.data]);

  return (
    <div className="w-[22.5rem] flex flex-col">
      {/* 사용자 프로필 카드 */}
      {userResponse?.data && (
        <UserProfileCard userDetail={userResponse.data} isLoading={isLoading} />
      )}

      {/* 메뉴 리스트 */}
      <ProfileMenuList menuGroups={menuGroups} />
    </div>
  );
}
