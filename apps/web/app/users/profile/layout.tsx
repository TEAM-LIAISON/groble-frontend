'use client';
import WebHeader from '@/components/(improvement)/layout/header';
import {
  ProfileMobileHeader,
  ProfileSidebar,
  useUserDetail,
} from '@/features/profile';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function layout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useUserDetail();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* 헤더 영역 */}
      {/* 데스크탑: 항상 WebHeader */}
      <div className="hidden md:block">
        <WebHeader />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex flex-col md:flex-row md:justify-center md:pt-9 md:bg-background-normal bg-background-alternative min-h-screen md:min-h-0">
        {/* 모바일: 경로에 따라 다른 헤더 */}
        <div className="md:hidden">
          {pathname === '/users/profile' ? (
            <ProfileMobileHeader
              option={() => {
                router.push('/users/profile/settings');
              }}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-0 md:gap-12 max-w-[1080px] w-full">
          {isLoading ? (
            // 로딩 중일 때 전체 콘텐츠 영역에 스피너 표시
            <div className="w-full flex items-center justify-center min-h-[500px]">
              <LoadingSpinner size="large" color="text-primary-main" />
            </div>
          ) : (
            <>
              {/* 왼쪽 메뉴 - 데스크탑에서만 표시 */}
              <div className="hidden md:block">
                <ProfileSidebar />
              </div>

              {/* 오른쪽 콘텐츠 */}
              <div className="flex-1 md:w-[42rem] md:mt-[5.5rem]">
                {children}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
