import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import Image from "next/image";
import image from "./image.png";

export const metadata: Metadata = {
  title: "회원 탈퇴 완료",
};

export default function DeleteAccountCompletePage() {
  return (
    <div className="flex h-screen flex-col">
      <Header left={<Back />} />
      <main className="flex flex-1 flex-col items-center justify-center gap-1.5 p-5 text-center">
        <Image src={image} alt="" width={200} />
        <div>
          <h1 className="text-title-3 font-bold">탈퇴가 완료됐어요</h1>
          <p className="text-body-2-normal font-medium text-label-alternative">
            더 발전된 모습으로 여기 있을게요.
            <br />
            다시 찾아와주세요!
          </p>
        </div>
        <BottomArea narrow>
          <BottomLinkButton href="/">확인</BottomLinkButton>
        </BottomArea>
      </main>
    </div>
  );
}
