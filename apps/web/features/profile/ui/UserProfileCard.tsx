import Image from 'next/image';
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
      return '판매자';
    case 'BUYER / SELLER':
      return '구매자 / 판매자';
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
  if (isLoading) {
    return <UserProfileCardSkeleton />;
  }

  return (
    <div className="flex items-center gap-4">
      <Image
        src={userDetail.profileImageUrl || '/assets/common/icons/Avatar.svg'}
        alt="profile"
        width={56}
        height={56}
        className="rounded-full object-cover"
      />
      <div className="flex flex-col gap-[0.32rem]">
        <p className="text-title-3 font-bold text-label-normal">
          {userDetail.nickname || '사용자'}
        </p>
        <p className="text-label-1-normal text-primary-sub-1 font-semibold">
          {getUserTypeText(userDetail.userType)}
        </p>
      </div>
    </div>
  );
}
