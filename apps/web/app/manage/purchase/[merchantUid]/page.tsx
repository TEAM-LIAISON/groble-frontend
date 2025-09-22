'use client';

import { Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import NavigationBar from '@/components/navigation-bar';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import PurchaseProductCard from '@/features/manage/components/PurchaseProductCard';
import PaymentSummary from '@/features/manage/components/PaymentSummary';
import ReviewCard from '@/features/manage/components/ReviewCard';
import { usePurchaseDetail } from '@/features/manage/hooks/usePurchaseDetail';
import { Button } from '@groble/ui';

function PurchaseDetailContent() {
  const params = useParams();
  const router = useRouter();
  const merchantUid = params.merchantUid as string;

  const { data, isLoading, isError, error } = usePurchaseDetail(merchantUid);

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case 'PAID':
        return '결제완료';
      case 'CANCELLED':
        return '환불완료';
      case 'CANCEL_REQUEST':
        return '결제취소';
      default:
        return '';
    }
  };

  const handleDownload = () => {
    if (data?.documentOptionActionUrl) {
      // 파일 다운로드를 위해 새 탭에서 열기
      window.open(data.documentOptionActionUrl, '_blank');
    }
  };

  const handleReviewEdit = (reviewId: number) => {
    router.push(
      `/manage/purchase/${merchantUid}/review?mode=edit&reviewId=${reviewId}`
    );
  };

  const handleReviewDelete = () => {
    // 리뷰 삭제는 ReviewCard 내부에서 처리하므로 별도 작업 불필요
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
        <div className="flex w-full max-w-[1080px] flex-col xs:gap-3 gap-2">
          <div className="bg-white xs:rounded-xl pt-0 xs:pt-5  p-5">
            <h1 className="text-headline-1 font-semibold text-label-normal">
              {getOrderStatusText(data.orderStatus)}
            </h1>

            <hr className="my-3 border-line-normal" />

            {/* 구매 카드 */}
            <PurchaseProductCard data={data} />
          </div>

          {/* 리뷰카드(리뷰가 있을시에) */}
          {data.myReview && (
            <ReviewCard
              review={data.myReview}
              merchantUid={merchantUid}
              onEdit={
                data.orderStatus === 'CANCELLED' || data.orderStatus === 'REFUND' ? handleReviewEdit : undefined
              }
              onDelete={handleReviewDelete}
            />
          )}

          {/* 결제 금액 */}
          <PaymentSummary data={data} />
        </div>
        {/* 파일 다운로드 버튼 */}
        {data.documentOptionActionUrl && data.orderStatus === 'PAID' && (
          <div className="mt-auto mb-10 w-full max-w-[1080px] md:px-0 px-5">
            <Button
              onClick={handleDownload}
              group="solid"
              size="large"
              type="primary"
              className="w-full"
            >
              다운로드
            </Button>
          </div>
        )}
      </div>
      {/* <NavigationBar /> */}
    </>
  );
}

export default function PurchaseDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseDetailContent />
    </Suspense>
  );
}
