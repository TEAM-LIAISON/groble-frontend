import { BottomButton } from "@/components/button";
import Header, { BackButton } from "@/components/header";
import LargeCheck from "@/components/icons/large-check";

export default function RequestPasswordResetSuccess() {
  return (
    <div className="flex h-screen flex-col">
      <Header leftIcons={<BackButton />} />
      <main className="flex flex-1 flex-col items-center justify-center gap-1.5 p-5 text-center">
        <LargeCheck />
        <div>
          <h1 className="text-title-3 font-bold">
            비밀번호 재설정을 위한
            <br />
            메일을 보냈어요
          </h1>
          <p className="text-body-2-normal font-medium text-label-alternative">
            메일함을 확인해주세요
          </p>
        </div>
        <div className="fixed right-0 bottom-0 left-0 flex flex-col">
          <BottomButton>확인</BottomButton>
        </div>
      </main>
    </div>
  );
}
