"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import TextField from "@/components/text-field";
import { getFieldErrorMessage, useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import { startTransition, useActionState } from "react";
import { sendEmailVerificationForChangeEmailAction } from "./actions";

export default function EmailForm({ email }: { email?: string }) {
  const [response, formAction, isPending] = useActionState(
    sendEmailVerificationForChangeEmailAction,
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
        변경할 이메일을 입력해주세요
      </h1>
      <TextField
        name="email"
        inputType="email"
        placeholder={email ?? "이메일"}
        required
        autoFocus
        helperText={getFieldErrorMessage(response, "email")}
      />
      <BottomArea>
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </BottomArea>
    </Form>
  );
}
