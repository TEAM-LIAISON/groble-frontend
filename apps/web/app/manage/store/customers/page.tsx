import ComingSoon from '@/features/manage/store/ui/ComingSoon';

export default function CustomersPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">고객 관리</h1>
        <p className="text-gray-600 mt-2">
          고객 정보와 주문 내역을 확인할 수 있습니다
        </p>
      </div>

      <ComingSoon
        title="고객 관리 준비중"
        description="고객 목록, 주문 내역, 문의사항 등을 관리할 수 있습니다."
      />
    </div>
  );
}
