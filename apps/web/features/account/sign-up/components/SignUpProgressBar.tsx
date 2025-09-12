'use client';

import { usePathname } from 'next/navigation';
import { useSignUp } from '../model/SignUpContext';
import type { FlowType } from '../types/signUpState';

interface SignUpStep {
  id: string;
  title: string;
  path: string;
}

const EMAIL_SIGNUP_STEPS: SignUpStep[] = [
  { id: 'user-type', title: '회원 유형 선택', path: '/auth/sign-up/user-type' },
  { id: 'terms', title: '약관 동의', path: '/auth/sign-up/terms' },
  { id: 'email', title: '이메일 입력', path: '/auth/sign-up/email' },
  { id: 'email-verify', title: '이메일 인증', path: '/auth/sign-up/email/verify' },
  { id: 'password', title: '비밀번호 설정', path: '/auth/sign-up/password' },
  { id: 'nickname', title: '닉네임 설정', path: '/auth/sign-up/nickname' },
  { id: 'phone-request', title: '휴대폰 번호 입력', path: '/auth/sign-up/phone/request' },
  { id: 'phone-verify', title: '휴대폰 인증', path: '/auth/sign-up/phone/verify' },
  { id: 'complete', title: '가입 완료', path: '/auth/sign-up/complete' },
];

const SOCIAL_SIGNUP_STEPS: SignUpStep[] = [
  { id: 'user-type', title: '회원 유형 선택', path: '/auth/sign-up/user-type' },
  { id: 'terms', title: '약관 동의', path: '/auth/sign-up/terms' },
  { id: 'nickname', title: '닉네임 설정', path: '/auth/sign-up/nickname' },
  { id: 'phone-request', title: '휴대폰 번호 입력', path: '/auth/sign-up/phone/request' },
  { id: 'phone-verify', title: '휴대폰 인증', path: '/auth/sign-up/phone/verify' },
  { id: 'complete', title: '가입 완료', path: '/auth/sign-up/complete' },
];

function getCurrentStepIndex(pathname: string, signupType: FlowType): number {
  const steps = signupType === 'email' ? EMAIL_SIGNUP_STEPS : SOCIAL_SIGNUP_STEPS;

  const exactMatch = steps.findIndex(step => step.path === pathname);
  if (exactMatch !== -1) return exactMatch;

  const sortedSteps = [...steps].sort((a, b) => b.path.length - a.path.length);
  const partialMatch = sortedSteps.findIndex(step =>
    pathname.startsWith(step.path) && step.path !== '/auth/sign-up'
  );
  if (partialMatch !== -1) {
    const originalIndex = steps.findIndex(step => step.path === sortedSteps[partialMatch].path);
    return originalIndex;
  }

  return 0;
}

function getSteps(signupType: FlowType): SignUpStep[] {
  return signupType === 'email' ? EMAIL_SIGNUP_STEPS : SOCIAL_SIGNUP_STEPS;
}

export function SignUpProgressBar() {
  const pathname = usePathname();
  const { state } = useSignUp();

  const steps = getSteps(state.signupType);
  const currentStepIndex = getCurrentStepIndex(pathname, state.signupType);
  const nextStep = steps[currentStepIndex + 1];

  return (
    <div className="w-full px-5 py-3 bg-background-alternative mb-2 rounded-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary-normal rounded-full animate-pulse" />
          <span className="text-sm font-medium text-label-normal">
            {currentStepIndex + 1} / {steps.length}
          </span>
        </div>
        <div className="text-sm text-label-alternative">
          다음 : {nextStep ? nextStep.title : '가입 완료!'}
        </div>
      </div>
    </div>
  );
}
