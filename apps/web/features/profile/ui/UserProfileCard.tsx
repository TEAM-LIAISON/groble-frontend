'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { UserDetail } from '../model/types';

interface UserProfileCardProps {
  userDetail: UserDetail;
  isLoading?: boolean;
}

const getUserTypeText = (userType: UserDetail['userType']) => {
  switch (userType) {
    case 'BUYER':
      return '구매자';
    case 'SELLER':
      return '메이커';
    case 'BUYER / SELLER':
      return '구매자 / 메이커';
    default:
      return '사용자';
  }
};

const UserProfileCardSkeleton = () => (
  <div className="flex items-center gap-4">
    <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse" />
    <div className="flex flex-col gap-2">
      <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
    </div>
  </div>
);

export function UserProfileCard({
  userDetail,
  isLoading,
}: UserProfileCardProps) {
  const router = useRouter();

  const handleClick = () => {
    // 모바일에서만 클릭 이벤트 처리
    if (window.innerWidth < 768) {
      router.push('/users/profile/info');
    }
  };

  if (isLoading) {
    return <UserProfileCardSkeleton />;
  }

  return (
    <div
      className="flex items-center gap-4 md:cursor-default cursor-pointer md:hover:bg-transparent hover:bg-gray-50 md:p-0 p-2 rounded-lg transition-colors"
      onClick={handleClick}
    >
      <div className="relative w-[56px] h-[56px] rounded-full">
        <Image
          src={userDetail.profileImageUrl || '/assets/common/icons/Avatar.svg'}
          alt="profile"
          fill
          className="rounded-full "
        />
      </div>
      <div className="flex flex-col gap-[0.32rem]">
        <p className="text-heading-1 md:text-title-3 font-bold text-label-normal">
          {userDetail.nickname || '사용자'}
        </p>
        <p className="text-body-2-normal md:text-label-1-normal text-primary-sub-1 font-semibold">
          {getUserTypeText(userDetail.userType)}
        </p>
      </div>
      {/* 모바일에서만 보이는 화살표 */}
      <div className="md:hidden ml-auto">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
