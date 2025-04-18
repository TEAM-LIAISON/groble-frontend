import { buttonClassName } from "@/components/button";
import Header from "@/components/header";
import google from "@/components/icons/google.svg";
import kakao from "@/components/icons/kakao.png";
import naver from "@/components/icons/naver.png";
import X from "@/components/icons/x";
import Image from "next/image";
import Link from "next/link";
import SignInForm from "./form";
import OAuth2Link from "./oauth2-link";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ redirect_uri?: string }>;
}) {
  const { redirect_uri: redirectURI } = await searchParams;

  return (
    <>
      <Header rightIcons={<X />} />
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
            <Link
              className={buttonClassName({ group: "text", size: "x-small" })}
              href="/auth/email-verification/sign-up"
            >
              회원가입 하기
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
