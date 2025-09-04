import MobileTitleHeader from "@/features/manage/store/ui/MobileTitleHeader";
import { MobileStoreMenuCard } from "@/features/manage/store/ui/MobileStoreMenuCard";
import { mobileStoreMenuList } from "@/features/manage/store/model/storeMenuList";

export default function MobileStoreMenuPage() {
  return (
    <div className="w-full min-h-[calc(100vh-59px)] bg-background-alternative">
      <div className="md:hidden">
        <MobileTitleHeader title="내 스토어" />
        <div className="px-4">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridAutoRows: '1fr'
            }}
          >
            {mobileStoreMenuList.map((menu) => (
              <MobileStoreMenuCard key={menu.title} menu={menu} />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
            모바일 전용 페이지
          </h1>
          <p className="text-neutral-600">
            이 페이지는 모바일에서만 접근할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

