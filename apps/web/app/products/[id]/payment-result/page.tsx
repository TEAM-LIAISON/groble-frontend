'use client';

import BottomArea, { BottomLinkButton } from '@/components/bottom-area';
import { Button } from '@groble/ui';
import { fetchPaymentResult } from '@/features/products/payment/api/payment-api';
import PaymentPriceInformation from '@/features/products/payment/components/payment-price-Information';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';

export default function PaymentResultPage() {
  const params = useParams();
  const id = params?.id;
  const searchParams = useSearchParams();

  // 페이플이 결제 완료 후 전송하는 파라미터들 (공식 문서 기준)
  const PCD_PAY_RST = searchParams.get('PCD_PAY_RST'); // 결과 (success/error)
  const PCD_PAY_CODE = searchParams.get('PCD_PAY_CODE'); // 응답 코드
  const PCD_PAY_MSG = searchParams.get('PCD_PAY_MSG'); // 응답 메시지
  const PCD_PAY_OID = searchParams.get('PCD_PAY_OID'); // 주문번호
  const PCD_PAY_TYPE = searchParams.get('PCD_PAY_TYPE'); // 결제수단
  const PCD_PAY_WORK = searchParams.get('PCD_PAY_WORK'); // 결제요청 방식
  const PCD_PAYER_NAME = searchParams.get('PCD_PAYER_NAME'); // 결제자 이름
  const PCD_PAY_GOODS = searchParams.get('PCD_PAY_GOODS'); // 상품명
  const PCD_PAY_TOTAL = searchParams.get('PCD_PAY_TOTAL'); // 결제금액
  const PCD_PAY_TIME = searchParams.get('PCD_PAY_TIME'); // 결제완료 시간

  // 간편페이 관련 파라미터
  const PCD_PAY_METHOD = searchParams.get('PCD_PAY_METHOD'); // 결제 방법
  const PCD_EASY_PAY_METHOD = searchParams.get('PCD_EASY_PAY_METHOD'); // 간편페이 상세 유형

  const { data } = useQuery({
    queryKey: ['paymentResult', PCD_PAY_OID],
    queryFn: () => fetchPaymentResult(PCD_PAY_OID!),
    enabled: !!PCD_PAY_OID,
    staleTime: 0,
  });
  const orderData = data?.data;
  console.log(orderData);

  // 결제 방법 이름 변환
  const getPaymentMethodName = () => {
    switch (PCD_PAY_METHOD) {
      case 'naverPay':
        return '네이버페이';
      case 'kakaoPay':
        return '카카오페이';
      case 'appCard':
        return '앱카드';
      default:
        return '카드';
    }
  };

  // 결제 상세 유형 표시
  const getPaymentDetailType = () => {
    if (!PCD_EASY_PAY_METHOD) return '';

    switch (PCD_EASY_PAY_METHOD) {
      case 'card':
        return ' (카드)';
      case 'point':
        return ' (포인트/머니)';
      default:
        return '';
    }
  };

  return (
    <div className="flex w-full flex-col items-center bg-background-normal pb-10">
      <div className="flex w-full max-w-[1250px] flex-col gap-6 px-5 pt-9 sm:px-8 lg:px-12">
        {/* 성공 헤더 */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-heading-1 font-bold text-label-normal">
              결제가 완료되었습니다
            </h1>
            <p className="mt-2 text-body-1-normal text-label-alternative">
              주문번호: {PCD_PAY_OID}
            </p>
          </div>
        </div>

        {/* 결제 정보 카드 */}
        <div className="rounded-xl bg-white p-6">
          <h2 className="mb-4 text-headline-1 font-semibold text-label-normal">
            결제 정보
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-body-2-normal text-label-alternative">
                결제 방법
              </span>
              <span className="text-body-2-bold text-label-normal">
                {getPaymentMethodName()}
                {getPaymentDetailType()}
              </span>
            </div>

            {PCD_PAY_TIME && (
              <div className="flex justify-between">
                <span className="text-body-2-normal text-label-alternative">
                  결제 일시
                </span>
                <span className="text-body-2-normal text-label-normal">
                  {PCD_PAY_TIME}
                </span>
              </div>
            )}

            {PCD_PAYER_NAME && (
              <div className="flex justify-between">
                <span className="text-body-2-normal text-label-alternative">
                  결제자명
                </span>
                <span className="text-body-2-normal text-label-normal">
                  {PCD_PAYER_NAME}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 기존 주문 정보 */}
        {orderData && (
          <PaymentPriceInformation
            orderAmount={orderData.originalPrice || 0}
            discountAmount={orderData.discountPrice || 0}
            totalAmount={orderData.finalPrice || 0}
          />
        )}

        {/* 안내 메시지 */}
        <div className="rounded-xl bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 mt-0.5">
              <svg
                className="h-3 w-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-body-2-bold text-blue-800">
                {PCD_PAY_METHOD === 'naverPay' || PCD_PAY_METHOD === 'kakaoPay'
                  ? '간편페이 결제 완료'
                  : '카드 결제 완료'}
              </p>
              <p className="mt-1 text-caption-1 text-blue-600">
                구매하신 콘텐츠는 마이페이지에서 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <BottomArea className="mt-10">
        <BottomLinkButton href="/manage/purchase">
          구매내역 확인
        </BottomLinkButton>
        <BottomLinkButton href="/">홈으로</BottomLinkButton>
      </BottomArea>
    </div>
  );
}
