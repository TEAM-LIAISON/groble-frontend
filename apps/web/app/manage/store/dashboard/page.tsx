import DashboardCardList from '@/features/manage/store/dashboard/ui/dashboard-card-list';
import ComingSoon from '@/features/manage/store/ui/ComingSoon';
import ManagePageSection from '@/features/manage/store/ui/manage-page-section';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

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
      </ManagePageSection>
    </>
  );
}
