"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import { LinkButton } from "@/components/button";
import Popover from "@/components/popover";
import TextField from "@/components/text-field";
import { getFieldErrorMessage, useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { updateNicknameAction } from "./actions";

export default function NicknameForm({ nickname }: { nickname?: string }) {
  const [response, formAction, isPending] = useActionState(
    updateNicknameAction,
    null,
  );
  useToastErrorMessage(response);
  const popoverRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (response?.status === 200) popoverRef.current?.showPopover();
  }, [response]);

  return (
    <>
      <Form
        className="group flex flex-col gap-5"
        action={formAction}
        onSubmit={(event) => {
          const formData = new FormData(event.currentTarget);
          startTransition(() => formAction(formData));
          event.preventDefault();
        }}
      >
        <h1 className="text-heading-1 font-semibold">
          새로운 닉네임을 알려주세요
        </h1>
        <p className="text-body-2-normal font-medium text-label-alternative">
          가입 후에도 수정할 수 있어요
        </p>
        <TextField
          name="nickname"
          placeholder={nickname ?? "닉네임"}
          required
          pattern="^[가-힣a-zA-Z0-9]{2,15}$"
          autoFocus
          helperText={
            getFieldErrorMessage(response, "nickname") ??
            "2-15자 이내로 입력해주세요"
          }
        />
        <BottomArea>
          <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
        </BottomArea>
      </Form>
      <Popover>
        <div className="flex flex-col justify-center gap-5">
          <div className="text-headline-1 font-bold text-label-normal">
            닉네임을 변경했습니다.
          </div>
          <div className="flex gap-2">
            <LinkButton
              size="small"
              href="/users/me/settings"
              className="flex-1"
            >
              돌아가기
            </LinkButton>
          </div>
        </div>
      </Popover>
    </>
  );
}
