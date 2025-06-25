'use client';

import Switch from '@/components/switch';
import {
  useAdvertisingAgreement,
  useUpdateAdvertisingAgreement,
} from '@/features/profile/hooks/useAdvertisingAgreement';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
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
  const { data: agreementData, isLoading, error } = useAdvertisingAgreement();
  const updateAgreementMutation = useUpdateAdvertisingAgreement();

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

  const isMarketingAgreed = agreementData ?? false;

  return (
    <div className="flex flex-col">
      <div className="bg-background-normal rounded-lg overflow-hidden">
        {/* 탈퇴하기 버튼 */}
        <div
          className="flex items-center justify-between px-3 py-5  cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => {
            // 기능 연결 예정
            console.log('탈퇴하기 클릭');
          }}
        >
          <span className="text-body-1-normal font-semibold text-label-normal">
            탈퇴하기
          </span>
          <ArrowIcon className="w-5 h-5 text-label-alternative transform rotate-0" />
        </div>

        {/* 마케팅 활용 및 수신 동의 스위치 */}
        <div className="flex items-center justify-between px-3 py-5">
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
    </div>
  );
}
