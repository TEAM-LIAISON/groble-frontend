'use client';

import SettlementCardList from '@/features/manage/store/settlement/ui/settlement-card-list';
import SettlementHistory from '@/features/manage/store/settlement/ui/settlement-history';
import ManagePageSection from '@/features/manage/store/ui/manage-page-section';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

export default function SettlementPage() {
  return (
    <>
      <MobileStoreHeader title="정산 관리" back="back" />

      <ManagePageSection
        className="md:mt-16 space-y-5 md:space-y-[3rem] "
        fullHeight
      >
        {/* 정산 현황 */}
        <SettlementCardList />

        {/* 정산 내역*/}
        <SettlementHistory />
      </ManagePageSection>
    </>
  );
}
