import MarketHitsViewList from '@/features/manage/store/dashboard/hits/ui/market-hits-view-list';
import MarketHitsReferrerList from '@/features/manage/store/dashboard/hits/ui/market-hits-referrer-list';
import MarketNameDisplay from '@/features/manage/store/dashboard/hits/ui/market-name-display';
import PeriodFilterBtn from '@/features/manage/store/dashboard/ui/period-filter-btn';
import ManagePageSection from '@/features/manage/store/ui/manage-page-section';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';
import { Suspense } from 'react';

export default function DashboardHitsMarketPage() {
  return (
    <>
      <MobileStoreHeader title="마켓 조회수" />
      <h2 className="md:mt-16 md:mb-4 text-heading-1 font-bold text-label-normal md:block hidden">
        마켓 조회수
      </h2>
      <ManagePageSection className=" space-y-5 md:space-y-[3rem] min-h-[calc(100vh-162px)]">
        <Suspense>
          <MarketNameDisplay />
          <PeriodFilterBtn />

          {/* 마켓 날짜별 조회수 리스트 */}

          <MarketHitsViewList />

          {/* 마켓 유입경로 리스트 */}
          <MarketHitsReferrerList />
        </Suspense>
      </ManagePageSection>
    </>
  );
}
