import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { Button, TextField } from '@groble/ui';
import Link from 'next/link';
import SocialLoginButtons from '@/features/account/sign-in/ui/SocialLoginButtons';
import LoginForm from '@/features/account/sign-in/ui/LoginForm';

export default function SignInPage() {
  return (
    <>
      <OnboardingHeader />
      <div
        className={`w-full flex  justify-center items-center h-[calc(100vh-68px)]`}
      >
        <div className="flex flex-col max-w-[480px] w-full">
          {/* 로그인 */}
          <div className=" flex flex-col w-full gap-5">
            <h1 className="text-title-3 font-bold text-label-normal text-left">
              로그인 하기
            </h1>
            <LoginForm />
            <Link
              href="/reset-password-request"
              className="py-[0.56rem] text-body-2-normal text-label-alternative text-center hover:underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          {/* 구분선 */}
          <div className="mt-8 flex items-center w-full">
            <div className="w-full h-[1px] bg-line-normal" />
            <span className="text-body-2-normal font-medium text-[#9DA3AB] px-8">
              OR
            </span>
            <div className="w-full h-[1px] bg-line-normal" />
          </div>

          {/* 소셜 로그인 */}
          <div className="mt-4 flex flex-col gap-2">
            <SocialLoginButtons />
          </div>

          <div className="mt-8 flex items-center w-full justify-center">
            <div className="text-body-2-normal text-label-alternative flex gap-2">
              <span>아직 회원이 아니신가요?</span>
              <Link
                href="/auth/sign-up/user-type?type=email"
                className="text-primary-sub-1 hover:underline "
              >
                이메일로 시작하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
