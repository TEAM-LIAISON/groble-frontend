import { LinkButton } from "@/components/button";
import Header, { X } from "@/components/header";
import { Metadata } from "next";
import Image from "next/image";
import SignInForm from "./form";
import google from "./google.svg";
import kakao from "./kakao.png";
import naver from "./naver.png";
import OAuth2Link from "./oauth2-link";

export const metadata: Metadata = {
  title: "로그인",
};

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ redirect_uri?: string }>;
}) {
  const { redirect_uri: redirectURI } = await searchParams;

  return (
    <>
      <Header right={<X />} />
      <main className="flex flex-col gap-8 p-5">
        <SignInForm />
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-stretch gap-4">
            <span className="grow border-t border-line-normal" />
            <span className="text-body-2-normal font-medium text-[#9DA3AB]">
              OR
            </span>
            <span className="grow border-t border-line-normal" />
          </div>
          <div className="flex flex-col gap-2">
            <OAuth2Link
              searchParamRedirectURI={redirectURI}
              provider="google"
              className="grid cursor-pointer grid-cols-[1fr_max-content_1fr] border border-line-normal px-4 py-3"
            >
              <Image src={google} alt="Google" width={24} height={24} />
              <span>구글로 계속하기</span>
            </OAuth2Link>
            <OAuth2Link
              searchParamRedirectURI={redirectURI}
              provider="naver"
              className="grid cursor-pointer grid-cols-[1fr_max-content_1fr] border border-line-normal px-4 py-3"
            >
              <Image src={naver} alt="Google" width={24} height={24} />
              <span>네이버로 계속하기</span>
            </OAuth2Link>
            <OAuth2Link
              searchParamRedirectURI={redirectURI}
              provider="kakao"
              className="grid cursor-pointer grid-cols-[1fr_max-content_1fr] border border-line-normal px-4 py-3"
            >
              <Image src={kakao} alt="Google" width={24} height={24} />
              <span>카카오로 계속하기</span>
            </OAuth2Link>
          </div>
        </section>
        <section className="flex flex-col gap-5">
          <div className="text-center text-body-2-normal font-medium text-label-alternative">
            회원이 아니신가요?
            <LinkButton group="text" size="x-small" href="/auth/sign-up">
              회원가입 하기
            </LinkButton>
          </div>
        </section>
      </main>
    </>
  );
}
