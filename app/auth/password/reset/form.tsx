"use client";

import { BottomButton } from "@/components/button";
import { PasswordTextField } from "@/components/text-field";
import { useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import { startTransition, useActionState } from "react";
import { resetPasswordAction } from "./actions";

export default function PasswordForm({ token }: { token: string }) {
  const [response, formAction, isPending] = useActionState(
    resetPasswordAction,
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
      <input type="hidden" name="token" value={token} />
      <h1 className="text-heading-1 font-semibold">
        사용할 비밀번호를 입력해주세요
      </h1>
      <PasswordTextField />
      <div className="fixed right-0 bottom-0 left-0 flex flex-col">
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </div>
    </Form>
  );
}
