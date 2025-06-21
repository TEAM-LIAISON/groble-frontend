import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { Button, LinkButton } from '@groble/ui';
import Image from 'next/image';

export default function PhonePage() {
  return (
    <>
      <OnboardingHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full items-center">
          <Image
            src="/images/groble-3d-phone.svg"
            alt="phone"
            width={200}
            height={200}
            className="mt-[9.06rem]"
          />
          <div className="mt-6 flex flex-col items-center">
            <p className="text-title-3 font-bold text-label-normal text-center leading-9">
              회원가입을 위해 <br />
              전화번호 인증이 필요해요
            </p>
            <p className="mt-2 text-body-1-normal text-label-alternative">
              아래 버튼을 눌러 인증을 완료해주세요
            </p>
          </div>

          <div className="mt-auto mb-8 w-full">
            <LinkButton
              href="/auth/sign-up/phone/request"
              className="w-full"
              group="solid"
              type="primary"
              size="large"
            >
              다음
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
