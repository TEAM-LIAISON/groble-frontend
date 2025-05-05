import BottomArea, { BottomButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import TextField from "@/components/text-field";
import Form from "next/form";
import { saveDetailsAction } from "./actions";
import Draft, { draftFormId } from "./draft";
import Indicator from "./indicator";

export default async function DetailsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} right={<Draft />} />
      <Indicator current={5} />
      <Form
        id={draftFormId}
        action={saveDetailsAction}
        className="mx-5 flex flex-col gap-[12px]"
      >
        <h1 className="mx-5 mt-5 text-heading-1 font-semibold">상세 설명</h1>
        <div className="flex flex-col gap-2">
          <div className="text-body-1-normal font-semibold">서비스 타깃</div>
          <TextField name="target" placeholder="예비 및 초기 창업가" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-body-1-normal font-semibold">제공 절차</div>
          <TextField name="target" placeholder="즉시 다운로드 가능해요" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-body-1-normal font-semibold">메이커 소개</div>
          <TextField name="target" placeholder="관련 경력 및 나이, 경험" />
        </div>
        <BottomArea>
          <BottomButton>다음</BottomButton>
        </BottomArea>
      </Form>
    </div>
  );
}
