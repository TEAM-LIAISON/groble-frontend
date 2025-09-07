

import DashboardCardList from '@/features/manage/store/dashboard/ui/dashboard-card-list';
import DashboardMyContentList from '@/features/manage/store/dashboard/ui/dashboard-my-content-list';



import ManagePageSection from '@/features/manage/store/ui/manage-page-section';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <>

      <MobileStoreHeader title="대시보드" />

      <ManagePageSection
        className="md:mt-16 space-y-5 md:space-y-[3rem] "
        fullHeight
      >
        {/* 주요 지표 리스트 */}
        <DashboardCardList />

        {/* 내 컨텐츠 리스트 */}
        <Suspense>
          <DashboardMyContentList />
        </Suspense>
      </ManagePageSection>

    </>
  );
}
