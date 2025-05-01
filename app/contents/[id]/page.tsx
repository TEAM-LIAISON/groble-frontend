import { LinkButton } from "@/components/button";
import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import Content from "./content";
import PaymentInformation from "./payment-information";

export const metadata: Metadata = {
  title: "콘텐츠",
};

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
      <div className="fixed right-0 bottom-0 left-0 flex flex-col">
        <LinkButton href="/contents/1/cancel">결제 취소</LinkButton>
      </div>
    </>
  );
}
