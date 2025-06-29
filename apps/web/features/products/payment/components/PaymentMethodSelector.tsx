import { useState } from 'react';
import { PayplePayMethod } from '@/lib/config/payple';
import KakaoIcon from '@/shared/ui/icons/KakaoIcon';
import NaverIcon from '@/shared/ui/icons/NaverIcon';

interface PaymentMethodSelectorProps {
  selectedMethod: PayplePayMethod | null;
  onMethodSelect: (method: PayplePayMethod | null) => void;
}

const paymentMethods = [
  {
    id: 'appCard' as const,
    name: '앱카드',
    description: '신용카드 직접 결제',
    icon: '💳',
  },
  {
    id: 'naverPay' as const,
    name: '네이버페이',
    description: '네이버페이로 간편결제',
    icon: 'naver',
  },
  {
    id: 'kakaoPay' as const,
    name: '카카오페이',
    description: '카카오페이로 간편결제',
    icon: 'kakao',
  },
];

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodSelect,
}: PaymentMethodSelectorProps) {
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'naver':
        return <NaverIcon className="w-6 h-6" />;
      case 'kakao':
        return <KakaoIcon className="w-6 h-6" />;
      default:
        return <span className="text-xl">{iconType}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white px-4 py-5">
      <h2 className="text-headline-1 font-semibold text-label-normal">
        결제 수단 선택
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onMethodSelect(method.id)}
            className={`flex items-center gap-3 cursor-pointer rounded-lg border px-3 py-2 text-left transition-colors ${
              selectedMethod === method.id
                ? 'border-primary-sub-1 bg-[#D8FFF4]'
                : 'border-line-normal bg-white hover:border-primary-light-2'
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center ">
              {renderIcon(method.icon)}
            </div>

            <div className="flex-1">
              <p className={`text-body-2-normal `}>{method.name}</p>
            </div>

            {/* <div
              className={`h-4 w-4 rounded-full border-2 ${
                selectedMethod === method.id
                  ? 'border-primary-main bg-primary-main'
                  : 'border-line-normal'
              }`}
            >
              {selectedMethod === method.id && (
                <div className="h-full w-full rounded-full bg-white scale-50"></div>
              )}
            </div> */}
          </button>
        ))}
      </div>
    </div>
  );
}
