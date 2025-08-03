'use client';

import { useContentSellList } from '@/features/manage/products/hooks/useContentSellList';
import SalesListFull from '@/features/manage/products/ui/SalesListFull';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SalesListContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const contentId = params.contentId as string;
  const page = Number.parseInt(searchParams.get('page') || '1') - 1; // API는 0부터 시작

  const { data, isLoading, error } = useContentSellList(contentId, page, 15);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (!data?.data?.items) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <SalesListFull
      data={data.data.items}
      contentId={contentId}
      currentPage={page + 1} // UI는 1부터 시작
      totalPages={data.data.pageInfo.totalPages}
      isLoading={isLoading}
    />
  );
}

export default function SalesListPage() {
  return (
    <>
      <MobileStoreHeader title="판매 리스트" />
      <div className="bg-white px-5 md:px-9 py-5 md:py-12 md:rounded-xl md:shadow-card">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          }
        >
          <SalesListContent />
        </Suspense>
      </div>
    </>
  );
}
