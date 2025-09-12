'use client';

import { useRouter } from 'next/navigation';
import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { Button } from '@groble/ui';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

export default function SignUpCompletePage() {
  const router = useRouter();
  const [hasRedirectInfo, setHasRedirectInfo] = useState<boolean>(false);
  const [userType, setUserType] = useState<'maker' | 'buyer' | null>(null);

  useEffect(() => {
    try {
      const redirectInfo = sessionStorage.getItem('redirectAfterAuth');
      const grobleSignupState = sessionStorage.getItem('groble_signup_state');
      const parsedUserType = grobleSignupState
        ? (JSON.parse(grobleSignupState || '{}').userType as
          | 'maker'
          | 'buyer'
          | null)
        : null;
      setUserType(parsedUserType);
      setHasRedirectInfo(Boolean(redirectInfo));
    } catch {
      setHasRedirectInfo(false);
    }
  }, []);

  const handleRedirect = () => {
    try {
      const redirectInfo = sessionStorage.getItem('redirectAfterAuth');
      if (redirectInfo) {
        try {
          const { type, contentId, optionId, timestamp } =
            JSON.parse(redirectInfo);
          if (Date.now() - timestamp < 30 * 60 * 1000) {
            if (type === 'payment') {
              router.push(`/products/${contentId}`);
              return;
            }
          } else {
            sessionStorage.removeItem('redirectAfterAuth');
          }
        } catch {
          sessionStorage.removeItem('redirectAfterAuth');
        }
      } else {
        sessionStorage.removeItem('groble_signup_state');
        if (userType === 'maker') {
          router.push('/manage/store/info');
        } else {
          router.push('/');
        }
      }
    } catch {
      router.push('/');
    }
  };

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
            <p className="text-title-3 font-bold text-label-normal text-center">
              가입을 환영해요!
            </p>
            <p className="text-body-1-normal text-label-alternative leading-6 text-center">
              창작자와 전문가가 모이는 곳,
              <br />
              함께 성장할 준비되셨나요?
            </p>
          </div>

          <div className="mt-auto mb-8 w-full">
            <Button
              onClick={handleRedirect}
              className="w-full"
              group="solid"
              type="primary"
              size="large"
            >
              {hasRedirectInfo
                ? '가입완료'
                : userType === 'maker'
                  ? '가입 완료'
                  : '시작하기'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
