import { LinkButton } from "@/components/button";
import Header, { Back } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "결제 취소 완료",
};

export default function CancelSuccessPage() {
  return (
    <>
      <Header left={<Back />} />
      <div className="flex flex-col items-center p-12">
        <svg
          width="159"
          height="158"
          viewBox="0 0 159 158"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="79.1719" cy="79" r="79" fill="#D9D9D9" />
        </svg>
        <div className="h-5" />
        <h1 className="text-heading-1 font-bold">취소가 완료됐어요</h1>
        <div className="text-body-2-normal font-medium text-label-alternative">
          둘러보러 가볼까요?
        </div>
        <div className="h-7" />
        <LinkButton size="x-small" href="/">
          홈으로 가기
        </LinkButton>
      </div>
      <div className="border-t-[6px] border-line-alternative" />
      <PaymentInformation />
    </>
  );
}

function PaymentInformation() {
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
