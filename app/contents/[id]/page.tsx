import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import Content from "./content";
import PaymentInformation from "./payment-information";

export const metadata: Metadata = {
  title: "콘텐츠",
};

export default function ContentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <section className="flex justify-between px-5 text-label-1-normal font-semibold text-label-alternative">
        <span>No.1234567</span>
        <span>2025. 12. 5.</span>
      </section>
      <Content className="mt-3 mb-6" />
      <div className="border-t-[6px] border-line-alternative" />
      <PaymentInformation />
      <BottomArea>
        <BottomLinkButton href="/contents/1/cancel">결제 취소</BottomLinkButton>
      </BottomArea>
    </div>
  );
}
