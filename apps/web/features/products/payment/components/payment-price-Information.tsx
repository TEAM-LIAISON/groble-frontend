interface PaymentPriceInformationProps {
  orderAmount: number;
  discountAmount: number;
  totalAmount: number;
}

export default function PaymentPriceInformation({
  orderAmount,
  discountAmount,
  totalAmount,
}: PaymentPriceInformationProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  return (
    <div className="flex flex-col rounded-xl bg-white p-5">
      <h2 className="text-headline-1 font-semibold text-label-normal">
        결제 정보
      </h2>
      <hr className="my-3 border-line-normal" />

      <div className="flex w-full justify-between">
        <p className="text-label-1-normal text-label-normal">주문금액</p>
        <p className="flex text-label-1-normal font-semibold text-label-normal">
          {formatPrice(orderAmount)}
          <span className="font-medium">원</span>
        </p>
      </div>
      <div className="mt-2 flex w-full justify-between">
        <p className="text-label-1-normal text-label-normal">할인금액</p>
        <p className="flex text-label-1-normal font-semibold text-label-normal">
          - {formatPrice(discountAmount)}
          <span className="font-medium">원</span>
        </p>
      </div>

      <hr className="my-3 border-line-alternative" />

      <div className="flex w-full justify-between">
        <p className="text-label-1-normal text-label-normal">총 결제 금액</p>
        <p className="flex text-body-1-normal font-bold text-primary-sub-1">
          {formatPrice(totalAmount)}
          <span className="font-semibold">원</span>
        </p>
      </div>

      <p className="text-caption-1 text-label-assistive">VAT 포함</p>
    </div>
  );
}
