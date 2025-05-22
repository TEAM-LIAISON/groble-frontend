"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import Radio from "@/components/radio";
import { TextAreaTextField } from "@/components/text-field";
import { useToastErrorMessage } from "@/lib/error";
import { useUserStore } from "@/lib/store/useUserStore";
import { twMerge } from "@/lib/tailwind-merge";
import Form from "next/form";
import { ReactNode, startTransition, useActionState, useEffect } from "react";
import { logoutAction } from "../settings/actions";
import { withdrawUserAction } from "./actions";

export default function AgreeToTermsForm() {
  const [response, formAction] = useActionState(withdrawUserAction, null);
  const userStore = useUserStore();

  useToastErrorMessage(response);
  useEffect(() => {
    if (response?.status == 200) {
      startTransition(async () => {
        await userStore.logout();
        await logoutAction();
      });
    }
  }, [response]);

  return (
    <Form
      className="flex flex-col gap-5"
      action={formAction}
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        startTransition(async () => formAction(formData));
        event.preventDefault();
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-heading-1 font-semibold">정말로 탈퇴하시겠어요?</h1>
        <p className="text-body-2-normal font-medium text-label-alternative">
          탈퇴하시면 저장된 정보들이 모두 사라져요
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Item name="reason" value="NOT_USING">
          서비스를 잘 이용하지 않아요
        </Item>
        <Item name="reason" value="INCONVENIENT">
          서비스 이용이 불편해요
        </Item>
        <Item name="reason" value="LACKS_CONTENT">
          필요한 기능이나 콘텐츠가 없어요
        </Item>
        <Item name="reason" value="BAD_EXPERIENCE">
          불쾌한 경험을 겪었어요
        </Item>
        <Item name="reason" value="COST_BURDEN">
          가격 및 비용이 부담돼요
        </Item>
        <Item name="reason" value="OTHER">
          기타
        </Item>
        <TextAreaTextField name="reason" placeholder="상세 사유를 적어주세요" />
      </div>
      <BottomArea>
        <BottomButton>탈퇴하기</BottomButton>
      </BottomArea>
    </Form>
  );
}

function Item({
  name,
  value,
  className,
  children,
}: {
  name?: string;
  value?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <label
      className={twMerge(
        "flex items-center gap-2 py-2 text-body-2-normal font-medium",
        className,
      )}
    >
      <Radio name={name} value={value} />
      <span className="flex-1">{children}</span>
    </label>
  );
}
