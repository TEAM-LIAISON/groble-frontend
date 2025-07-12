'use client';

import { Suspense, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import PurchaseProductCard from '@/features/manage/components/PurchaseProductCard';
import StarRating from '@/features/manage/components/StarRating';
import { usePurchaseDetail } from '@/features/manage/hooks/usePurchaseDetail';
import { useReview } from '@/features/manage/hooks/useReview';
import { Button, TextAreaTextField } from '@groble/ui';
import { showToast } from '@/shared/ui/Toast';

// 별점에 따른 텍스트 반환
function getRatingText(rating: number): string {
  switch (rating) {
    case 1:
      return '매우 불만족';
    case 2:
      return '불만족';
    case 3:
      return '보통';
    case 4:
      return '만족';
    case 5:
      return '매우 만족';
    default:
      return '';
  }
}

function PurchaseReviewContent() {
  const params = useParams();
  const router = useRouter();
  const merchantUid = params.merchantUid as string;

  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');

  const { data, isLoading, isError, error } = usePurchaseDetail(merchantUid);

  const { mutate: submitReview, isLoading: isSubmitting } = useReview(
    () => {
      // 성공 시 처리
      showToast.success('리뷰가 등록되었습니다.');
      router.push('/manage/purchase');
    },
    (error) => {
      // 실패 시 처리
      console.error('리뷰 등록 실패:', error);
      showToast.error('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    }
  );

  const handleSubmit = () => {
    if (!data || rating === 0) {
      showToast.warning('별점을 선택해주세요.');
      return;
    }

    if (reviewContent.trim().length < 10) {
      showToast.warning('리뷰 내용을 최소 10자 이상 작성해주세요.');
      return;
    }

    submitReview({
      contentId: data.contentId,
      reviewData: {
        rating,
        reviewContent: reviewContent.trim(),
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-body-1-normal text-label-alternative mb-4">
          구매 정보를 불러올 수 없습니다.
        </div>
        <div className="text-body-2-normal text-label-alternative">
          {error?.message || '잠시 후 다시 시도해주세요.'}
        </div>
      </div>
    );
  }

  return (
    <>
      <WebHeader mobileBack="back" />
      <div className="flex w-full flex-col items-center xs:px-5 xs:pt-5 bg-background-alternative min-h-[calc(100vh-66px)]">
        <div className="flex w-full max-w-[1080px] flex-col xs:gap-5 gap-2">
          {/* 구매 정보 카드 */}
          <div className="bg-white xs:rounded-xl pt-0 xs:pt-5 p-5">
            <PurchaseProductCard
              contentId={data.contentId}
              contentTitle={data.contentTitle}
              sellerName={data.sellerName}
              thumbnailUrl={data.thumbnailUrl}
              finalPrice={data.finalPrice}
              selectedOptionName={data.selectedOptionName ?? undefined}
              merchantUid={data.merchantUid}
              showButtons={false}
            />
          </div>

          {/* 리뷰 등록 폼 */}
          <div className="bg-white xs:rounded-xl px-5 py-8">
            {/* 별점 선택 */}
            <div className="">
              <h3 className="text-headline-1 text-label-normal mb-3 font-bold">
                콘텐츠에 만족하셨나요?
              </h3>
              <div className="flex flex-col  gap-3">
                <StarRating rating={rating} onRatingChange={setRating} />
                {rating > 0 && (
                  <div className="text-body-2-normal text-primary-sub-1">
                    {getRatingText(rating)}
                  </div>
                )}
              </div>
            </div>

            {/* 리뷰 내용 입력 */}
            <div className="mt-12">
              <h3 className="text-headline-1 text-label-normal mb-3 font-bold">
                구매한 콘텐츠가 어땠는지 작성해주세요
              </h3>
              <TextAreaTextField
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="최소 10자 이상 작성해주세요."
                maxLength={1000}
                rows={5}
                type="border"
              />
            </div>
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className="mt-auto pb-10 w-full flex justify-center px-5 xs:px-0 bg-white xs:bg-transparent">
          <Button
            onClick={handleSubmit}
            disabled={
              rating === 0 || reviewContent.trim().length < 10 || isSubmitting
            }
            className="max-w-[1080px] w-full"
            size="large"
            group="solid"
            type="primary"
          >
            {isSubmitting ? '등록 중...' : '완료'}
          </Button>
        </div>
      </div>
    </>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseReviewContent />
    </Suspense>
  );
}
