'use client';

import {
  useUserDetail,
  ProfileImageUpload,
  ProfileInfoList,
} from '@/features/profile';

export default function ProfilePage() {
  const { data: userResponse, isLoading } = useUserDetail();

  return (
    <div className="flex flex-col">
      <ProfileImageUpload
        profileImageUrl={userResponse?.data?.profileImageUrl}
      />

      <div className="mt-[0.77rem]"></div>

      <ProfileInfoList userData={userResponse?.data} />
    </div>
  );
}
