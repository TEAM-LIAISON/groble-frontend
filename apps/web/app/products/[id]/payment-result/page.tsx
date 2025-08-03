'use client';

import WebHeader from '@/components/(improvement)/layout/header';
import InquiryModal from '@/features/manage/components/InquiryModal';
import { fetchPaymentResult } from '@/features/products/payment/api/payment-api';
import PaymentPriceInformation from '@/features/products/payment/components/payment-price-Information';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { Button, LinkButton } from '@groble/ui';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function PaymentResultPage() {
  const searchParams = useSearchParams();

  // 문의하기 모달 상태
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // URL query string에서 merchantUid 가져오기
  const merchantUid = searchParams.get('merchantUid');

  const { data, isLoading } = useQuery({
    queryKey: ['paymentResult', merchantUid],
    queryFn: () => fetchPaymentResult(merchantUid!),
    enabled: !!merchantUid,
    staleTime: 0,
  });
  const orderData = data?.data;

  // 문의하기 버튼 핸들러 - PurchaseProductCard와 동일한 로직
  const handleInquiry = () => {
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="bg-background-alternative">
      <WebHeader mobileBack="back" />
      <div className="flex w-full flex-col items-center bg-background-alternative min-h-[calc(100vh-66px)] md:px-0 px-5">
        <div className="flex w-full max-w-[1080px] flex-col items-center">
          <h1 className="text-title-3 md:text-title-2 font-bold text-label-normal md:mt-9">
            <span className="text-primary-sub-1">결제완료</span> 됐어요
          </h1>

          {isLoading ? (
            <div className="mt-20">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* 결제 정보 카드 */}
              <div className="p-5 bg-white rounded-xl w-full mt-6 flex flex-col">
                <p className="text-body-2-normal md:text-headline-1 font-semibold border-label-normal">
                  No.{orderData?.merchantUid}
                </p>
                <hr className="border-line-normal mt-2" />

                <div className="mt-4 flex gap-4">
                  <div className="relative w-[157px] h-[118px] rounded-[0.37rem]">
                    <Image
                      src={orderData?.contentThumbnailUrl || ''}
                      alt="thumbnail"
                      fill
                    />
                  </div>
                  <div className="flex flex-col gap-[0.12rem] justify-center">
                    <p className="text-label-1-normal font-semibold text-label-alternative">
                      {orderData?.sellerName || '그로블'}
                    </p>
                    <p className="text-body-1-normal text-label-normal font-semibold md:line-clamp-2 line-clamp-1">
                      {orderData?.contentTitle}
                    </p>
                    <p className="text-label-1-normal text-label-alternative">
                      {orderData?.optionName || '옵션이름'}
                    </p>
                    <p className="text-body-1-normal text-label-normal font-bold">
                      {orderData?.finalPrice || 0}
                      <span className="font-medium">원</span>
                    </p>
                  </div>
                </div>
                <Button
                  className="mt-4"
                  group="solid"
                  type="secondary"
                  size="x-small"
                  onClick={handleInquiry}
                >
                  문의하기
                </Button>
              </div>

              {/* 기존 주문 정보 */}
              {orderData && (
                <div className="mt-3 w-full">
                  <PaymentPriceInformation
                    orderAmount={orderData.originalPrice || 0}
                    discountAmount={orderData.discountPrice || 0}
                    totalAmount={orderData.finalPrice || 0}
                  />
                </div>
              )}
            </>
          )}
        </div>
        {/* 하단 버튼 영역 */}
        <div className="mt-10 md:mt-auto mb-10 w-full lg:w-[1080px] flex justify-center">
          <LinkButton
            group="solid"
            type="primary"
            size="large"
            className="w-full"
            href={`/manage/purchase/${merchantUid}`}
          >
            내 컨텐츠 보기
          </LinkButton>
        </div>
      </div>

      {/* 문의하기 모달 */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        merchantUid={merchantUid || ''}
      />
    </div>
  );
}
