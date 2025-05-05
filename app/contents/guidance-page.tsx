import BottomArea, { BottomButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import Form from "next/form";
import { registerContentAction } from "./actions";
import { draftFormId } from "./draft";

export default async function GuidancePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <Form id={draftFormId} action={registerContentAction}>
        <h1 className="mx-5 mt-5 text-heading-1 font-semibold">
          심사 진행 안내
        </h1>
        <div className="h-[12px]" />
        <div className="mx-5 rounded-8 bg-background-alternative px-[12px] py-[24px] text-label-1-normal font-medium">
          <ul className="list-disc space-y-3 pl-5">
            <li>
              판매를 위해 심사가 진행 될 예정이에요. 누락된 내용은 없는지 확인해
              주세요.
            </li>
            <li>심사 진행 중에는 내용을 수정할 수 없어요.</li>
            <li>심사는 영업일 기준 3~5일 소요돼요.</li>
            <li>
              심사가 거절될 경우 사유를 전달 드리며, 재심사를 요청할 수 있어요.
            </li>
            <li>
              심사가 승인되면, 판매 관리 &gt; 판매 내역을 통해 판매를 시작할 수
              있어요.
            </li>
            <li>문의사항은 마이페이지에서 채널톡으로 문의해 주세요.</li>
          </ul>
        </div>
        <BottomArea>
          <BottomButton>심사 요청</BottomButton>
        </BottomArea>
      </Form>
    </div>
  );
}
