import WebHeader from '@/components/(improvement)/layout/header';
import { LinkButton } from '@groble/ui/src/components/Button';
import Image from 'next/image';

export default function WithdrawCompletePage() {
  return (
    <>
      <WebHeader />
      <div className="h-[3.75rem] md:hidden" />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col items-center max-w-[480px] w-full p-5 md:p-0">
          {/* 완료 메시지 */}
          <div className="flex flex-col items-center mt-[4rem] md:mt-[9.06rem]">
            <Image
              src="/images/groble-3d-1.svg"
              alt="logo"
              width={180}
              height={180}
            />
            <h1 className="text-title-3 font-bold text-label-normal mt-8">
              탈퇴가 완료됐어요
            </h1>
            <p className="mt-2 text-body-2-normal md:text-body-1-normal text-label-alternative leading-6 tracking-[0.00569em] text-center">
              더 발전된 모습으로 여기 있을게요.
              <br />
              다시 찾아와주세요!
            </p>
          </div>

          {/* 홈으로 가기 버튼 */}
          <div className="w-full mt-auto mb-5">
            <LinkButton
              href="/"
              group="solid"
              type="primary"
              size="large"
              className="w-full mb-4"
            >
              확인
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
