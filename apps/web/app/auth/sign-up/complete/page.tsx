'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import { Button } from '@groble/ui';

export default function SignUpCompletePage() {
  const router = useRouter();

  return (
    <>
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full px-5 items-center justify-center">
          <div className="text-center mb-8">
            <h1 className="text-title-1 font-bold text-label-normal mb-4">
              회원가입이 완료되었습니다!
            </h1>
            <p className="text-body-1-normal text-label-alternative">
              그로블에 오신 것을 환영합니다.
            </p>
          </div>

          <div className="w-full">
            <Button
              onClick={() => router.push('/')}
              className="w-full"
              group="solid"
              type="primary"
              size="medium"
            >
              홈으로 이동
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
