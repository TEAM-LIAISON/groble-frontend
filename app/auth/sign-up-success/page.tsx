import { BottomButton } from "@/components/button";
import Header, { Back } from "@/components/header";
import Image from "next/image";
import rocket from "./rocket.png";

export default function SignUpSuccess() {
  return (
    <div className="flex h-screen flex-col">
      <Header left={<Back />} />
      <main className="flex flex-1 flex-col items-center justify-center gap-1.5 p-5 text-center">
        <Image src={rocket} alt="" />
        <div>
          <h1 className="text-title-3 font-bold">가입을 환영해요!</h1>
          <p className="text-body-2-normal font-medium text-label-alternative">
            창작자와 전문가가 모이는 곳,
            <br />
            함께 성장할 준비되셨나요?
          </p>
        </div>
        <div className="fixed right-0 bottom-0 left-0 flex flex-col">
          <BottomButton>확인</BottomButton>
        </div>
      </main>
    </div>
  );
}
