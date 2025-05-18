import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import Radio from "@/components/radio";
import { TextAreaTextField } from "@/components/text-field";
import { Metadata } from "next";
import Image from "next/image";
import appleIcon from "../../../apple-icon.png";

export const metadata: Metadata = {
  title: "결제 취소",
};

export default function ContentPage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />
        <ContentSummary />
        <div className="my-[20px] border-t-[6px] border-line-alternative" />
        <section className="mx-[20px]">
          <h2 className="text-heading-1 font-semibold">
            취소 사유를 알려주세요
          </h2>
          <div className="h-[20px]" />
          <div className="flex flex-col gap-1">
            <label className="my-2 flex items-center gap-2 text-body-2-normal font-medium">
              <Radio name="a" /> 다른 결제수단으로 결제할게요
            </label>
            <label className="my-2 flex items-center gap-2 text-body-2-normal font-medium">
              <Radio name="a" /> 마음이 바뀌었어요
            </label>
            <label className="my-2 flex items-center gap-2 text-body-2-normal font-medium">
              <Radio name="a" /> 더 저렴한 콘텐츠를 찾았어요
            </label>
            <label className="my-2 flex items-center gap-2 text-body-2-normal font-medium">
              <Radio name="a" /> 기타
            </label>
            <TextAreaTextField placeholder="상세 사유를 적어주세요" rows={5} />
          </div>
        </section>
        <BottomArea>
          <BottomLinkButton href="/contents/1/cancel-complete">
            결제 취소
          </BottomLinkButton>
        </BottomArea>
      </div>
    </div>
  );
}

function ContentSummary() {
  return (
    <section className="mx-[20px] flex items-center gap-3">
      <div className="relative aspect-square h-[80px] rounded-4">
        <Image src={appleIcon} alt="" className="object-cover" fill />
      </div>
      <div>
        <h1 className="line-clamp-2 text-body-1-normal font-semibold">
          제목 제목 제목 제목 제목 제목 제목 제목 제목 제목 제목 제목 제목
        </h1>
        <div className="text-label-1-normal font-semibold text-label-alternative">
          김로블
        </div>
      </div>
    </section>
  );
}
