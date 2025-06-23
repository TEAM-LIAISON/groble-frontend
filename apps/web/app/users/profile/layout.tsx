'use client';
import WebHeader from '@/components/(improvement)/layout/header';
import { ProfileSidebar, useUserDetail } from '@/features/profile';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

export default function layout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useUserDetail();

  return (
    <>
      <WebHeader />
      <main className="flex justify-center pt-9">
        <div className="flex gap-12 max-w-[1080px] w-full">
          {isLoading ? (
            // 로딩 중일 때 전체 콘텐츠 영역에 스피너 표시
            <div className="w-full flex items-center justify-center min-h-[500px]">
              <LoadingSpinner size="large" color="text-primary-main" />
            </div>
          ) : (
            <>
              {/* 왼쪽 메뉴 */}
              <ProfileSidebar />
              {/* 오른쪽 콘텐츠 */}
              <div className="w-[42rem] mt-[5.5rem]">{children}</div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
