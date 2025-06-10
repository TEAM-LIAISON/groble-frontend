import { LinkButton } from "@/components/button";
import Header, { X } from "@/components/header";
import { getUserMyPageDetail } from "@/lib/api";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import SignInForm from "./form";
import google from "./google.svg";
import kakao from "./kakao.png";
import naver from "./naver.png";
import OAuth2Link from "./oauth2-link";
import RecentSignInBubble from "./recent-sign-in-bubble";

export const metadata: Metadata = {
  title: "로그인",
};

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ redirect_uri?: string }>;
}) {
  const { redirect_uri: redirectURI } = await searchParams;
  const response = await getUserMyPageDetail(
    // @ts-expect-error
    {},
  );

  if (response.status == 200 && response.data.data?.accountType == "SOCIAL") {
    if (response.data.data.nickname) redirect("/");
    else redirect("/auth/sign-up/user-type");
  }

  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[100px] md:max-w-[480px]">
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
                className="relative grid cursor-pointer grid-cols-[1fr_max-content_1fr] border border-line-normal px-4 py-3"
              >
                <Image src={google} alt="Google" width={24} height={24} />
                <span>구글로 계속하기</span>
                {(await cookies()).get("Recent-Sign-In")?.value == "google" && (
                  <RecentSignInBubble className="absolute -top-4 left-1/6" />
                )}
              </OAuth2Link>
              <OAuth2Link
                searchParamRedirectURI={redirectURI}
                provider="naver"
                className="relative grid cursor-pointer grid-cols-[1fr_max-content_1fr] border border-line-normal px-4 py-3"
              >
                <Image src={naver} alt="NAVER" width={24} height={24} />
                <span>네이버로 계속하기</span>
                {(await cookies()).get("Recent-Sign-In")?.value == "naver" && (
                  <RecentSignInBubble className="absolute -top-4 left-1/6" />
                )}
              </OAuth2Link>
              <OAuth2Link
                searchParamRedirectURI={redirectURI}
                provider="kakao"
                className="relative grid cursor-pointer grid-cols-[1fr_max-content_1fr] border border-line-normal px-4 py-3"
              >
                <Image src={kakao} alt="Kakao" width={24} height={24} />
                <span>카카오로 계속하기</span>
                {(await cookies()).get("Recent-Sign-In")?.value == "kakao" && (
                  <RecentSignInBubble className="absolute -top-4 left-1/6" />
                )}
              </OAuth2Link>
            </div>
          </section>
          <section className="flex flex-col gap-5">
            <div className="text-center text-body-2-normal font-medium text-label-alternative">
              회원이 아니신가요?
              <LinkButton
                group="text"
                size="x-small"
                href="/auth/sign-up/user-type"
              >
                회원가입 하기
              </LinkButton>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
