"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import { TextField } from "@groble/ui";
import { getFieldErrorMessage, useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import { startTransition, useActionState } from "react";
import { sendEmailVerificationForSignUpAction } from "./actions";

export default function EmailForm({ email }: { email?: string }) {
  const [response, formAction, isPending] = useActionState(
    sendEmailVerificationForSignUpAction,
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
      <h1 className="text-heading-1 font-semibold md:font-bold">
        이메일을 입력해주세요
      </h1>
      <TextField
        name="email"
        inputType="email"
        placeholder="이메일"
        defaultValue={email}
        required
        autoFocus
        helperText={getFieldErrorMessage(response, "email")}
      />
      <BottomArea narrow>
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </BottomArea>
    </Form>
  );
}
