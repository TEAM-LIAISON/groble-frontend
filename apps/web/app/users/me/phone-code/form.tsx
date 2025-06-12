"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import { Button } from "@groble/ui";
import { BottomText } from "@groble/ui";
import { getFieldErrorMessage, useToastErrorMessage } from "@/lib/error";
import { OTPInput, SlotProps } from "input-otp";
import Form from "next/form";
import { startTransition, useActionState } from "react";
import { twJoin } from "tailwind-merge";
import { authPhoneNumberAction } from "../phone-request/actions";
import { verifyPhoneNumberAction } from "./actions";

export default function PhoneCodeForm({
  phoneNumber,
}: {
  phoneNumber: string;
}) {
  const [response, formAction, isPending] = useActionState(
    verifyPhoneNumberAction,
    null,
  );
  useToastErrorMessage(response);
  const [authPhoneNumberResponse, resendAction, isResendPending] =
    useActionState(authPhoneNumberAction, null);
  useToastErrorMessage(authPhoneNumberResponse);

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
      <input type="hidden" name="phone-number" value={phoneNumber} />
      <div className="flex flex-col">
        <h1 className="text-heading-1 font-semibold md:font-bold">
          인증코드를 입력해주세요
        </h1>
        <p className="text-body-2-normal font-medium text-label-alternative">
          <span className="text-label-normal">{phoneNumber}</span>로 문자를
          보냈어요
        </p>
      </div>
      <OTPInput
        name="verification-code"
        containerClassName={twJoin("group has-disabled:opacity-30")}
        autoFocus
        required
        maxLength={4}
        minLength={4}
        render={({ slots }) => (
          <>
            <div className="grid grid-cols-4 gap-2.5">
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
      <BottomArea narrow>
        <div className="text-center text-body-2-normal font-medium">
          문자가 오지 않았나요?
          <Button
            group="text"
            size="x-small"
            className="px-1"
            buttonType="button"
            onClick={() =>
              startTransition(async () => {
                const formData = new FormData();
                formData.append("phone-number", phoneNumber);
                await resendAction(formData);
              })
            }
          >
            {isResendPending ? "⏳" : "재전송하기"}
          </Button>
        </div>
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </BottomArea>
    </Form>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={twJoin(
        "relative flex aspect-square h-full w-full items-center justify-center rounded-8 bg-background-alternative text-heading-1 font-bold",
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
      {/* <div className="h-px w-8 bg-label-normal" /> */}
    </div>
  );
}
