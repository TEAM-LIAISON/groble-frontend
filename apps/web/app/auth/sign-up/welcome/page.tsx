import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import { getUserHeaderInform } from "@/lib/api";
import { cookies } from "next/headers";
import Image from "next/image";
import CookieInitializer from "./cookie-initializer";
import image from "./image.png";
import WelcomeClient from "./welcome-client";

export default async function WelcomePage() {
  const response = await getUserHeaderInform(
    // @ts-expect-error
    {},
  );

  if (response.status != 200) throw new Error(JSON.stringify(response));

  return (
    <CookieInitializer
      accessToken={(await cookies()).get("accessToken")?.value!}
      refreshToken={(await cookies()).get("refreshToken")?.value!}
    >
      <WelcomeClient>
        <div className="flex h-screen flex-col">
          <Header left={<Back />} />
          <main className="flex flex-1 flex-col items-center justify-center gap-1.5 p-5 text-center">
            <Image src={image} alt="" width={200} />
            <div>
              <h1 className="text-title-3 font-bold">가입을 환영해요!</h1>
              <p className="text-body-2-normal font-medium text-label-alternative">
                창작자와 전문가가 모이는 곳,
                <br />
                함께 성장할 준비되셨나요?
              </p>
            </div>
            <BottomArea narrow>
              <BottomLinkButton href="/">확인</BottomLinkButton>
            </BottomArea>
          </main>
        </div>
      </WelcomeClient>
    </CookieInitializer>
  );
}
