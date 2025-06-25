'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@groble/ui/src/components/Button';
import Radio from '@/components/radio';
import { useWithdrawUser } from '@/features/profile/hooks/useWithdrawal';
import WebHeader from '@/components/(improvement)/layout/header';

type WithdrawReason =
  | 'NOT_USING'
  | 'INCONVENIENT'
  | 'LACKS_CONTENT'
  | 'BAD_EXPERIENCE'
  | 'COST_BURDEN'
  | 'OTHER';

interface WithdrawReasonOption {
  label: string;
  value: WithdrawReason;
}

export default function WithdrawPage() {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState<WithdrawReason | ''>('');
  const [customReason, setCustomReason] = useState<string>('');
  const withdrawUserMutation = useWithdrawUser();

  const withdrawReasons: WithdrawReasonOption[] = [
    { label: '서비스를 잘 이용하지 않아요', value: 'NOT_USING' },
    { label: '서비스 이용이 불편해요', value: 'INCONVENIENT' },
    { label: '필요한 기능이나 콘텐츠가 없어요', value: 'LACKS_CONTENT' },
    { label: '불쾌한 경험을 겪었어요', value: 'BAD_EXPERIENCE' },
    { label: '가격 및 비용이 부담돼요', value: 'COST_BURDEN' },
    { label: '기타', value: 'OTHER' },
  ];

  const handleReasonChange = (reason: WithdrawReason) => {
    setSelectedReason(reason);
    if (reason !== 'OTHER') {
      setCustomReason('');
    }
  };

  const handleWithdraw = () => {
    if (!selectedReason) return;

    const requestData: any = { reason: selectedReason };

    // OTHER 선택 시에만 additionalComment 추가
    if (selectedReason === 'OTHER' && customReason.trim()) {
      requestData.additionalComment = customReason.trim();
    } else if (selectedReason !== 'OTHER') {
      // OTHER가 아닌 경우에도 추가 코멘트가 있으면 포함
      if (customReason.trim()) {
        requestData.additionalComment = customReason.trim();
      }
    }

    withdrawUserMutation.mutate(requestData);
  };

  const isWithdrawDisabled =
    !selectedReason || (selectedReason === 'OTHER' && !customReason.trim());

  return (
    <>
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full ">
          {/* 헤더 */}
          <div className="mt-[9.06rem] ">
            <h1 className="text-title-3 font-bold text-label-normal mb-[0.13rem]">
              정말로 탈퇴하시겠어요?
            </h1>
            <p className="text-body-1-normal text-label-alternative ">
              탈퇴하시면 저장된 정보들이 모두 사라져요
            </p>
          </div>

          {/* 탈퇴 이유 선택 */}
          <div className="mt-6">
            <div className="space-y-2">
              {withdrawReasons.map((reasonOption) => (
                <label
                  key={reasonOption.value}
                  className="flex items-center gap-2 cursor-pointer py-2"
                >
                  <Radio
                    name="withdrawReason"
                    value={reasonOption.value}
                    checked={selectedReason === reasonOption.value}
                    onChange={() => handleReasonChange(reasonOption.value)}
                  />
                  <span className="text-body-2-normal text-label-normal tracking-[0.009em]">
                    {reasonOption.label}
                  </span>
                </label>
              ))}
            </div>

            {/* 기타 선택 시 텍스트 입력 */}
            {selectedReason === 'OTHER' && (
              <div className="mt-1">
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="상세 사유를 적어주세요"
                  className="w-full p-4 border border-line-normal rounded-lg resize-none focus:outline-none  text-body-2-normal"
                  rows={3}
                  maxLength={200}
                />
                <div className="flex justify-end mt-1">
                  <span className="text-caption-1 text-label-alternative">
                    {customReason.length}/200
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 탈퇴하기 버튼 */}
          <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto">
            <Button
              onClick={handleWithdraw}
              disabled={isWithdrawDisabled || withdrawUserMutation.isPending}
              group="solid"
              type="primary"
              size="large"
              className="w-full"
            >
              {withdrawUserMutation.isPending ? '탈퇴 처리 중...' : '탈퇴하기'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
