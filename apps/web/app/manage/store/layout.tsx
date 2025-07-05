'use client';

import WebHeader from '@/components/(improvement)/layout/header';
import StoreSidebar from '@/features/manage/store/ui/StoreSidebar';

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
      {/* 웹 헤더 (모바일 전용) */}
      <WebHeader mobileTitle="스토어 관리" />

      {/* 메인 레이아웃 컨테이너 */}
      <div className={`h-[calc(100vh-66px)] bg-background-alternative flex `}>
        {/* 왼쪽: 고정 사이드바 */}
        <StoreSidebar />

        {/* 오른쪽: 스크롤 가능한 메인 콘텐츠 영역 */}
        <main className="flex-1 ml-60 overflow-y-auto pr-8">
          {/* 컨텐츠 래퍼 */}
          <div className="">{children}</div>
        </main>
      </div>
    </>
  );
}
