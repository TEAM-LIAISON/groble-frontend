import ComingSoon from '@/features/manage/store/ui/ComingSoon';

export default function SettlementPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">정산 관리</h1>
        <p className="text-gray-600 mt-2">
          매출 정산 내역을 확인하고 관리할 수 있습니다
        </p>
      </div>

      <ComingSoon
        title="정산 관리 준비중"
        description="매출 정산, 수수료 내역, 지급 현황을 확인할 수 있습니다."
      />
    </div>
  );
}
