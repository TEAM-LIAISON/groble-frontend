"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import Form from "next/form";
import { useActionState } from "react";
import { registerContentAction } from "./actions";
import { formId } from "./draft";
import Guidelines from "./guidelines";

export default function ReviewProcessInformationForm() {
  const [, formAction] = useActionState(registerContentAction, null);

  return (
    <Form id={formId} action={formAction} className="mx-5 flex flex-col gap-5">
      <h1 className="mt-5 text-heading-1 font-semibold md:font-bold">
        심사 진행 안내
      </h1>
      <Guidelines>
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
      </Guidelines>
      <BottomArea>
        <BottomButton>심사 요청</BottomButton>
      </BottomArea>
    </Form>
  );
}
