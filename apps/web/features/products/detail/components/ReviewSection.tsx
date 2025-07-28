'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import StarRating from '@/shared/ui/StarRating';
import CapsuleButton from '@/shared/ui/CapsuleButton';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import ReviewItem from './ReviewItem';
import { useReviews } from '../hooks/useReviews';
import type { ContentReviewResponse } from '@/entities/product/model';
import { Button } from '@groble/ui';

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

// 페이지당 리뷰 개수
const REVIEWS_PER_PAGE = 5;

function ReviewSectionContent({
  initialReviews,
  contentId,
}: ReviewSectionProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // 현재 보여줄 리뷰 개수 상태
  const [displayCount, setDisplayCount] = useState(REVIEWS_PER_PAGE);

  const currentSort =
    (searchParams.get('reviewSort') as ReviewSortType) || 'LATEST';

  // 효율적인 데이터 관리:
  // - LATEST 정렬: SSR 데이터 활용 (즉시 표시, 추가 API 호출 없음)
  // - 다른 정렬: CSR로 새로운 데이터 가져오기
  const {
    data: reviewsResponse,
    isLoading,
    error,
  } = useReviews(contentId, currentSort, initialReviews);

  // React Query 데이터 우선, 없으면 SSR 데이터 사용
  const reviews = reviewsResponse?.data || initialReviews;

  const getCurrentSortLabel = () => {
    const option = reviewSortOptions.find((opt) => opt.value === currentSort);
    return option ? option.label : '최신순';
  };

  const handleReviewSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('reviewSort', value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    // 정렬 변경 시 다시 처음부터 보여주기
    setDisplayCount(REVIEWS_PER_PAGE);
  };

  // 더보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + REVIEWS_PER_PAGE);
  };

  // 리뷰 수정 핸들러
  const handleEditReview = (reviewId: number) => {
    console.log('리뷰 수정:', reviewId);
    // TODO: 리뷰 수정 로직 구현
  };

  // 리뷰 삭제 후 캐시 무효화
  const handleDeleteReview = (reviewId: number) => {
    // 리뷰 목록 캐시 무효화하여 UI 업데이트
    queryClient.invalidateQueries({
      queryKey: ['reviews', contentId],
    });

    // 삭제 후 현재 표시 개수 조정 (필요시)
    const remainingReviews = reviews.reviews.length - 1;
    if (displayCount > remainingReviews && remainingReviews > 0) {
      setDisplayCount(Math.max(REVIEWS_PER_PAGE, remainingReviews));
    }
  };

  // 현재 보여줄 리뷰들
  const displayedReviews = reviews.reviews?.slice(0, displayCount) || [];

  // 더보기 버튼 표시 여부
  const hasMoreReviews =
    reviews.reviews && displayCount < reviews.reviews.length;

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

      {/* 로딩 상태 */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size="medium" color="text-gray-500" />
          <p className="mt-4 text-body-2-reading text-label-assistive">
            리뷰를 불러오는 중...
          </p>
        </div>
      ) : (
        /* 리뷰 목록 */
        <div>
          <div className="space-y-6">
            {/* 리뷰 목록 */}
            {displayedReviews.length > 0 ? (
              displayedReviews.map((review) => (
                <ReviewItem
                  key={review.reviewId}
                  review={review}
                  onEdit={handleEditReview}
                  onDelete={handleDeleteReview}
                />
              ))
            ) : (
              <div className="text-body-2-reading text-label-neutral text-center py-8">
                아직 등록된 리뷰가 없습니다.
              </div>
            )}
          </div>

          {/* 더보기 버튼 */}
          {hasMoreReviews && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleLoadMore}
                type="tertiary"
                size="large"
                group="outlined"
                className="w-full text-headline-1 font-semibold"
              >
                더보기
              </Button>
            </div>
          )}
        </div>
      )}
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
