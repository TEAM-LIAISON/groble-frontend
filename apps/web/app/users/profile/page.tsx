'use client';

import NavigationBar from '@/components/navigation-bar';
import { ProfileSidebar } from '@/features/profile';
import { useEffect } from 'react';
import { amplitudeEvents } from '@/lib/utils/amplitude';

export default function ProfilePage() {
  // 프로필 페이지 뷰 이벤트 트래킹
  useEffect(() => {
    amplitudeEvents.pageView('Profile Page', {
      page_type: 'user_profile',
    });
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {/* 모바일에서만 표시되는 메뉴 */}
        <div className="md:hidden px-5">
          <ProfileSidebar />
        </div>

        {/* 데스크탑에서는 자동으로 info 페이지로 리다이렉트 */}
        <div className="hidden md:block">
          {/* 데스크탑에서는 layout.tsx에서 처리 */}
        </div>
      </div>
      <NavigationBar />
    </>
  );
}
