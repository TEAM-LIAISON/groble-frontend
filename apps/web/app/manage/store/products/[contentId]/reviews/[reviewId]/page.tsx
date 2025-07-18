'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import ReviewDetailInfo from '@/features/manage/products/ui/ReviewDetailInfo';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

function ReviewDetailContent() {
  const params = useParams();
  const contentId = params.contentId as string;
  const reviewId = params.reviewId as string;

  return <ReviewDetailInfo reviewId={reviewId} contentId={contentId} />;
}

export default function ReviewDetailPage() {
  return (
    <div
      className="bg-white px-5 md:px-9 py-6 md:py-12 md:rounded-xl min-h-[calc(100vh-226px)]"
      style={{
        boxShadow:
          '0px 1px 8px 0px rgba(0, 0, 0, 0.03), 0px 5px 15px 0px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div className="">
        <Suspense fallback={<LoadingSpinner />}>
          <ReviewDetailContent />
        </Suspense>
      </div>
    </div>
  );
}
