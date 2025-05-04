"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import { PasswordTextField } from "@/components/text-field";
import Form from "next/form";
import { startTransition, useActionState } from "react";
import { setPasswordAction } from "./actions";

export default function PasswordForm({}) {
  const [, formAction, isPending] = useActionState(
    setPasswordAction,
    undefined,
  );

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
        사용할 비밀번호를 입력해주세요
      </h1>
      <PasswordTextField />
      <BottomArea>
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </BottomArea>
    </Form>
  );
}
