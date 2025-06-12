"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import { TextField } from "@groble/ui";
import { getFieldErrorMessage, useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import { ChangeEvent, startTransition, useActionState, useState } from "react";
import { setPhoneNumberAction } from "./actions";

export default function PhoneForm() {
  const [response, formAction, isPending] = useActionState(
    setPhoneNumberAction,
    null,
  );
  useToastErrorMessage(response);

  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    let digits = event.currentTarget.value.replace(/\D/g, "");

    if (digits.length > 11) {
      digits = digits.substring(0, 11);
    }

    let formatted = "";
    if (digits.length > 0) {
      if (digits.length <= 3) {
        formatted = digits;
      } else if (digits.length <= 7) {
        formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
      } else {
        formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
      }
    }
    setPhoneNumber(formatted);
  };

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
        휴대폰 번호를 알려주세요
      </h1>
      <p className="text-body-2-normal font-medium text-label-alternative">
        가입 후에도 수정할 수 있어요
      </p>
      <TextField
        name="phone-number"
        placeholder="010-1234-5678"
        inputType="tel"
        required
        autoFocus
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        maxLength={13}
        helperText={
          getFieldErrorMessage(response, "phoneNumber") ??
          "010-0000-0000 형식으로 입력해주세요"
        }
      />
      <BottomArea narrow>
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </BottomArea>
    </Form>
  );
}
