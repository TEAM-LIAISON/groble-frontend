import BottomArea, { BottomButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import TextField from "@/components/text-field";
import Form from "next/form";
import { saveBasicInformationAction } from "./actions";
import Draft, { formId } from "./draft";
import Indicator from "./indicator";

export default async function BasicInformationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} right={<Draft />} />
      <Indicator current={2} />
      <Form
        id={formId}
        action={saveBasicInformationAction}
        className="mx-5 flex flex-col gap-5"
      >
        <h1 className="mt-5 text-heading-1 font-semibold">기본 정보</h1>
        <div className="flex flex-col gap-2">
          <div className="text-body-1-normal font-semibold">콘텐츠 이름</div>
          <TextField name="target" placeholder="30자 이내로 입력해주세요" />
        </div>
        <BottomArea>
          <BottomButton>다음</BottomButton>
        </BottomArea>
      </Form>
    </div>
  );
}
