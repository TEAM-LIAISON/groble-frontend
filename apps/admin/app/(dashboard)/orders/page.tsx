'use client';

import { useOrders } from '@/features/dashboard/orders/hooks/useOrders';
import { OrdersTable } from '@/features/dashboard/orders/ui';
import Pagination from '@/shared/ui/Pagination';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// 동적 렌더링 강제 설정
export const dynamic = 'force-dynamic';

function OrdersPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { orders, totalPages, isLoading, error, refetch } =
    useOrders(currentPage);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-title-3 text-label-normal">주문</h1>
        <div className="flex justify-center items-center h-32">
          <div className="text-red-500">
            오류가 발생했습니다: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-title-3 text-label-normal">주문</h1>

      <OrdersTable orders={orders} isLoading={isLoading} onRefresh={refetch} />

      <div className="flex justify-center">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default function DashboardOrdersPage() {
  return (
    <Suspense
      fallback={<LoadingSpinner size="lg" text="주문 목록을 불러오는 중..." />}
    >
      <OrdersPageContent />
    </Suspense>
  );
}
