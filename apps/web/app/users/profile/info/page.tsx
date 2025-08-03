'use client';

import {
  ProfileImageUpload,
  ProfileInfoList,
  ProfileMobileHeader,
  useUserDetail,
} from '@/features/profile';

export default function ProfileInfoPage() {
  const { data: userResponse } = useUserDetail();

  return (
    <>
      <ProfileMobileHeader back={'/users/profile'} option={() => {}} />
      <div className="flex flex-col px-5 md:px-0">
        <div className="flex justify-center md:justify-start">
          <ProfileImageUpload
            profileImageUrl={userResponse?.data?.profileImageUrl}
          />
        </div>

        <div className="mt-9 md:mt-[0.77rem]">
          <ProfileInfoList userData={userResponse?.data} />
        </div>
      </div>
    </>
  );
}
