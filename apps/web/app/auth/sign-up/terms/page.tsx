'use client';

import { CheckIcon } from '@/components/(improvement)/icons/CheckIcon';
import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { useTermsAgreement } from '@/features/account/sign-up/hooks/useTermsAgreement';
import { useTermsSubmit } from '@/features/account/sign-up/hooks/useTermsSubmit';
import TermsCheckboxList from '@/features/account/sign-up/ui/TermsCheckboxList';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { Button, CustomModal, Modal } from '@groble/ui';
import { Suspense } from 'react';

function TermsContent() {
  const {
    userType,
    handleContinue,
    isLoading,
    requiredTermsChecked,
    showMarketingModal,
    setShowMarketingModal,
    handleAgreeMarketing,
    handleProceedWithoutMarketing,
    showMarketingInfoModal,
    setShowMarketingInfoModal,
    handleAgreeMarketingFromInfo,
  } = useTermsSubmit();
  const { agreements, handleIndividualAgree } = useTermsAgreement(userType);

  return (
    <>
      <OnboardingHeader back={'back'} />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5">
          <h1 className="text-heading-1 md:text-title-3 font-semibold md:font-bold text-label-normal md:mt-[8.94rem] mb-5 md:mb-8">
            가입을 위해 아래 항목에 <br className="md:hidden" /> 동의해주세요.
          </h1>

          <TermsCheckboxList
            agreements={agreements}
            userType={userType}
            onIndividualAgree={handleIndividualAgree}
            onMarketingModalOpen={() => setShowMarketingInfoModal(true)}
          />

          {/* 계속하기 버튼 */}
          <div className="mt-auto mb-5">
            <Button
              onClick={handleContinue}
              disabled={!requiredTermsChecked || isLoading}
              className="w-full"
              group="solid"
              type="primary"
              size="large"
            >
              {isLoading ? '처리 중...' : '다음'}
            </Button>
          </div>
        </div>
      </div>

      {/* 마케팅 동의 모달 (회원가입 진행 시 나타나는 모달) */}
      <CustomModal
        isOpen={showMarketingModal}
        onRequestClose={() => setShowMarketingModal(false)}
      >
        <div className="text-center p-6 pt-8">
          <h3 className="text-title-3 font-bold text-label-normal text-left">
            마케팅 활용 및 수신에 동의하시면,
          </h3>
          <p className="mt-2 text-headline-1 text-label-neutral text-left font-normal">
            각종 할인 쿠폰과 유용한 소식을 보내드려요.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <span className="flex gap-2">
              <CheckIcon className="w-6 h-6 text-primary-sub-1 " />
              <p className="text-headline-1 text-label-neutral">
                할인 쿠폰, 각종 혜택, 한정 특가 소식
              </p>
            </span>
            <span className="flex gap-2">
              <CheckIcon className="w-6 h-6 text-primary-sub-1" />
              <p className="text-headline-1 text-label-neutral font-medium">
                맞춤형 콘텐츠 추천, 인기 상품 소식
              </p>
            </span>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex flex-col gap-2 mt-8">
            <Button
              onClick={handleAgreeMarketing}
              group="solid"
              type="primary"
              size="medium"
              className="w-full"
            >
              동의하고 가입하기
            </Button>
            <Button
              onClick={handleProceedWithoutMarketing}
              group="solid"
              type="secondary"
              size="medium"
              className="w-full"
            >
              이대로 가입하기
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* 마케팅 정보 모달 (화살표 클릭 시 나타나는 모달) */}
      <Modal
        isOpen={showMarketingInfoModal}
        onRequestClose={() => setShowMarketingInfoModal(false)}
        subText="회사는 회원님의 서비스 이용 이력(콘텐츠 열람, 구매 등)을 바탕으로 맞춤형 콘텐츠 추천, 할인 쿠폰 제공, 혜택 알림 발송 등의 마케팅 목적에 개인정보를 활용하며, 문자(SMS), 이메일, 알림 등으로 관련 마케팅 정보를 수신할 수 있습니다."
        actionButton="동의"
        secondaryButton="취소"
        onActionClick={handleAgreeMarketingFromInfo}
        onSecondaryClick={() => setShowMarketingInfoModal(false)}
      />
    </>
  );
}

export default function TermsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TermsContent />
    </Suspense>
  );
}
