'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import StarRating from '@/shared/ui/StarRating';
import CapsuleButton from '@/shared/ui/CapsuleButton';
import { useReviews } from '../hooks/useReviews';
import type { ContentReviewResponse } from '@/entities/product/model';

interface ReviewSectionProps {
  initialReviews: ContentReviewResponse;
  contentId: string;
}

type ReviewSortType = 'LATEST' | 'RATING_HIGH' | 'RATING_LOW';

const reviewSortOptions = [
  { label: '최신순', value: 'LATEST' },
  { label: '별점 높은 순', value: 'RATING_HIGH' },
  { label: '별점 낮은 순', value: 'RATING_LOW' },
];

function ReviewSectionContent({
  initialReviews,
  contentId,
}: ReviewSectionProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentSort =
    (searchParams.get('reviewSort') as ReviewSortType) || 'LATEST';

  const {
    data: reviewsResponse,
    isLoading,
    error,
  } = useReviews(contentId, currentSort, initialReviews);

  const reviews = reviewsResponse?.data || initialReviews;

  const getCurrentSortLabel = () => {
    const option = reviewSortOptions.find((opt) => opt.value === currentSort);
    return option ? option.label : '최신순';
  };

  const handleReviewSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('reviewSort', value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (error) {
    return (
      <div className="text-body-2-reading text-status-error">
        리뷰를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-5 text-headline-1 font-semibold text-label-normal">
        리뷰
      </h2>

      <div className="">
        <div className="flex items-center">
          <StarRating rating={reviews.averageRating} size={32} />
          <span className="text-headline-1 font-bold text-label-neutral ml-4">
            {reviews.averageRating.toFixed(1)}
          </span>
          <span className="text-headline-1 text-label-assistive ml-1">
            ({reviews.totalReviewCount})
          </span>
        </div>
      </div>

      <hr className="my-5 border-line-normal" />

      <div className="mb-6">
        <CapsuleButton
          size="m"
          type="secondary"
          showIcon={true}
          textValue={getCurrentSortLabel()}
          menuOptions={reviewSortOptions}
          onMenuSelect={handleReviewSortChange}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-4">
        {isLoading && (
          <div className="text-body-2-reading text-label-assistive">
            리뷰를 불러오는 중...
          </div>
        )}

        <div className="text-body-2-reading text-label-neutral">
          리뷰 목록 UI는 추후 구현 예정입니다.
          <br />총 {reviews.totalReviewCount}개의 리뷰가 있습니다.
          <br />
          현재 정렬: {getCurrentSortLabel()}
          <br />
          콘텐츠 ID: {contentId}
          {isLoading && (
            <>
              <br />
              데이터 업데이트 중...
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReviewSection({
  initialReviews,
  contentId,
}: ReviewSectionProps) {
  return (
    <Suspense
      fallback={
        <div className="text-body-2-reading text-label-neutral">
          리뷰 로딩 중...
        </div>
      }
    >
      <ReviewSectionContent
        initialReviews={initialReviews}
        contentId={contentId}
      />
    </Suspense>
  );
}
