"use client";

import { useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import { startTransition, useActionState } from "react";
import { agreeToTermsAction } from "./actions";

export default function AgreeToTermsForm() {
  const [response, formAction, isPending] = useActionState(
    agreeToTermsAction,
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
        서비스 이용약관에
        <br />
        동의해주세요
      </h1>
    </Form>
  );
}
