import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 재설정 완료",
};

export default function VerifyPhoneRequestPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header left={<Back />} />
      <main className="flex flex-1 flex-col items-center justify-center gap-1.5 p-5 text-center">
        <Placeholder />
        <div>
          <h1 className="text-title-3 font-bold">
            판매자 등록을 위해 <br />
            휴대폰 번호 인증이 필요해요
          </h1>
          <p className="text-body-2-normal font-medium text-label-alternative">
            아래 버튼을 눌러 인증을 완료해주세요
          </p>
        </div>
        <BottomArea>
          <BottomLinkButton href="/users/me/verify-phone">
            인증하기
          </BottomLinkButton>
        </BottomArea>
      </main>
    </div>
  );
}

function Placeholder() {
  return (
    <svg
      width="223"
      height="223"
      viewBox="0 0 223 223"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="111.509" cy="111.695" r="111.144" fill="#D9D9D9" />
    </svg>
  );
}
