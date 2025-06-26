'use client';

import NavigationBar from '@/components/navigation-bar';
import { ProfileSidebar } from '@/features/profile';

export default function ProfilePage() {
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
