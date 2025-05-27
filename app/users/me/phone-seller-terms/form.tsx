"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import Checkbox from "@/components/checkbox";
import { useToastErrorMessage } from "@/lib/error";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { setPhoneSellerTermsAction } from "./actions";
import logo from "./logo.png";
import phone from "./phone.png";

export default function PhoneSellerTermsForm({
  phoneNumber,
}: {
  phoneNumber?: string;
}) {
  const [response, formAction] = useActionState(
    setPhoneSellerTermsAction,
    null,
  );
  useToastErrorMessage(response);

  return (
    <Form
      action={formAction}
      className="group flex flex-col items-center gap-5"
    >
      <Image src={phoneNumber ? logo : phone} alt="" width={200} />
      <div>
        <h1 className="text-title-3 font-bold">
          {phoneNumber ? (
            <>
              메이커 등록을 위해 <br />
              동의가 필요해요
            </>
          ) : (
            <>
              메이커 등록을 위해 <br />
              휴대폰 번호 인증이 필요해요
            </>
          )}
        </h1>
        <p className="text-body-2-normal font-medium text-label-alternative">
          {phoneNumber ? (
            <>아래 약관에 동의하고 등록을 완료해 주세요</>
          ) : (
            <>휴대폰 번호를 인증해주세요</>
          )}
        </p>
      </div>
      <BottomArea narrow>
        <div className="mx-5 flex items-center gap-1">
          <label className="flex flex-1 items-center gap-2 text-body-2-normal font-medium">
            <Checkbox required name="maker-terms-agreement" />
            <span className="flex-1 text-left">
              [필수] 메이커 이용약관 동의
            </span>
          </label>
          <Link href="https://paint-crowley-ff2.notion.site/1f2c158365ac80afafe6c9d7c1011d39">
            <RightArrow />
          </Link>
        </div>
        <BottomButton>인증하기</BottomButton>
      </BottomArea>
    </Form>
  );
}

function RightArrow() {
  return (
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
  );
}
