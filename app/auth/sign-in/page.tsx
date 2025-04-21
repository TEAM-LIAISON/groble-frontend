import Header from "@/components/header";
import Image from "next/image";
import SignInForm from "./form";
import google from "./google.svg";
import kakao from "./kakao.png";
import naver from "./naver.png";
import OAuth2Link from "./oauth2-link";
import SignInButton from "./sign-in-button";

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
            <SignInButton />
          </div>
        </section>
      </main>
    </>
  );
}

function X() {
  return (
    <svg
      width="45"
      height="44"
      viewBox="0 0 45 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.6691 14.163C30.3274 13.8213 29.7734 13.8213 29.4317 14.163L22.832 20.7627L16.2324 14.163C15.8907 13.8213 15.3366 13.8213 14.9949 14.163C14.6532 14.5047 14.6532 15.0588 14.9949 15.4005L21.5946 22.0001L14.9949 28.5998C14.6532 28.9415 14.6532 29.4955 14.9949 29.8372C15.3366 30.1789 15.8907 30.1789 16.2324 29.8372L22.832 23.2376L29.4317 29.8372C29.7734 30.1789 30.3274 30.1789 30.6691 29.8372C31.0108 29.4955 31.0108 28.9415 30.6691 28.5998L24.0695 22.0001L30.6691 15.4005C31.0108 15.0588 31.0108 14.5047 30.6691 14.163Z"
        fill="#171717"
      />
    </svg>
  );
}
