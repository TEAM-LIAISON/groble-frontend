import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { LinkButton } from '@groble/ui';
import Image from 'next/image';

export default function ResetPasswordGuidePage() {
  return (
    <>
      <OnboardingHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full items-center ">
          <Image
            src="/images/groble-3d-message.svg"
            alt="phone"
            width={200}
            height={200}
            className="mt-[9.06rem]"
          />
          <h1 className="text-title-3 font-bold text-label-normal mt-6 leading-8 text-center">
            비밀번호 재설정을 위한
            <br />
            메일을 보냈어요
          </h1>
          <p className="text-body-1-normal text-label-alternative mt-2">
            메일함을 확인 후 비밀번호 변경을 완료해주세요
          </p>

          <div className="mt-auto mb-10 w-full">
            <LinkButton
              href="/auth/reset-password/new"
              className="w-full"
              size="large"
              type="primary"
            >
              로그인 하기
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
