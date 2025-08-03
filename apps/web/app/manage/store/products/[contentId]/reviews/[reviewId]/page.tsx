'use client';

import ReviewDetailInfo from '@/features/manage/products/ui/ReviewDetailInfo';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';

function ReviewDetailContent() {
  const params = useParams();
  const contentId = params.contentId as string;
  const reviewId = params.reviewId as string;

  return <ReviewDetailInfo reviewId={reviewId} contentId={contentId} />;
}

export default function ReviewDetailPage() {
  return (
    <>
      <MobileStoreHeader title="리뷰 내역" />
      <div className="bg-white px-5 md:px-9 py-5 md:py-12 md:rounded-xl md:shadow-card">
        <Suspense fallback={<LoadingSpinner />}>
          <ReviewDetailContent />
        </Suspense>
      </div>
    </>
  );
}
