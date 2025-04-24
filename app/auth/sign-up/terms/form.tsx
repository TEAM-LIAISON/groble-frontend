"use client";

import { BottomButton } from "@/components/button";
import Checkbox from "@/components/checkbox";
import Form from "next/form";
import Link from "next/link";
import {
  ChangeEventHandler,
  ReactNode,
  Ref,
  RefObject,
  useActionState,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";
import { UrlObject } from "url";
import { agreeToTermsAction } from "./actions";

export default function TermsForm({
  userType,
}: {
  userType: "SELLER" | "BUYER";
}) {
  const agreeAllRef = useRef<HTMLInputElement>(null);
  const [, formAction, isPending] = useActionState(
    agreeToTermsAction,
    undefined,
  );

  return (
    <Form className="flex flex-col gap-5" action={formAction}>
      <h1 className="text-heading-1 font-semibold">
        서비스 이용약관에
        <br />
        동의해주세요
      </h1>
      <div className="flex flex-col gap-2">
        <Item
          ref={agreeAllRef}
          className="font-semibold"
          onChange={() => onAgreeAllChange(agreeAllRef)}
        >
          약관 전체 동의
        </Item>
        <div className="border-t border-line-normal" />
        <Item
          name="terms-type"
          value="AGE_POLICY"
          href="#"
          onChange={() => onPolicyChange(agreeAllRef)}
        >
          [필수] 만 14세 이상 확인 동의
        </Item>
        {userType == "SELLER" && (
          <Item
            name="terms-type"
            value="SELLER_TERMS_POLICY"
            onChange={() => onPolicyChange(agreeAllRef)}
          >
            [필수] 판매자 이용약관 동의
          </Item>
        )}
        <Item
          name="terms-type"
          value="PRIVACY_POLICY"
          href="#"
          onChange={() => onPolicyChange(agreeAllRef)}
        >
          [필수] 개인정보 수집 및 이용 동의
        </Item>
        <Item
          name="terms-type"
          value="SERVICE_TERMS_POLICY"
          href="#"
          onChange={() => onPolicyChange(agreeAllRef)}
        >
          [필수] 서비스 이용약관 동의
        </Item>
        <Item
          name="terms-type"
          value="SALES_TERMS_POLICY"
          href="#"
          onChange={() => onPolicyChange(agreeAllRef)}
        >
          [필수] 판매 이용약관 동의
        </Item>
        <Item
          name="terms-type"
          value="MARKETING_POLICY"
          onChange={() => onPolicyChange(agreeAllRef)}
        >
          [선택] 마케팅 활용 동의
        </Item>
        <Item
          name="terms-type"
          value="ADVERTISING_POLICY"
          onChange={() => onPolicyChange(agreeAllRef)}
        >
          [선택] 광고성 정보 수신 동의
        </Item>
      </div>
      <div className="fixed right-0 bottom-0 left-0 flex flex-col">
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </div>
    </Form>
  );
}

function onAgreeAllChange(agreeAllRef: RefObject<HTMLInputElement | null>) {
  if (!agreeAllRef.current) return;
  if (!agreeAllRef.current.form) return;

  const checked = agreeAllRef.current.checked;
  agreeAllRef.current.form.querySelectorAll("input").forEach((input) => {
    input.checked = checked;
  });
}

function onPolicyChange(agreeAllRef: RefObject<HTMLInputElement | null>) {
  if (!agreeAllRef.current) return;
  if (!agreeAllRef.current.form) return;

  const everyChecked = Array.from(
    agreeAllRef.current.form.querySelectorAll('input[name$="-policy"]'),
  ).every((input) => (input as HTMLInputElement).checked);
  agreeAllRef.current.checked = everyChecked;
}

function Item({
  name,
  value,
  className,
  ref,
  href,
  onChange,
  children,
}: {
  name?: string;
  value?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
  href?: string | UrlObject;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
}) {
  return (
    <label
      className={twMerge(
        "flex items-center gap-2 py-2 text-body-2-normal font-medium",
        className,
      )}
    >
      <Checkbox ref={ref} name={name} value={value} onChange={onChange} />
      <span className="flex-1">{children}</span>
      {href && (
        <Link href={href}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.22618 5.0425C8.91832 5.35941 8.92566 5.86589 9.24257 6.17375L15.0685 11.8332L9.2264 17.8423C8.91842 18.1591 8.92555 18.6655 9.24234 18.9735C9.55913 19.2815 10.0656 19.2744 10.3736 18.9576L16.7736 12.3747C16.9215 12.2226 17.003 12.0178 16.9999 11.8056C16.9969 11.5934 16.9097 11.3911 16.7574 11.2432L10.3574 5.0261C10.0405 4.71824 9.53404 4.72558 9.22618 5.0425Z"
              fill="#C2C4C8"
            />
          </svg>
        </Link>
      )}
    </label>
  );
}
