'use client';

import { useUserDetail, ProfileImageUpload } from '@/features/profile';

export default function ProfilePage() {
  const { data: userResponse, isLoading } = useUserDetail();

  return (
    <div className="flex flex-col">
      <ProfileImageUpload
        profileImageUrl={userResponse?.data?.profileImageUrl}
      />
    </div>
  );
}
