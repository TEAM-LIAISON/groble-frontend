"use client";

import Button, { BottomButton } from "@/components/button";
import { BottomText } from "@/components/text-field";
import { getFieldErrorMessage, useToastErrorMessage } from "@/lib/error";
import { twJoin } from "@/lib/tailwind-merge";
import { OTPInput, SlotProps } from "input-otp";
import Form from "next/form";
import { startTransition, useActionState } from "react";
import {
  sendEmailVerificationForSignUpAction,
  verifyEmailCodeAction,
} from "./actions";

export default function VerifyEmailCodeForm({ email }: { email: string }) {
  const [response, formAction, isPending] = useActionState(
    verifyEmailCodeAction,
    null,
  );
  useToastErrorMessage(response);
  const [sendEmailVerificationResponse, action] = useActionState(
    sendEmailVerificationForSignUpAction,
    null,
  );
  useToastErrorMessage(sendEmailVerificationResponse);

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
      <input type="hidden" name="email" value={email} />
      <div className="flex flex-col">
        <h1 className="text-heading-1 font-semibold">
          인증코드를 입력해주세요
        </h1>
        <p className="text-body-2-normal font-medium text-label-alternative">
          <span className="text-label-normal">{email}</span>로 메일을 보냈어요
        </p>
      </div>
      <OTPInput
        name="verification-code"
        containerClassName={twJoin(
          "group flex items-center justify-center has-disabled:opacity-30",
        )}
        autoFocus
        required
        maxLength={4}
        minLength={4}
        render={({ slots }) => (
          <>
            <div className="flex items-center justify-center gap-2.5">
              {slots.map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>
          </>
        )}
      />
      <BottomText
        helperText={getFieldErrorMessage(response, "verificationCode")}
      />
      <div className="fixed right-0 bottom-0 left-0 flex flex-col">
        <div className="text-center text-body-2-normal font-medium">
          메일이 오지 않았나요?
          <Button
            group="text"
            size="x-small"
            className="px-1"
            buttonType="button"
            onClick={() => startTransition(() => action(email))}
          >
            재전송하기
          </Button>
        </div>
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </div>
    </Form>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={twJoin(
        "relative flex h-[76px] w-[76px] items-center justify-center rounded-8 bg-background-alternative text-heading-1 font-bold",
        props.isActive && "outline-[1.5px] -outline-offset-[1.5px]",
      )}
    >
      <div className="group-has-[input[data-input-otp-placeholder-shown]]:opacity-20">
        {props.char ?? props.placeholderChar}
      </div>
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="pointer-events-none absolute inset-4 flex items-end justify-center">
      <div className="h-px w-8 bg-label-normal" />
    </div>
  );
}
