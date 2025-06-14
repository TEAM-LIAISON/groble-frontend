"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import { TextField } from "@groble/ui";
import { getFieldErrorMessage, useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { setNicknameAction } from "./actions";

export default function NicknameForm() {
  const [response, formAction, isPending] = useActionState(
    setNicknameAction,
    null,
  );
  useToastErrorMessage(response);
  useEffect(() => {
    if (response?.status == 200 && response.data?.data?.duplicated) {
      toast("중복된 닉네임입니다. 다른 닉네임을 입력해주세요.");
    }
  }, [response]);

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
      <h1 className="text-heading-1 font-semibold md:font-bold">
        닉네임을 알려주세요
      </h1>
      <p className="text-body-2-normal font-medium text-label-alternative">
        가입 후에도 수정할 수 있어요
      </p>
      <TextField
        name="nickname"
        placeholder="닉네임"
        required
        pattern="^[가-힣a-zA-Z0-9]{2,15}$"
        autoFocus
        helperText={
          getFieldErrorMessage(response, "nickname") ??
          "2-15자 이내로 입력해주세요"
        }
      />
      <BottomArea narrow>
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </BottomArea>
    </Form>
  );
}
