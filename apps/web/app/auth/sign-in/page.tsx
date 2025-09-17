'use client';
import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import Link from 'next/link';
import SocialLoginButtons from '@/features/account/sign-in/ui/SocialLoginButtons';
import LoginForm from '@/features/account/sign-in/ui/LoginForm';
import GuestOrderInquiry from '@/features/account/sign-in/ui/GuestOrderInquiry';
import Tab from '@/components/ui/Tab';
import { useState } from 'react';

export default function SignInPage() {
  const [activeTab, setActiveTab] = useState('member');

  const tabItems = [
    { id: 'member', label: '기존 회원' },
    { id: 'guest', label: '비회원 주문조회' },
  ];

  return (
    <>
      <OnboardingHeader close={true} />
      <div
        className="w-full flex justify-center h-[calc(100vh-68px)] py-4"
      >
        <div className="flex flex-col max-w-[480px] w-full px-5 md:px-0">
          <h1 className="text-title-3 font-bold text-label-normal text-left mb-5">
            로그인 하기
          </h1>
          <Tab
            items={tabItems}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-5"
          />
          {activeTab === 'member' && (
            <>
              <div className=" flex flex-col w-full gap-5">

                <LoginForm />
                <Link
                  href="/auth/reset-password"
                  className="py-[0.56rem] text-body-2-normal text-label-alternative text-center hover:underline"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
              <div className="mt-8 flex items-center w-full">
                <div className="w-full h-[1px] bg-line-normal" />
                <span className="text-body-2-normal font-medium text-[#9DA3AB] px-8">
                  OR
                </span>
                <div className="w-full h-[1px] bg-line-normal" />
              </div>
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
            </>
          )}
          {activeTab === 'guest' && (
            <div className="flex flex-col w-full gap-5">
              <GuestOrderInquiry />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
