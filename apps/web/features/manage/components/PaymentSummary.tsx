import type { PurchaseDetailResponse } from '../types/purchaseTypes';

interface PaymentSummaryProps {
  data: PurchaseDetailResponse;
}

export default function PaymentSummary({ data }: PaymentSummaryProps) {
  const {
    originalPrice,
    discountPrice,
    finalPrice,
    payCardName,
    payType,
    orderStatus,
  } = data;

  const getPaymentMethod = () => {
    if (payCardName && payType) {
      return `${payCardName} / ${payType}`;
    }
    if (payCardName) {
      return payCardName;
    }
    if (payType) {
      return payType;
    }
    return '신용카드';
  };

  const isRefunded = orderStatus === 'CANCELLED' || orderStatus === 'REFUND';

  return (
    <div className="mt-3 bg-white p-5 xs:rounded-xl">
      <h3 className="text-headline-1 font-semibold text-label-normal">
        {isRefunded ? '환불 정보' : '결제 정보'}
      </h3>

      <hr className="my-3 border-line-normal" />

      <div className="space-y-2">
        {/* 주문금액 */}
        <div className="flex justify-between items-center">
          <span className="text-label-1-normal text-label-normal">
            주문금액
          </span>
          <span className="text-label-1-normal font-semibold text-label-normal">
            {originalPrice.toLocaleString('ko-KR')}
            <span className="font-medium">원</span>
          </span>
        </div>

        {/* 할인금액 (할인이 있을 때만 표시) */}
        <div className="flex justify-between items-center">
          <span className="text-label-1-normal text-label-normal">
            할인금액
          </span>
          <span className="text-label-1-normal font-semibold text-label-normal">
            - {discountPrice.toLocaleString('ko-KR')}
            <span className="font-medium">원</span>
          </span>
        </div>

        {/* 구분선 */}
        <hr className="border-line-alternative my-3" />

        {/* 총 결제/환불 금액 */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-body-1-normal font-semibold text-label-normal">
              총 {isRefunded ? '환불' : '결제'} 금액
            </div>
          </div>
          <div className=" flex flex-col items-end">
            <span className="text-body-1-normal font-bold text-primary-sub-1">
              {finalPrice.toLocaleString('ko-KR')}
              <span className="font-medium">원</span>
            </span>
            <div className="text-caption-1 text-label-alternative ">
              {isRefunded ? '환불' : '결제'} 수단: {getPaymentMethod()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
