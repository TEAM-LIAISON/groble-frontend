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
        <label className="mx-5 flex items-center gap-2">
          <Checkbox required name="maker-terms-agreement" />
          <Link href="https://paint-crowley-ff2.notion.site/1f2c158365ac80afafe6c9d7c1011d39">
            [필수] 메이커 이용약관 동의
          </Link>
        </label>
        <BottomButton>인증하기</BottomButton>
      </BottomArea>
    </Form>
  );
}
