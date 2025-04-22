import Header, { Back } from "@/components/header";
import { Content } from "../page";

export default function ContentPage() {
  return (
    <>
      <Header left={<Back />} />
      <section className="flex justify-between px-5 text-label-1-normal font-semibold text-label-alternative">
        <span>No.1234567</span>
        <span>2025. 12. 5.</span>
      </section>
      <Content className="mt-3 mb-6" />
      <div className="border-t-[6px] border-line-alternative" />
      <PaymentInformation />
    </>
  );
}

function PaymentInformation() {
  return (
    <section className="flex flex-col gap-2 px-5 pt-6">
      <h2>결제 정보</h2>
      <dl>
        <dt>주문 금액</dt>
        <dd>60,000원</dd>
        <dt>할인 금액</dt>
        <dd>-30,000원</dd>
      </dl>
      <dl>
        <dt>총 결제 금액</dt>
        <dd>
          30,000원 <span>신용카드(롯데카드) 일시불</span>
        </dd>
      </dl>
    </section>
  );
}
