"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import { useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import Image from "next/image";
import { useActionState } from "react";
import { agreeMakerTermsAction } from "./actions";
import check from "./check.png";

export default function PhoneCompleteForm() {
  const [response, formAction] = useActionState(agreeMakerTermsAction, null);
  useToastErrorMessage(response);

  return (
    <Form action={formAction}>
      <Image src={check} alt="" width={200} />
      <div>
        <h1 className="text-title-3 font-bold">완료하셨나요?</h1>
        <p className="text-body-2-normal font-medium text-label-alternative">
          아래 버튼을 눌러 인증을 완료해주세요
        </p>
      </div>
      <BottomArea narrow>
        <BottomButton>완료</BottomButton>
      </BottomArea>
    </Form>
  );
}
