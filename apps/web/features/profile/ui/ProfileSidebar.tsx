'use client';

import { useMemo } from 'react';
import { useUserDetail } from '../model/queries';
import { UserProfileCard } from './UserProfileCard';
import { ProfileMenuList } from './ProfileMenuList';
import { profileMenuGroups, sellerProfileMenuGroups } from '../config/menuData';
import type { ProfileMenuGroup } from '../model/types';
import { ChevronIcon } from '@/components/(improvement)/icons';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

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

      {/* 메이커 인증 말풍선 표시 */}

      {userResponse?.data?.userType === 'SELLER' &&
      userResponse?.data?.verificationStatus === 'PENDING' ? (
        <Link
          href="/users/maker/select-type"
          className="mt-8 py-5 px-4 flex justify-between items-center bg-[#FEECEC] rounded-xl border-dashed border-[1.5px] border-status-error cursor-pointer hover:brightness-[102%]"
        >
          <div className="flex flex-col gap-[0.12rem]">
            <p className="text-body-1-normal font-semibold text-label-normal">
              정산을 받으려면 메이커 인증이 필요해요
            </p>
            <p className="text-body-1-normal text-status-error font-semibold ">
              인증하러 가기
            </p>
          </div>
          <ChevronIcon className="w-5 h-5 text-status-error" />
        </Link>
      ) : (
        <div className="mt-6"></div>
      )}

      {/* 메뉴 리스트 */}
      <ProfileMenuList menuGroups={menuGroups} />
    </div>
  );
}
