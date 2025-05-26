"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import TextField from "@/components/text-field";
import { getFieldErrorMessage, useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import { startTransition, useActionState } from "react";
import { updateNicknameAction } from "./actions";

export default function NicknameForm({ nickname }: { nickname?: string }) {
  const [response, formAction, isPending] = useActionState(
    updateNicknameAction,
    null,
  );
  useToastErrorMessage(response);

  return (
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
      <BottomArea narrow>
        <BottomButton>{isPending ? "⏳" : "완료"}</BottomButton>
      </BottomArea>
    </Form>
  );
}
