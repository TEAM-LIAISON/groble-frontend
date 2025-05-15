export default function PaymentInformation() {
  return (
    <section className="flex flex-col px-5 pt-6">
      <h2 className="text-heading-1 font-semibold">결제 정보</h2>
      <div className="h-4" />
      <dl className="grid grid-cols-2 gap-2">
        <dt className="justify-self-start text-label-1-normal font-medium">
          주문 금액
        </dt>
        <dd className="justify-self-end text-label-1-normal font-semibold">
          60,000<span className="font-medium">원</span>
        </dd>
        <dt className="justify-self-start text-label-1-normal font-medium">
          할인 금액
        </dt>
        <dd className="justify-self-end text-label-1-normal font-semibold">
          -30,000<span className="font-medium">원</span>
        </dd>
      </dl>
      <div className="my-3 border-t border-line-normal" />
      <dl className="grid grid-cols-2 gap-2">
        <dt className="justify-self-start text-body-1-normal font-semibold">
          총 결제 금액
        </dt>
        <dd className="justify-self-end text-body-1-normal font-semibold text-primary-sub-1">
          30,000<span className="font-semibold">원</span>
        </dd>
      </dl>
      <div className="text-right text-label-1-normal font-medium text-label-alternative">
        신용카드 (롯데카드/일시불)
      </div>
    </section>
  );
}
