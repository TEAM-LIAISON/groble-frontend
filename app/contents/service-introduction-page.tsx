import BottomArea, { BottomButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import { TextAreaTextField } from "@/components/text-field";
import Form from "next/form";
import { saveServiceIntroductionAction } from "./actions";
import Draft, { formId } from "./draft";
import Indicator from "./indicator";

export default async function ServiceIntroductionPage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} right={<Draft />} />
        <Indicator current={4} />
        <Form
          id={formId}
          action={saveServiceIntroductionAction}
          className="mx-5 flex flex-col gap-5"
        >
          <h1 className="mt-5 text-heading-1 font-semibold">서비스 소개</h1>
          <div className="flex flex-col gap-2">
            <TextAreaTextField
              name="target"
              rows={6}
              placeholder="관련 경력이나 이력, 경험 등을 적어주세요."
            />
          </div>
          <BottomArea>
            <BottomButton>다음</BottomButton>
          </BottomArea>
        </Form>
      </div>
    </div>
  );
}
