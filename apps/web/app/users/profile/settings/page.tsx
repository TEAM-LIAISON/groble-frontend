'use client';

import Switch from '@/components/switch';
import {
  useAdvertisingAgreement,
  useUpdateAdvertisingAgreement,
} from '@/features/profile/hooks/useAdvertisingAgreement';
import { useWithdrawUser } from '@/features/profile/hooks/useWithdrawal';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import Modal, {
  CustomModal,
} from '../../../../../../packages/ui/src/components/Modal';
import Button from '../../../../../../packages/ui/src/components/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileMobileHeader } from '@/features/profile';

// ArrowIcon 컴포넌트 정의
const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.5 5L12.5 10L7.5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SettingsPage() {
  const router = useRouter();

  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  const { data: agreementData, isLoading, error } = useAdvertisingAgreement();
  const updateAgreementMutation = useUpdateAdvertisingAgreement();
  const withdrawUserMutation = useWithdrawUser();

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-label-alternative">
          설정을 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }

  const isMarketingAgreed = agreementData?.isAdvertisingAgreement ?? false;
  const isWithdrawable = agreementData?.isAllowWithdraw ?? false;

  const handleWithdrawalClick = () => {
    setIsWithdrawalModalOpen(true);
  };

  const handleWithdrawalConfirm = () => {
    router.push('/users/withdraw');
    // withdrawUserMutation.mutate();
    // setIsWithdrawalModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsWithdrawalModalOpen(false);
  };

  return (
    <>
      <ProfileMobileHeader back={'/users/profile'} />
      <div className="flex flex-col px-5 md:px-0">
        <div className=" md:rounded-lg overflow-hidden ">
          {/* 탈퇴하기 버튼 */}
          <div
            className="rounded-xl bg-background-normal flex items-center justify-between px-3 py-4 md:py-5 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={handleWithdrawalClick}
          >
            <span className="text-body-1-normal font-semibold text-label-normal">
              탈퇴하기
            </span>
            <ArrowIcon className="w-5 h-5 text-label-alternative transform rotate-0" />
          </div>

          {/* 마케팅 활용 및 수신 동의 스위치 */}
          <div className="rounded-xl flex items-center justify-between px-3 py-4 md:py-5 bg-background-normal mt-2 md:mt-0">
            <span className="text-body-1-normal font-semibold text-label-normal">
              마케팅 활용 및 수신 동의
            </span>
            <Switch
              checked={isMarketingAgreed}
              className="w-[2.5rem] h-[1.375rem]"
              disabled={updateAgreementMutation.isPending}
              onChange={(e) => {
                const newValue = e.target.checked;
                updateAgreementMutation.mutate({
                  agreed: newValue,
                });
              }}
            />
          </div>
        </div>

        {/* 회원탈퇴 모달 */}
        {isWithdrawable ? (
          // 탈퇴 가능한 경우 - 기본 Modal 사용
          <Modal
            isOpen={isWithdrawalModalOpen}
            onRequestClose={handleCloseModal}
            title="탈퇴하시겠어요?"
            subText="탈퇴하시면 지금까지 저장된 소중한 정보들이 모두 사라져요"
            actionButton="탈퇴하기"
            secondaryButton="닫기"
            onActionClick={handleWithdrawalConfirm}
            actionButtonColor="danger"
          />
        ) : (
          // 탈퇴 불가능한 경우 - CustomModal 사용
          <CustomModal
            isOpen={isWithdrawalModalOpen}
            onRequestClose={handleCloseModal}
          >
            <div className="px-8 pt-8 pb-6">
              {/* 제목 */}
              <h2 className="text-title-3 font-bold text-label-normal mb-2">
                현재 판매 중인 콘텐츠가 있는 경우,
                <br />
                탈퇴하실 수 없어요.
              </h2>

              {/* 내용 */}
              <div className="mb-8">
                <p className="text-headline-1 text-label-neutral mb-5">
                  판매 중인 콘텐츠를 판매 중단 후 시도해 주세요
                </p>
              </div>

              {/* 확인 버튼 */}
              <Button
                onClick={handleCloseModal}
                group="solid"
                type="primary"
                size="medium"
                className="w-full"
              >
                확인
              </Button>
            </div>
          </CustomModal>
        )}
      </div>
    </>
  );
}
