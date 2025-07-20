'use client';

import { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useContentReviewList } from '@/features/manage/products/hooks/useContentReviewList';
import ReviewsListFull from '@/features/manage/products/ui/ReviewsListFull';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

function ReviewsListContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const contentId = params.contentId as string;
  const page = parseInt(searchParams.get('page') || '1') - 1; // API는 0부터 시작

  const { data, isLoading, error } = useContentReviewList(contentId, page, 15);

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
    <ReviewsListFull
      data={data.data.items}
      contentId={contentId}
      currentPage={page + 1} // UI는 1부터 시작
      totalPages={data.data.pageInfo.totalPages}
      isLoading={isLoading}
    />
  );
}

export default function ReviewsListPage() {
  return (
    <>
      <MobileStoreHeader title="리뷰 내역" />
      <div className="bg-white px-5 md:px-9 py-5 md:py-12 md:rounded-xl md:shadow-card">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          }
        >
          <ReviewsListContent />
        </Suspense>
      </div>
    </>
  );
}
