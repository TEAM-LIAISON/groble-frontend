import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import Image from "next/image";
import image from "./image.png";

export const metadata: Metadata = {
  title: "비밀번호 재설정 완료",
};

export default function ResetPasswordCompletePage() {
  return (
    <div className="flex h-screen flex-col">
      <Header left={<Back />} />
      <main className="flex flex-1 flex-col items-center justify-center gap-1.5 p-5 text-center">
        <Image src={image} alt="" width={200} />
        <div>
          <h1 className="text-title-3 font-bold">비밀번호를 변경했어요</h1>
          <p className="text-body-2-normal font-medium text-label-alternative">
            새로운 비밀번호로 다시 로그인해주세요
          </p>
        </div>
        <BottomArea narrow>
          <BottomLinkButton href="/auth/sign-in">확인</BottomLinkButton>
        </BottomArea>
      </main>
    </div>
  );
}
