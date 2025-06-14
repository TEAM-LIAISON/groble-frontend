"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import { PasswordTextField } from "@groble/ui";
import { useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import { startTransition, useActionState } from "react";
import { resetPasswordAction } from "./actions";

export default function ResetPasswordForm({ token }: { token: string }) {
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
      <h1 className="text-heading-1 font-semibold md:font-bold">
        사용할 비밀번호를 입력해주세요
      </h1>
      <PasswordTextField name="new-password" />
      <BottomArea narrow>
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </BottomArea>
    </Form>
  );
}
