'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import NavigationBar from '@/components/navigation-bar';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import PurchaseProductCard from '@/features/manage/components/PurchaseProductCard';
import PaymentSummary from '@/features/manage/components/PaymentSummary';
import { usePurchaseDetail } from '@/features/manage/hooks/usePurchaseDetail';
import { Button } from '@groble/ui';

function PurchaseDetailContent() {
  const params = useParams();
  const merchantUid = params.merchantUid as string;

  const { data, isLoading, isError, error } = usePurchaseDetail(merchantUid);
  console.log(data);

  const handleDownload = () => {
    if (data?.documentOptionActionUrl) {
      // 파일 다운로드를 위해 새 탭에서 열기
      window.open(data.documentOptionActionUrl, '_blank');
    }
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
      <div className="flex w-full flex-col items-center  bg-background-alternative min-h-[calc(100vh-66px)]">
        <div className="flex w-full max-w-[1080px] flex-col md:pt-9">
          <div className="bg-white md:rounded-xl pt-0 md:pt-5 p-5">
            <h1 className="text-headline-1 font-semibold text-label-normal">
              {data.orderStatus === 'PAID'
                ? '결제완료'
                : data.orderStatus === 'CANCELLED'
                ? '결제취소'
                : '환불완료'}
            </h1>

            <hr className="my-3 border-line-normal" />

            {/* 구매 카드 */}
            <PurchaseProductCard data={data} />
          </div>

          {/* 결제 금액 */}
          <PaymentSummary data={data} />
        </div>
        {/* 파일 다운로드 버튼 */}
        {data.documentOptionActionUrl && data.orderStatus === 'PAID' && (
          <div className="mt-auto mb-10 w-full max-w-[1080px]">
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
