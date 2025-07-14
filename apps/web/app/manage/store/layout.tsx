'use client';

import WebHeader from '@/components/(improvement)/layout/header';
import StoreSidebar from '@/features/manage/store/ui/StoreSidebar';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

/**
 * 스토어 관리 레이아웃 컴포넌트
 * @param children - 페이지 컨텐츠
 */
export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* PC 헤더 - md 이상에서만 표시 */}
      <div className="hidden md:block">
        <WebHeader mobileTitle="스토어 관리" />
      </div>

      {/* 모바일 헤더 - md 미만에서만 표시 */}
      <MobileStoreHeader title="마켓 관리" />

      {/* 메인 레이아웃 컨테이너 */}
      <div className="min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-66px)] bg-background-alternative flex">
        {/* 왼쪽: PC용 고정 사이드바 - md 이상에서만 표시 */}
        <div className="hidden md:block">
          <StoreSidebar />
        </div>

        {/* 오른쪽: 스크롤 가능한 메인 콘텐츠 영역 */}
        <main className="flex-1 md:ml-60 overflow-y-auto p-4 md:pr-8 md:pb-6">
          {/* 컨텐츠 래퍼 */}
          <div className="">{children}</div>
        </main>
      </div>
    </>
  );
}
