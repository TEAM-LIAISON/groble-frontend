import SettlementCardList from '@/features/manage/store/settlement/ui/settlement-card-list';
import ManagePageSection from '@/features/manage/store/ui/manage-page-section';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

export default function SettlementPage() {
  return (
    <>
      <MobileStoreHeader title="정산 관리" />
      <ManagePageSection className="md:mt-16" fullHeight>
        {/* 정산 현황 */}
        <SettlementCardList />

        {/* 정산 내역 */}
        {/*  */}
      </ManagePageSection>
    </>
  );
}
