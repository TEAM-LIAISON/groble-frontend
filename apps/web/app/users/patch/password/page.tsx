'use client';
import WebHeader from '@/components/(improvement)/layout/header';
import { Button, ButtonLoadingSpinner, TextField } from '@groble/ui';
import { useSearchParams } from 'next/navigation';
import { useSendPasswordResetEmail } from '@/features/account/sign-up/hooks/usePasswordReset';
import { Suspense } from 'react';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

function PatchPasswordContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const sendPasswordResetEmailMutation = useSendPasswordResetEmail();

  const handleSendPasswordResetEmail = () => {
    if (email) {
      sendPasswordResetEmailMutation.mutate({ email });
    }
  };

  return (
    <>
      <WebHeader mobileBack="back" />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <h1 className="text-heading-1 md:text-title-3 font-semibold md:font-bold text-label-normal md:mt-[9.06rem] mb-5">
            가입하신 이메일로 <br />
            비밀번호 재설정 링크를 보내드릴게요
          </h1>
          <TextField
            placeholder="이메일을 입력해주세요"
            value={email || ''}
            disabled
            className="disabled:text-label-assistive"
          />

          <div className="mt-auto mb-5 w-full">
            <Button
              className="w-full"
              group="solid"
              type="primary"
              size="large"
              onClick={handleSendPasswordResetEmail}
              disabled={!email || sendPasswordResetEmailMutation.isPending}
            >
              {sendPasswordResetEmailMutation.isPending ? (
                <ButtonLoadingSpinner />
              ) : (
                '다음'
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PatchPasswordPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PatchPasswordContent />
    </Suspense>
  );
}
