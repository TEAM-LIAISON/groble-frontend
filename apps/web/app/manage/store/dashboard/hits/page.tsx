import MarketHitsCardList from '@/features/manage/store/dashboard/hits/ui/market-hits-card-list';
import MarketHitsContentList from '@/features/manage/store/dashboard/hits/ui/market-hits-content-list';
import PeriodFilterBtn from '@/features/manage/store/dashboard/ui/period-filter-btn';
import ManagePageSection from '@/features/manage/store/ui/manage-page-section';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

export default function StoreHitsPage() {
  return (
    <>
      <MobileStoreHeader title="콘텐츠 조회수" />

      {/* <ManagePageSection
        className="md:mt-16 space-y-5 md:space-y-[3rem] "
        fullHeight
      >
        <Suspense>
          <PeriodFilterBtn />

          {/* 마켓 지표 카드들 */}
          <MarketHitsCardList />

          {/* 마켓 콘텐츠 조회수 순위 리스트 */}
          <MarketHitsContentList />
        </Suspense>
      </ManagePageSection>
    </>
  );
}
