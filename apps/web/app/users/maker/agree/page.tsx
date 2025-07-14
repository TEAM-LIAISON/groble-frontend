'use client';

import { Suspense } from 'react';
import { Button } from '@groble/ui';
import { useMakerTerms } from '@/features/makerAuth/hooks/useMakerTerms';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import Image from 'next/image';
import WebHeader from '@/components/(improvement)/layout/header';
import CheckBox from '@/components/ui/CheckBox';
import Link from 'next/link';

function MakerTermsAgreePage() {
  const { isAgreed, isLoading, handleAgreeChange, handleSubmit } =
    useMakerTerms();

  return (
    <>
      <WebHeader mobileBack="back" />
      <div className="w-full flex justify-center h-[calc(100vh-68px)] ">
        <div className="flex flex-col max-w-[480px] w-full p-5 items-center ">
          {/* 별표 아이콘 */}
          <div className="w-[11.25rem] h-[11.25rem] relative mt-[2rem] md:mt-[6rem]">
            <Image src="/images/groble-3d-1.svg" alt="maker-agree-icon" fill />
          </div>

          {/* 제목 */}
          <h1 className="text-title-3 font-bold text-center mt-8 leading-8">
            메이커 등록을 위해
            <br />
            동의가 필요해요
          </h1>

          {/* 부제목 */}
          <p className="text-body-2-normal md:text-body-1-normal text-label-alternative mt-3 text-center">
            아래 약관에 동의하고 등록을 완료해 주세요
          </p>

          {/* 스페이서 */}
          <div className="flex-1" />

          {/* 약관동의 체크박스 */}
          <div className="w-full py-2 mb-3">
            <div className="flex items-center justify-between">
              <CheckBox
                selected={isAgreed}
                onChange={handleAgreeChange}
                label="[필수] 메이커 이용약관 동의"
                size="medium"
                textClass="text-body-2-normal text-label-normal"
              />
              <Link
                href="https://paint-crowley-ff2.notion.site/1f2c158365ac80afafe6c9d7c1011d39?pvs=4"
                className="p-2 hover:bg-gray-50 rounded-lg ml-2"
                target="_blank"
              >
                <ArrowIcon />
              </Link>
            </div>
          </div>

          {/* 완료 버튼 */}
          <Button
            onClick={handleSubmit}
            disabled={!isAgreed || isLoading}
            className="w-full"
            group="solid"
            type="primary"
            size="large"
          >
            {isLoading ? '처리 중...' : '완료'}
          </Button>
        </div>
      </div>
    </>
  );
}

export default function MakerAgreeTermsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MakerTermsAgreePage />
    </Suspense>
  );
}

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 4L10 8L6 12"
      stroke="#9DA3AB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
