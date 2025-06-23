import WebHeader from '@/components/(improvement)/layout/header';
import { ProfileSidebar } from '@/features/profile';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WebHeader />
      <main className="flex justify-center pt-9">
        <div className="flex gap-12 max-w-[1080px] w-full">
          {/* 왼쪽 메뉴 */}
          <ProfileSidebar />
          {/* 오른쪽 콘텐츠 */}
          <div className="w-[42rem]">{children}</div>
        </div>
      </main>
    </>
  );
}
