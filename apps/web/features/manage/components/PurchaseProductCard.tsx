import Image from 'next/image';
import type { PurchaseProductCardProps } from '../types/purchaseTypes';
import { Button } from '@groble/ui';

export default function PurchaseProductCard({
  data,
}: PurchaseProductCardProps) {
  const {
    merchantUid,
    purchasedAt,
    cancelledAt,
    cancelReason,
    contentId,
    contentTitle,
    sellerName,
    selectedOptionName,
    selectedOptionQuantity,
    finalPrice,
    orderStatus,
    isRefundable,
    thumbnailUrl,
  } = data;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handleInquiry = () => {
    // TODO: 문의하기 기능 구현
    console.log('문의하기 클릭');
  };

  const handleRefund = () => {
    // TODO: 구매 취소 기능 구현
    console.log('구매 취소 클릭');
  };

  const handleReview = () => {
    // TODO: 리뷰 작성 기능 구현
    console.log('리뷰 작성 클릭');
  };

  const isPaid = orderStatus === 'PAID';
  const isCanceled = orderStatus === 'CANCELLED' || orderStatus === 'REFUND';

  return (
    <div className="bg-white ">
      {/* 주문번호와 날짜 */}
      <div className="flex justify-between items-center">
        <div className="text-caption-1 text-label-alternative font-semibold">
          No.{merchantUid} • {formatDate(purchasedAt)}
          {isCanceled && cancelledAt && (
            <span className="ml-2">결제 • {formatDate(cancelledAt)} 취소</span>
          )}
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="flex gap-4 mt-2 items-center">
        {/* 썸네일 */}
        <div className="relative w-[9.81rem] h-[7.37rem] rounded-[0.37rem] bg-gray-50">
          <Image
            src={thumbnailUrl ?? ''}
            alt={contentTitle}
            fill
            className="object-cover rounded-[0.37rem]"
          />
        </div>

        {/* 상품 상세 정보 */}
        <div className="flex-1 min-w-0">
          <div className="text-label-1-normal text-label-alternative font-semibold">
            {sellerName}
          </div>
          <h3 className="text-body-1-normal font-semibold text-label-normal line-clamp-2 mt-[0.12rem]">
            {contentTitle}
          </h3>
          <div className="text-label-1-normal text-label-alternative mt-[0.12rem]">
            {selectedOptionName || '기본 옵션'}
          </div>
          <div className="text-body-1-normal font-bold text-label-normal mt-[0.12rem]">
            {finalPrice.toLocaleString('ko-KR')}
            <span className="font-medium">원</span>
          </div>
        </div>
      </div>

      {/* 하단 버튼 또는 취소 사유 */}
      <div className="mt-5 space-y-3">
        {isPaid ? (
          /* 결제완료 상태: 버튼들 표시 */
          <>
            {isRefundable ? (
              /* 구매 취소가 가능할 때: 구매취소|리뷰작성 + 문의하기 */
              <>
                {/* 첫 번째 줄: 구매 취소 | 리뷰 작성 */}
                <div className="flex gap-3">
                  <Button
                    group="outlined"
                    onClick={handleRefund}
                    className="w-full"
                    size="x-small"
                    type="tertiary"
                  >
                    결제 취소
                  </Button>
                  <Button
                    onClick={handleReview}
                    group="solid"
                    size="x-small"
                    type="tertiary"
                    className="w-full"
                  >
                    리뷰 작성하기
                  </Button>
                </div>

                {/* 두 번째 줄: 문의하기 */}
                <div className="flex">
                  <Button
                    onClick={handleInquiry}
                    group="solid"
                    size="x-small"
                    type="secondary"
                    className="w-full"
                  >
                    문의하기
                  </Button>
                </div>
              </>
            ) : (
              /* 구매 취소가 불가능할 때: 문의하기|리뷰작성 */
              <div className="flex gap-3 w-full">
                <Button
                  onClick={handleInquiry}
                  group="solid"
                  size="x-small"
                  type="secondary"
                  className="w-full"
                >
                  문의하기
                </Button>
                <Button
                  onClick={handleReview}
                  group="solid"
                  type="tertiary"
                  size="x-small"
                  className="w-full text-primary-sub-1"
                >
                  리뷰 작성하기
                </Button>
              </div>
            )}
          </>
        ) : isCanceled && cancelReason ? (
          /* 결제취소 상태: 취소사유 표시 */
          <div className="bg-background-alternative p-4 rounded-lg">
            <div className="text-body-2-normal font-semibold text-label-normal">
              취소 사유: {cancelReason}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
