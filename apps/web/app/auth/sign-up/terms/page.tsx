'use client';

import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { Button, CustomModal } from '@groble/ui';
import { useTermsAgreement } from '@/features/account/sign-up/hooks/useTermsAgreement';
import { useTermsSubmit } from '@/features/account/sign-up/hooks/useTermsSubmit';
import TermsCheckboxList from '@/features/account/sign-up/ui/TermsCheckboxList';
import { CheckIcon } from '@/components/(improvement)/icons/CheckIcon';

export default function TermsPage() {
  const {
    userType,
    handleContinue,
    isLoading,
    showMarketingModal,
    setShowMarketingModal,
    handleAgreeMarketing,
    handleProceedWithoutMarketing,
  } = useTermsSubmit();
  const { agreements, requiredTermsChecked, handleIndividualAgree } =
    useTermsAgreement(userType);

  return (
    <>
      <OnboardingHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full px-5">
          <h1 className="text-title-3 font-bold text-label-normal mt-[8.94rem] mb-8">
            가입을 위해 아래 항목에 동의해주세요.
          </h1>

          <TermsCheckboxList
            agreements={agreements}
            userType={userType}
            onIndividualAgree={handleIndividualAgree}
          />

          {/* 계속하기 버튼 */}
          <div className="mt-auto mb-8">
            <Button
              onClick={handleContinue}
              disabled={!requiredTermsChecked || isLoading}
              className="w-full"
              group="solid"
              type="primary"
              size="medium"
            >
              {isLoading ? '처리 중...' : '계속하기'}
            </Button>
          </div>
        </div>
      </div>

      {/* 마케팅 동의 모달 */}
      <CustomModal
        isOpen={showMarketingModal}
        onRequestClose={() => setShowMarketingModal(false)}
      >
        <div className="text-center p-6 pt-8">
          <h3 className="text-title-3 font-bold text-label-normal text-left">
            마케팅 활용 및 수신에 동의하시면,
          </h3>
          <p className="mt-2 text-headline-1 text-label-neutral text-left">
            각종 할인 쿠폰과 유용한 소식을 보내드려요.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <span className="flex gap-2">
              <CheckIcon className="w-6 h-6 text-primary-sub-1" />
              <p className="text-headline-1 text-label-neutral">
                할인 쿠폰, 각종 혜택, 한정 특가 소식
              </p>
            </span>
            <span className="flex gap-2">
              <CheckIcon className="w-6 h-6 text-primary-sub-1" />
              <p className="text-headline-1 text-label-neutral">
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
    </>
  );
}
