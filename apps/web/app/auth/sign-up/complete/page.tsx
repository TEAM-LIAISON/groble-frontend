'use client';

import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { Button, LinkButton } from '@groble/ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpCompletePage() {
  const router = useRouter();

  return (
    <>
      <OnboardingHeader close={true} />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0 items-center ">
          <Image
            src="/images/groble-3d-megaphone.svg"
            alt="phone"
            width={200}
            height={200}
            className="mt-[7rem] md:mt-[9.06rem]"
          />

          <div className="mt-6 flex flex-col gap-2">
            <p className="text-title-3 font-bold text-label-normal">
              가입을 환영해요!
            </p>
            <p className="text-body-1-normal text-label-alternative leading-6 text-center">
              창작자와 전문가가 모이는 곳,
              <br />
              함께 성장할 준비되셨나요?
            </p>
          </div>

          <div className="mt-auto mb-8 w-full">
            <LinkButton
              href="/"
              className="w-full"
              group="solid"
              type="primary"
              size="large"
            >
              시작하기{' '}
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
