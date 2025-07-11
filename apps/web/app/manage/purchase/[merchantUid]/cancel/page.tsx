'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import PurchaseProductCard from '@/features/manage/components/PurchaseProductCard';
import PaymentSummary from '@/features/manage/components/PaymentSummary';
import { usePurchaseDetail } from '@/features/manage/hooks/usePurchaseDetail';

function PurchaseCancelContent() {
  const params = useParams();
  const merchantUid = params.merchantUid as string;

  const { data, isLoading, isError, error } = usePurchaseDetail(merchantUid);

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
        <div className="flex w-full max-w-[1080px] flex-col">
          <div className="bg-white xs:rounded-xl pt-0 xs:pt-5 p-5">
            {/* 구매 카드 - 버튼 없이 정보만 표시 */}
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
        </div>
      </div>
    </>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseCancelContent />
    </Suspense>
  );
}
