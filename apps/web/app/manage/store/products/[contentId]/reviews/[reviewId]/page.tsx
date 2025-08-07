'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import ReviewDetailInfo from '@/features/manage/products/ui/ReviewDetailInfo';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

function ReviewDetailContent() {
  const params = useParams();
  const contentId = params.contentId as string;
  const reviewId = params.reviewId as string;

  return <ReviewDetailInfo reviewId={reviewId} contentId={contentId} />;
}

export default function ReviewDetailPage() {
  return (
    <>
      <MobileStoreHeader title="리뷰 내역" back="back" />
      <div className="bg-white md:mt-16 px-5 md:px-9 py-5 md:py-12 md:rounded-xl md:shadow-card min-h-[calc(100vh-122px)]">
        <Suspense fallback={<LoadingSpinner />}>
          <ReviewDetailContent />
        </Suspense>
      </div>
    </>
  );
}
