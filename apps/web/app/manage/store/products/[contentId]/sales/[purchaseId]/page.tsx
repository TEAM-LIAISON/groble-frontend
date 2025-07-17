'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { useSellDetail } from '@/features/manage/products/hooks/useSellDetail';
import SellDetailInfo from '@/features/manage/products/ui/SellDetailInfo';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

function SalesDetailContent() {
  const params = useParams();
  const contentId = params.contentId as string;
  const purchaseId = params.purchaseId as string;

  const { data, isLoading, error } = useSellDetail(contentId, purchaseId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-66px)]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center min-h-[calc(100vh-66px)] flex items-center justify-center">
        <p className="text-red-500">데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="text-center min-h-[calc(100vh-66px)] flex items-center justify-center">
        <p className="text-gray-500">데이터가 없습니다.</p>
      </div>
    );
  }

  return <SellDetailInfo data={data.data} />;
}

export default function SalesDetailPage() {
  return (
    <div
      className={`bg-white px-5 md:px-9 py-6 md:py-12 md:rounded-xl `}
      style={{
        boxShadow:
          '0px 1px 8px 0px rgba(0, 0, 0, 0.03), 0px 5px 15px 0px rgba(0, 0, 0, 0.03)',
      }}
    >
      <Suspense
        fallback={
          <div className="flex justify-center items-center ">
            <LoadingSpinner />
          </div>
        }
      >
        <SalesDetailContent />
      </Suspense>
    </div>
  );
}
