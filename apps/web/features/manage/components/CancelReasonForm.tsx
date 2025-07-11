import { useState, useEffect } from 'react';
import Radio from '@/components/radio';
import type {
  CancelReason,
  CancelReasonOption,
  PaymentCancelRequest,
} from '../types/purchaseTypes';

interface CancelReasonFormProps {
  onChange: (data: PaymentCancelRequest | null) => void;
}

const CANCEL_REASON_OPTIONS: CancelReasonOption[] = [
  { value: 'OTHER_PAYMENT_METHOD', label: '다른 수단으로 결제할게요' },
  { value: 'CHANGED_MIND', label: '마음이 바뀌었어요' },
  { value: 'FOUND_CHEAPER_CONTENT', label: '더 저렴한 콘텐츠를 찾았어요' },
  { value: 'ETC', label: '기타' },
];

export default function CancelReasonForm({ onChange }: CancelReasonFormProps) {
  const [selectedReason, setSelectedReason] = useState<CancelReason>('ETC');
  const [detailReason, setDetailReason] = useState('');

  // 상태 변경시 부모에게 전달
  useEffect(() => {
    if (selectedReason) {
      const submitData: PaymentCancelRequest = {
        cancelReason: selectedReason,
      };

      // 기타인 경우에만 상세 사유 추가 (필수가 아님)
      if (selectedReason === 'ETC' && detailReason.trim()) {
        submitData.detailReason = detailReason.trim();
      }

      onChange(submitData);
    } else {
      onChange(null);
    }
  }, [selectedReason, detailReason, onChange]);

  return (
    <div className="">
      {/* 제목 */}
      <h2 className="text-title-3 font-bold text-label-normal">
        취소 사유를 알려주세요
      </h2>

      {/* 취소 사유 옵션들 */}
      <div className="space-y-2 mt-5">
        {CANCEL_REASON_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 py-2 cursor-pointer"
          >
            <Radio
              name="cancelReason"
              value={option.value}
              checked={selectedReason === option.value}
              onChange={() => setSelectedReason(option.value)}
            />
            <span className="text-body-2-normal font-medium text-label-normal">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {/* 기타 선택시 상세 사유 입력 필드 */}
      {selectedReason === 'ETC' && (
        <div className="mt-3">
          <textarea
            value={detailReason}
            onChange={(e) => setDetailReason(e.target.value)}
            placeholder="상세 사유를 적어주세요"
            className="w-full p-4 border border-line-normal rounded-lg text-body-2-normal placeholder:text-label-alternative resize-none focus:outline-none focus:ring-2 focus:ring-primary-normal focus:border-transparent"
            rows={4}
          />
        </div>
      )}
    </div>
  );
}
