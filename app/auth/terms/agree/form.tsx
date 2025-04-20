"use client";

import Checkbox from "@/components/checkbox";
import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { UrlObject } from "url";

export default function AgreeToTermsForm() {
  return (
    <div
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h1 className="text-heading-1 font-semibold">
        서비스 이용약관에
        <br />
        동의해주세요
      </h1>
      <div className="flex flex-col gap-2">
        <Item className="font-semibold">약관 전체동의</Item>
        <div className="border-t border-line-normal" />
        <Item name="a" href="#" onClick={() => toast("준비중입니다.")}>
          [필수] 만 14세 이상입니다.
        </Item>
        <Item name="b" href="#" onClick={() => toast("준비중입니다.")}>
          [필수] 개인정보 수집 및 이용 동의
        </Item>
        <Item name="c" href="#" onClick={() => toast("준비중입니다.")}>
          [필수] 서비스 이용약관 동의
        </Item>
        <Item name="d" href="#" onClick={() => toast("준비중입니다.")}>
          [필수] 판매 이용약관 동의
        </Item>
        <Item name="e">[필수] 마케팅 활용 동의</Item>
        <Item name="f">[필수] 광고성 정보 수신 동의</Item>
      </div>
    </div>
  );
}

function Item({
  name,
  className,
  href,
  onClick,
  children,
}: {
  name?: string;
  className?: string;
  href?: string | UrlObject;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children?: ReactNode;
}) {
  return (
    <label
      className={twMerge(
        "flex items-center gap-2 py-2 text-body-2-normal font-medium",
        className,
      )}
    >
      <Checkbox name={name} />
      <span className="flex-1">{children}</span>
      {href && (
        <Link href={href} onClick={onClick}>
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
