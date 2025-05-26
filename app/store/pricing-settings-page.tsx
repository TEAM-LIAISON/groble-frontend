import BottomArea, { BottomButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import TextField from "@/components/text-field";
import Form from "next/form";
import { savePricingSettingsAction } from "./actions";
import Draft, { formId } from "./draft";
import Indicator from "./indicator";

export default async function PricingSettingsPage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} right={<Draft />} />
        <Indicator current={3} />
        <Form
          id={formId}
          action={savePricingSettingsAction}
          className="mx-5 flex flex-col gap-5"
        >
          <h1 className="mt-5 text-heading-1 font-semibold">가격 설정</h1>
          <div className="flex flex-col gap-2">
            <div className="text-body-1-normal font-semibold">옵션 1</div>
            <TextField name="target" placeholder="사업계획서 컨설팅 1회" />
          </div>
          <BottomArea>
            <BottomButton>다음</BottomButton>
          </BottomArea>
        </Form>
      </div>
    </div>
  );
}
