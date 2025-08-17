import SettlementMonthlyDetail from '@/features/manage/store/settlement/ui/detail/settlement-monthly-detail';
import ManagePageSection from '@/features/manage/store/ui/manage-page-section';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

export default function SettlementMonthlyDetailPage({
  params,
}: {
  params: { yearMonth: string };
}) {
  const { yearMonth } = params;

  return (
    <>
      <MobileStoreHeader title="정산 관리" />
      <ManagePageSection className="mt-16" fullHeight>
        <>
          {/* 당월 정산 상세 내역 */}
          <SettlementMonthlyDetail yearMonth={yearMonth} />

          {/*  */}
        </>
      </ManagePageSection>
    </>
  );
}
