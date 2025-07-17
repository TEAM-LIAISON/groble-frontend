'use client';

import { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useContentReviewList } from '@/features/manage/products/hooks/useContentReviewList';
import ReviewsListFull from '@/features/manage/products/ui/ReviewsListFull';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

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
    <div
      className="bg-white px-5 md:px-9 py-6 md:py-12 md:rounded-xl"
      style={{
        boxShadow:
          '0px 1px 8px 0px rgba(0, 0, 0, 0.03), 0px 5px 15px 0px rgba(0, 0, 0, 0.03)',
      }}
    >
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
  );
}
