import BottomArea, { BottomButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import RadioFieldSet, { RadioButton } from "@/components/radio-field-set";
import Select from "@/components/select";
import TextField from "@/components/text-field";
import Form from "next/form";
import { saveBasicInformationAction } from "./actions";
import Draft, { formId } from "./draft";
import Indicator from "./indicator";

export default async function BasicInformationPage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
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
            <TextField
              name="title"
              placeholder="30자 이내로 입력해주세요"
              maxLength={30}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-body-1-normal font-semibold">콘텐츠 유형</div>
            <RadioFieldSet>
              <RadioButton name="content-type" value="DOCUMENT">
                자료
              </RadioButton>
              <RadioButton name="content-type" value="COACHING">
                코칭
              </RadioButton>
            </RadioFieldSet>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-body-1-normal font-semibold">카테고리</div>
            <Select name="category-id" placeholder="카테고리를 선택해주세요">
              <option value="CATEGORY_1">카테고리 1</option>
              <option value="CATEGORY_2">카테고리 2</option>
              <option value="CATEGORY_3">카테고리 3</option>
              <option value="CATEGORY_4">카테고리 4</option>
            </Select>
          </div>
          <BottomArea>
            <BottomButton>다음</BottomButton>
          </BottomArea>
        </Form>
      </div>
    </div>
  );
}
