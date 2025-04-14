"use client";

import Button from "@/components/button";
import TextField from "@/components/text-field";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { signInAction } from "./actions";
import google from "./google.svg";
import kakao from "./kakao.png";
import naver from "./naver.png";

enum Stage {
  EMAIL = 0,
  PASSWORD = 1,
}

export default function SignIn() {
  const formRef = useRef<HTMLFormElement>(null);
  const [stage, setStage] = useState<Stage>(Stage.EMAIL);
  const [response, formAction, isPending] = useActionState(signInAction, null);
  const searchParams = useSearchParams();
  const [redirectURI, setRedirectURI] = useState(
    searchParams.get("redirect-uri"),
  );

  useEffect(() => {
    if (!redirectURI) setRedirectURI(location.origin);
  }, []);

  return (
    <div className="flex flex-col gap-8 p-5">
      {isPending && <div>isPending</div>}
      <div>{JSON.stringify(response?.data)}</div>
      <Form
        ref={formRef}
        className="flex flex-col gap-5"
        action={formAction}
        onSubmit={(event) => {
          if (stage == Stage.EMAIL) {
            if (formRef.current?.reportValidity()) setStage(Stage.PASSWORD);
            event.preventDefault();
          }
        }}
      >
        <h1 className="text-heading-1 font-semibold">로그인 하기</h1>
        <TextField
          name="email"
          inputType="email"
          placeholder="이메일"
          required
          autoFocus
        />
        {stage >= Stage.PASSWORD && (
          <TextField
            name="password"
            inputType="password"
            placeholder="비밀번호"
            required
          />
        )}
        <Button size="small">
          {stage < Stage.PASSWORD ? "다음" : "로그인"}
        </Button>
        <Button group="text" type="tertiary">
          비밀번호를 잊으셨나요?
        </Button>
      </Form>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-stretch gap-4">
          <span className="grow border-t border-line-normal" />
          <span className="text-body-2-normal font-medium text-[#9DA3AB]">
            OR
          </span>
          <span className="grow border-t border-line-normal" />
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href={`https://api.dev.groble.im/api/v1/oauth2/authorize?redirect_uri=${encodeURIComponent(redirectURI)}&provider=google`}
            className="grid cursor-pointer grid-cols-[1fr_max-content_1fr] border border-line-normal px-4 py-3"
          >
            <Image src={google} alt="Google" width={24} height={24} />
            <span>구글로 계속하기</span>
          </Link>
          <Link
            href={`https://api.dev.groble.im/api/v1/oauth2/authorize?redirect_uri=${encodeURIComponent(redirectURI)}&provider=naver`}
            className="grid cursor-pointer grid-cols-[1fr_max-content_1fr] border border-line-normal px-4 py-3"
          >
            <Image src={naver} alt="Google" width={24} height={24} />
            <span>네이버로 계속하기</span>
          </Link>
          <Link
            href={`https://api.dev.groble.im/api/v1/oauth2/authorize?redirect_uri=${encodeURIComponent(redirectURI)}&provider=kakao`}
            className="grid cursor-pointer grid-cols-[1fr_max-content_1fr] border border-line-normal px-4 py-3"
          >
            <Image src={kakao} alt="Google" width={24} height={24} />
            <span>카카오톡으로 계속하기</span>
          </Link>
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <div className="text-center text-body-2-normal font-medium text-label-alternative">
          회원이 아니신가요?
          <Button group="text" size="x-small">
            회원가입 하기
          </Button>
        </div>
      </section>
    </div>
  );
}
