import ComingSoon from '@/features/manage/store/ui/ComingSoon';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-2">
          스토어 운영 현황을 한눈에 확인하세요
        </p>
      </div>

      <ComingSoon
        title="대시보드 준비중"
        description="매출 현황, 주문 통계, 인기 상품 등을 확인할 수 있습니다."
      />
    </div>
  );
}
