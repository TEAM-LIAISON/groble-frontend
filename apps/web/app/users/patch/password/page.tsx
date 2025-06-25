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
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full">
          <h1 className="text-title-3 font-bold text-label-normal mt-[13.91rem] mb-5">
            가입하신 이메일로 <br />
            비밀번호 재설정 링크를 보내드릴게요
          </h1>
          <TextField
            placeholder="이메일을 입력해주세요"
            value={email || ''}
            disabled
            className="disabled:text-label-assistive"
          />

          <div className="mt-auto mb-10 w-full">
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
                '비밀번호 재설정 링크 보내기'
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
