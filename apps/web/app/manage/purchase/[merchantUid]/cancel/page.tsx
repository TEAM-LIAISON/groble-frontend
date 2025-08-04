'use client';

import { Suspense, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import PurchaseProductCard from '@/features/manage/components/PurchaseProductCard';
import CancelReasonForm from '@/features/manage/components/CancelReasonForm';
import { usePurchaseDetail } from '@/features/manage/hooks/usePurchaseDetail';
import { usePaymentCancel } from '@/features/manage/hooks/usePaymentCancel';
import { Button } from '@groble/ui';
import type { PaymentCancelRequest } from '@/features/manage/types/purchaseTypes';

function PurchaseCancelContent() {
  const params = useParams();
  const router = useRouter();
  const merchantUid = params.merchantUid as string;

  const [cancelData, setCancelData] = useState<PaymentCancelRequest | null>(
    null
  );

  const { data, isLoading, isError, error } = usePurchaseDetail(merchantUid);

  const { mutate: cancelPayment, isLoading: isCanceling } = usePaymentCancel(
    (response) => {
      // 성공 시 처리

      // TODO: 성공 메시지 표시 또는 페이지 이동
      alert('결제 취소가 완료되었습니다.');
      router.push('/manage/purchase');
    },
    (error) => {
      // 실패 시 처리
      console.error('결제 취소 실패:', error);
      alert('결제 취소에 실패했습니다. 다시 시도해주세요.');
    }
  );

  const handleCancelSubmit = () => {
    if (cancelData) {
      cancelPayment({ merchantUid, cancelData });
    }
  };

  const handleFormChange = useCallback((data: PaymentCancelRequest | null) => {
    setCancelData(data);
  }, []);

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
        <div className="flex w-full max-w-[1080px] flex-col gap-5">
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

          {/* 취소 사유 선택 폼 */}
          <div className="bg-white xs:rounded-xl px-5 py-8">
            <CancelReasonForm onChange={handleFormChange} />
          </div>
        </div>
        {/* 취소 버튼 */}
        <div className="mt-auto mb-10 w-full flex justify-center">
          <Button
            onClick={handleCancelSubmit}
            disabled={!cancelData || isCanceling}
            className="max-w-[1080px] w-full"
            size="large"
            group="solid"
            type="primary"
          >
            {isCanceling ? '처리 중...' : '결제 취소'}
          </Button>
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
