import ComingSoon from '@/features/manage/store/ui/ComingSoon';

export default function ProductsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">상품 관리</h1>
        <p className="text-gray-600 mt-2">
          등록된 상품을 관리하고 수정할 수 있습니다
        </p>
      </div>

      <ComingSoon
        title="상품 관리 준비중"
        description="상품 등록, 수정, 삭제 및 재고 관리 기능을 제공합니다."
      />
    </div>
  );
}
