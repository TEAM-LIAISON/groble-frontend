import BottomArea, { BottomButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import Form from "next/form";
import { saveThumbnailAction } from "./actions";
import Draft, { formId } from "./draft";
import Guidelines from "./guidelines";
import ImageFileField from "./image-file-field";
import Indicator from "./indicator";

export default async function ThumbnailPage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} right={<Draft />} />
        <Indicator current={1} />
        <Form
          id={formId}
          action={saveThumbnailAction}
          className="mx-5 flex flex-col gap-5"
        >
          <h1 className="mt-5 text-heading-1 font-semibold">대표 이미지</h1>
          <section className="flex flex-col gap-2">
            <ImageFileField
              fileInputName="thumbnail"
              urlInputName="thumbnail-url"
            />
            <div className="text-label-1-normal font-medium text-label-alternative">
              <p>* 670 x 376px</p>
              <p>* 10MB 이하의 PNG, JPG 파일을 업로드 해주세요</p>
            </div>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="text-body-1-normal font-semibold">
              이미지 가이드 라인
            </h2>
            <Guidelines>
              <li>
                판매를 위해 심사가 진행될 예정이에요. 누락된 내용은 없는지
                확인해 주세요.
              </li>
              <li>심사 진행 중에는 내용을 수정할 수 없어요.</li>
              <li>심사는 영업일 기준 3 ~ 5일 소요돼요.</li>
              <li>
                심사가 거절될 경우 사유를 전달 드리며, 재심사를 요청할 수
                있어요.
              </li>
              <li>
                심사가 승인되면, 판매 관리 &gt; 판매 내역을 통해 판매를 시작할
                수 있어요.
              </li>
              <li>문의사항은 마이페이지에서 채널톡으로 문의해 주세요.</li>
            </Guidelines>
          </section>
          <BottomArea>
            <BottomButton>다음</BottomButton>
          </BottomArea>
        </Form>
      </div>
    </div>
  );
}
