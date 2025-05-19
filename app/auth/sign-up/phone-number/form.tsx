"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import TextField from "@/components/text-field";
import { getFieldErrorMessage, useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import { startTransition, useActionState } from "react";
import { setPhoneNumberAction } from "./actions";

export default function PhoneForm() {
  const [response, formAction, isPending] = useActionState(
    setPhoneNumberAction,
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
      <h1 className="text-heading-1 font-semibold">휴대폰 번호를 알려주세요</h1>
      <p className="text-body-2-normal font-medium text-label-alternative">
        가입 후에도 수정할 수 있어요
      </p>
      <TextField
        name="phone-number"
        placeholder="010-1234-5678"
        inputType="tel"
        required
        autoFocus
        helperText={getFieldErrorMessage(response, "phoneNumber")}
      />
      <BottomArea>
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </BottomArea>
    </Form>
  );
}
