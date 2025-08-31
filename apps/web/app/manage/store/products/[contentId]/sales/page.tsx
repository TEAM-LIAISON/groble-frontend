'use client';

import { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useContentSellList } from '@/features/manage/products/hooks/useContentSellList';
import SalesListFull from '@/features/manage/products/ui/SalesListFull';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';
import Link from 'next/link';
import ArrowIcon from '@/components/(improvement)/icons/ArrowIcon';

function SalesListContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const contentId = params.contentId as string;
  const page = parseInt(searchParams.get('page') || '1') - 1; // API는 0부터 시작

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
    <>
      {/* 상품관리 > 판매관리 > 판매 리스트 */}
      <div className="flex mb-6 items-center text-body-2-normal">
        <Link
          href="/manage/store/products"
          className="text-label-alternative hover:underline"
        >
          상품관리
        </Link>
        <ArrowIcon direction="right" className="text-label-alternative" />
        <Link
          href={`/manage/store/products/${contentId}`}
          className="text-label-alternative hover:underline"
        >
          판매관리
        </Link>
        <ArrowIcon direction="right" className="text-label-alternative" />
        <span className="text-primary-sub-1">판매 리스트</span>
      </div>

      <SalesListFull
        data={data.data.items}
        contentId={contentId}
        currentPage={page + 1} // UI는 1부터 시작
        totalPages={data.data.pageInfo.totalPages}
        isLoading={isLoading}
      />
    </>
  );
}

export default function SalesListPage() {
  return (
    <>
      <MobileStoreHeader title="판매 리스트" back="back" />

      <div className="bg-white md:mt-16 px-5 md:px-9 py-5 md:py-12 md:rounded-xl md:shadow-card min-h-[calc(100vh-122px)]">
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
