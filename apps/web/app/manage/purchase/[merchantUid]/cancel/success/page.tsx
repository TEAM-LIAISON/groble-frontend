'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getPurchaseDetail } from '@/features/manage/api/purchaseApi';
import { Button } from '@groble/ui';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import Image from 'next/image';
import Link from 'next/link';

export default function CancelRequestSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const merchantUid = params.merchantUid as string;

  // 구매 상세 정보 조회
  const { data, isLoading, isError } = useQuery({
    queryKey: ['purchaseDetail', merchantUid],
    queryFn: () => getPurchaseDetail(merchantUid),
    enabled: !!merchantUid,
    staleTime: 0,
  });

  const purchaseData = data?.data;

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-alternative">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
          <p className="text-body-1-normal text-label-alternative">
            취소 정보를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (isError || !purchaseData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-alternative">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="에러 아이콘">
              <title>에러 아이콘</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-heading-2 font-bold text-label-normal">
            취소 정보를 불러올 수 없습니다
          </h1>
          <p className="text-body-1-normal text-label-alternative">
            잠시 후 다시 시도해주세요.
          </p>
          <Button
            onClick={() => router.back()}
            group="solid"
            type="primary"
            size="small"
          >
            이전 페이지로
          </Button>
        </div>
      </div>
    );
  }

  // 환불 금액 계산
  const refundAmount = purchaseData.originalPrice;
  const discountAmount = purchaseData.discountPrice || 0;
  const totalRefundAmount = purchaseData.finalPrice;

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <Image src="/assets/icons/success.png" alt="success" width={200} height={200} className='mb-6' />
        <div className="text-center mb-8">
          <h1 className="text-title-3 font-bold text-label-normal mb-2">
            취소 요청이 접수됐어요
          </h1>
          <p className="text-body-1-normal text-label-alternative">
            콘텐츠 제공 단계에 따라 취소 승인 여부가 결정됩니다.
          </p>
        </div>
        <div className="w-full max-w-[480px] bg-background-alternative rounded-xl p-5 mb-10">
          <h3 className="text-headline-1 font-semibold text-label-normal">
            예상 환불 내역
          </h3>
          <hr className="border-line-normal my-3" />
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-label-1-normal font-medium text-label-normal">
                환불 상품 금액
              </span>
              <span className="text-label-1-normal font-semibold text-label-normal">
                {refundAmount.toLocaleString()}원
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-label-1-normal font-medium text-label-normal">
                  할인금액
                </span>
                <span className="text-label-1-normal font-semibold text-label-normal">
                  - {discountAmount.toLocaleString()}원
                </span>
              </div>
            )}
            <hr className="border-line-alternative my-3" />
            <div className="flex justify-between items-center">
              <span className="text-body-1-normal font-semibold text-label-normal">
                총 환불 금액
              </span>
              <span className="text-body-1-normal font-bold text-primary-sub-1">
                {totalRefundAmount.toLocaleString()}원
              </span>
            </div>
          </div>
          <div className="text-sm text-label-alternative text-right">
            <span>{purchaseData.payCardName} ({purchaseData.payCardNum?.slice(-4)})</span>
          </div>
        </div>
        <div className="w-full max-w-[480px]">
          <Link href="/manage/purchase" className="block">
            <Button
              className="w-full"
              size="large"
              group="solid"
              type="primary"
            >
              홈으로 가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
