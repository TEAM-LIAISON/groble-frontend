import Sidebar from '@/features/dashboard/ui/Sidebar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex h-full min-h-[calc(100vh-64px)]`}>
      {/* 사이드바 */}
      <aside className="py-6 bg-white overflow-auto h-full">
        <Sidebar />
      </aside>

      {/* 페이지별 콘텐츠 */}
      <section className="flex-1 p-6 overflow-auto bg-gray-50">
        {children}
      </section>
    </div>
  );
}
