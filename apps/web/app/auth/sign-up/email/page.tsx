'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import { TextField, Button } from '@groble/ui';
import { useSignUp } from '@/features/account/sign-up/model/SignUpContext';

export default function EmailSignUpPage() {
  const router = useRouter();
  const { state, dispatch } = useSignUp();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleContinue = () => {
    if (state.email && password && password === confirmPassword) {
      dispatch({ type: 'SET_EMAIL', payload: state.email });
      dispatch({ type: 'SET_PASSWORD', payload: password });
      // 다음 단계로 이동 (실제 구현 필요)
      router.push('/auth/sign-up/form');
    }
  };

  const canProceed = state.email && password && password === confirmPassword;

  return (
    <>
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full px-5">
          <h1 className="text-title-3 font-bold text-label-normal mt-[8.94rem] mb-8">
            이메일로 회원가입
          </h1>

          <div className="flex flex-col gap-4 mb-8">
            <TextField
              placeholder="이메일을 입력해주세요"
              type="email"
              value={state.email || ''}
              onChange={(e) =>
                dispatch({ type: 'SET_EMAIL', payload: e.target.value })
              }
            />

            <TextField
              placeholder="비밀번호를 입력해주세요"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              placeholder="비밀번호를 다시 입력해주세요"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* 계속하기 버튼 */}
          <div className="mt-auto mb-8">
            <Button
              onClick={handleContinue}
              disabled={!canProceed}
              className="w-full"
              group="solid"
              type="primary"
              size="medium"
            >
              계속하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
