// layout.tsx

import Sidebar from '@/features/dashboard/ui/Sidebar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* 사이드바 - 고정 */}
      <aside className="py-6 bg-white flex-shrink-0 w-64 border-r border-gray-200">
        <div className="h-full">
          <Sidebar />
        </div>
      </aside>

      {/* 페이지별 콘텐츠 - 스크롤 가능 */}
      <section className="flex-1 overflow-auto bg-background-alternative">
        <div className="p-9">{children}</div>
      </section>
    </div>
  );
}
