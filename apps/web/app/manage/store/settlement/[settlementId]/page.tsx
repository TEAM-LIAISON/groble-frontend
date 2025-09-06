import SettlementMonthlyDetail from '@/features/manage/store/settlement/ui/detail/settlement-monthly-detail';
import SettlementMonthlySalesHistory from '@/features/manage/store/settlement/ui/detail/settlement-monthly-sales-history';
import ManagePageSection from '@/features/manage/store/ui/manage-page-section';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

export default function SettlementMonthlyDetailPage({
  params,
}: {
  params: { settlementId: string };
}) {
  const { settlementId } = params;

  return (
    <>
      <MobileStoreHeader title="정산 관리" back="back" />
      <ManagePageSection className="md:mt-16 space-y-[3rem]" fullHeight>
        {/* 당월 정산 상세 내역 */}
        <SettlementMonthlyDetail settlementId={settlementId} />

        {/* 판매 내역 테이블 */}
        <SettlementMonthlySalesHistory settlementId={settlementId} />
      </ManagePageSection>
    </>
  );
}
