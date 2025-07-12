import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type {
  PurchaseProductCardProps,
  FlexiblePurchaseProductCardProps,
} from '../types/purchaseTypes';
import { Button } from '@groble/ui';
import InquiryModal from './InquiryModal';

// Union 타입으로 두 방식 모두 지원
type PurchaseProductCardPropsUnion =
  | PurchaseProductCardProps
  | FlexiblePurchaseProductCardProps;

// 타입 가드 함수
function isDataProps(
  props: PurchaseProductCardPropsUnion
): props is PurchaseProductCardProps {
  return 'data' in props;
}

export default function PurchaseProductCard(
  props: PurchaseProductCardPropsUnion
) {
  const router = useRouter();

  // props에서 실제 사용할 값들 추출
  const {
    contentId,
    contentTitle,
    sellerName,
    thumbnailUrl,
    finalPrice,
    selectedOptionName,
    selectedOptionQuantity,
    showOrderInfo = true,
    merchantUid,
    purchasedAt,
    cancelledAt,
    showButtons = true,
    orderStatus,
    isRefundable,
    cancelReason,
    myReview,
    onInquiry,
    onRefund,
    onReview,
  } = isDataProps(props)
    ? {
        // 기존 data 방식에서 값 추출
        contentId: props.data.contentId,
        contentTitle: props.data.contentTitle,
        sellerName: props.data.sellerName,
        thumbnailUrl: props.data.thumbnailUrl,
        finalPrice: props.data.finalPrice,
        selectedOptionName: props.data.selectedOptionName,
        selectedOptionQuantity: props.data.selectedOptionQuantity,
        showOrderInfo: true,
        merchantUid: props.data.merchantUid,
        purchasedAt: props.data.purchasedAt,
        cancelledAt: props.data.cancelledAt,
        showButtons: true,
        orderStatus: props.data.orderStatus,
        isRefundable: props.data.isRefundable,
        cancelReason: props.data.cancelReason,
        myReview: props.data.myReview,
        onInquiry: undefined,
        onRefund: undefined,
        onReview: undefined,
      }
    : {
        // 새로운 개별 props 방식
        contentId: props.contentId,
        contentTitle: props.contentTitle,
        sellerName: props.sellerName,
        thumbnailUrl: props.thumbnailUrl,
        finalPrice: props.finalPrice,
        selectedOptionName: props.selectedOptionName,
        selectedOptionQuantity: props.selectedOptionQuantity,
        showOrderInfo: props.showOrderInfo ?? true,
        merchantUid: props.merchantUid,
        purchasedAt: props.purchasedAt,
        cancelledAt: props.cancelledAt,
        showButtons: props.showButtons ?? true,
        orderStatus: props.orderStatus,
        isRefundable: props.isRefundable,
        cancelReason: props.cancelReason,
        myReview: props.myReview,
        onInquiry: props.onInquiry,
        onRefund: props.onRefund,
        onReview: props.onReview,
      };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const handleInquiry = () => {
    if (onInquiry) {
      onInquiry();
    } else {
      setIsInquiryModalOpen(true);
    }
  };

  const handleRefund = () => {
    if (onRefund) {
      onRefund();
    } else {
      // 결제 취소 페이지로 라우팅
      router.push(`/manage/purchase/${merchantUid}/cancel`);
    }
  };

  const handleReview = () => {
    if (onReview) {
      onReview();
    } else {
      // myReview가 있으면 편집 모드, 없으면 신규 등록 모드
      if (myReview) {
        router.push(
          `/manage/purchase/${merchantUid}/review?mode=edit&reviewId=${myReview.reviewId}`
        );
      } else {
        router.push(`/manage/purchase/${merchantUid}/review`);
      }
    }
  };

  const isPaid = orderStatus === 'PAID';
  const isCanceled = orderStatus === 'CANCELLED' || orderStatus === 'REFUND';

  // 리뷰 버튼 텍스트 결정
  const reviewButtonText = myReview ? '리뷰 수정하기' : '리뷰 작성하기';

  return (
    <div className="bg-white">
      {/* 주문번호와 날짜 (showOrderInfo가 true일 때만 표시) */}
      {showOrderInfo && merchantUid && purchasedAt && (
        <div className="flex justify-between items-center">
          <div className="text-caption-1 text-label-alternative font-semibold">
            No.{merchantUid} • {formatDate(purchasedAt)}
            {isCanceled && cancelledAt && (
              <span className="ml-2">
                결제 • {formatDate(cancelledAt)} 취소
              </span>
            )}
          </div>
        </div>
      )}

      {/* 상품 정보 */}
      <div
        className={`flex gap-4 xs:items-center flex-col xs:flex-row ${
          showOrderInfo ? 'mt-2' : ''
        }`}
      >
        {/* 썸네일 */}
        <div className="relative aspect-[4/3] w-full h-full xs:w-[9.81rem] xs:h-[7.37rem] rounded-[0.37rem] bg-background-alternative">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={contentTitle}
              fill
              className="object-cover rounded-[0.37rem]"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-label-1-normal text-label-alternative font-semibold">
                썸네일 데이터 오류
              </div>
            </div>
          )}
        </div>

        {/* 상품 상세 정보 */}
        <div className="flex-1 min-w-0">
          <div className="text-label-1-normal text-label-alternative font-semibold">
            {sellerName}
          </div>
          <h3 className="text-body-1-normal font-semibold text-label-normal line-clamp-2 mt-[0.12rem]">
            {contentTitle}
          </h3>
          {selectedOptionName && (
            <div className="text-label-1-normal text-label-alternative mt-[0.12rem]">
              {selectedOptionName}
            </div>
          )}
          <div className="text-body-1-normal font-bold text-label-normal mt-[0.12rem]">
            {finalPrice.toLocaleString('ko-KR')}
            <span className="font-medium">원</span>
          </div>
        </div>
      </div>

      {/* 하단 버튼 또는 취소 사유 (showButtons가 true일 때만 표시) */}
      {showButtons && (
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
                      {reviewButtonText}
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
                    {reviewButtonText}
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
      )}

      {/* 문의하기 모달 (기존 data 방식일 때만 표시) */}
      {isDataProps(props) && (
        <InquiryModal
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          merchantUid={merchantUid || ''}
        />
      )}
    </div>
  );
}
