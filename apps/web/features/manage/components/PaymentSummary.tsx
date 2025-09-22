import { InfoCircledIcon } from '@radix-ui/react-icons';
import type { PurchaseDetailResponse } from '../types/purchaseTypes';
import InfoTooltip from '@/components/ui/InfoTooltip';

interface PaymentSummaryProps {
  data: PurchaseDetailResponse;
}

export default function PaymentSummary({ data }: PaymentSummaryProps) {
  const {
    originalPrice,
    discountPrice,
    finalPrice,
    payCardName,
    payCardNum,
    orderStatus,
  } = data;

  const isRefunded = orderStatus === 'CANCELLED' || orderStatus === 'REFUND';

  return (
    <div className=" bg-white p-5 xs:rounded-xl">
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
            <div className="text-body-1-normal font-semibold text-label-normal flex items-center gap-1">
              <span>총 {isRefunded ? '환불' : '결제'} 금액</span>
              {isRefunded && (
                <InfoTooltip
                  text="결제 취소 후 환불까지는 3~7 영업일 정도 소요됩니다."
                  direction="right"
                />
              )}
            </div>
          </div>
          <div className=" flex flex-col items-end">
            <span className="text-body-1-normal font-bold text-primary-sub-1">
              {finalPrice.toLocaleString('ko-KR')}
              <span className="font-medium">원</span>
            </span>
            <div className="text-caption-1 text-label-alternative ">
              {payCardName} ({payCardNum?.slice(-4)})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
