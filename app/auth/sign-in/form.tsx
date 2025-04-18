"use client";

import Button, { buttonClassName } from "@/components/button";
import TextField from "@/components/text-field";
import { getFieldErrorMessage, useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { signInAction } from "./actions";

enum Stage {
  EMAIL = 0,
  PASSWORD = 1,
}

export default function SignInForm() {
  const [stage, setStage] = useState<Stage>(Stage.EMAIL);
  const [response, formAction, isPending] = useActionState(signInAction, null);
  useToastErrorMessage(response);
  const passwordRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (stage == Stage.PASSWORD) passwordRef.current?.focus();
  }, [stage]);

  return (
    <Form
      className="flex flex-col gap-5"
      action={formAction}
      onSubmit={(event) => {
        if (stage == Stage.EMAIL) {
          if (event.currentTarget.reportValidity()) {
            setStage(Stage.PASSWORD);
          }
        } else if (stage == Stage.PASSWORD) {
          const formData = new FormData(event.currentTarget);
          startTransition(() => formAction(formData));
        }
        event.preventDefault();
      }}
    >
      <h1 className="text-heading-1 font-semibold">로그인 하기</h1>
      <TextField
        name="email"
        inputType="email"
        placeholder="이메일"
        required
        autoFocus
        helperText={getFieldErrorMessage(response, "email")}
      />
      {stage >= Stage.PASSWORD && (
        <TextField
          ref={passwordRef}
          name="password"
          inputType="password"
          placeholder="비밀번호"
          required
          helperText={getFieldErrorMessage(response, "password")}
        />
      )}
      <Button size="small">
        {stage < Stage.PASSWORD ? "다음" : isPending ? "⏳" : "로그인"}
      </Button>
      <Link
        className={buttonClassName({ group: "text", type: "tertiary" })}
        href="/users/password/reset"
      >
        비밀번호를 잊으셨나요?
      </Link>
    </Form>
  );
}
