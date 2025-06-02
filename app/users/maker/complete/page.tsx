import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import Image from "next/image";

export default function MakerCompletePage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />

        <main className="flex w-full flex-col items-center">
          <Image
            src="/assets/common/icons/megaphone.svg"
            alt="인증을 완료했어요"
            width={200}
            height={200}
          />
          <h1 className="mt-6 text-title-3 font-bold text-label-normal">
            인증을 완료했어요
          </h1>
          <p className="mt-2 text-body-1-normal text-label-alternative">
            인증완료 후 다음 액션은?{" "}
          </p>
        </main>

        <BottomArea narrow>
          <BottomLinkButton href="/">
            <span className="flex min-h-[1.5rem] items-center justify-center">
              홈으로 가기{" "}
            </span>
          </BottomLinkButton>
        </BottomArea>
      </div>
    </div>
  );
}
