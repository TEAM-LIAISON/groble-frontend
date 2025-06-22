import WebHeader from '@/components/(improvement)/layout/header';
import { LinkButton } from '@groble/ui';
import Image from 'next/image';

export default function ResetPasswordCompletePage() {
  return (
    <>
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full  items-center ">
          <Image
            src="/images/groble-3d-megaphone.svg"
            alt="phone"
            width={200}
            height={200}
            className="mt-[9.06rem]"
          />

          <h1 className="text-title-3 font-bold text-label-normal mt-6 leading-8">
            비밀번호를 변경했어요
          </h1>
          <p className="text-body-1-normal text-label-alternative mt-2">
            새로운 비밀번호로 다시 로그인 해주세요
          </p>

          <div className="mt-auto mb-10 w-full">
            <LinkButton href="/auth/sign-in" className="w-full" size="large">
              로그인하기
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
