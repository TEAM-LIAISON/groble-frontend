import MarketHitsViewList from '@/features/manage/store/dashboard/hits/ui/market-hits-view-list';
import MarketHitsReferrerList from '@/features/manage/store/dashboard/hits/ui/market-hits-referrer-list';
import PeriodFilterBtn from '@/features/manage/store/dashboard/ui/period-filter-btn';
import ManagePageSection from '@/features/manage/store/ui/manage-page-section';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

export default function DashboardHitsMarketPage() {
  return (
    <>
      <MobileStoreHeader title="마켓 조회수" />
      <h2 className="md:mt-16 md:mb-4 text-heading-1 font-bold text-label-normal">
        마켓 조회수
      </h2>

      <ManagePageSection className=" space-y-5 md:space-y-[3rem] min-h-[calc(100vh-162px)]">
        <PeriodFilterBtn />

        {/* 마켓 날짜별 조회수 리스트 */}
        <MarketHitsViewList />

        {/* 마켓 유입경로 리스트 */}
        <MarketHitsReferrerList />
      </ManagePageSection>
    </>
  );
}
