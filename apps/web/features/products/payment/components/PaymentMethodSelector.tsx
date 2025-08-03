import Radio from '@/components/radio';
import type { PayplePayMethod } from '@/lib/config/payple';
import Image from 'next/image';

interface PaymentMethodSelectorProps {
  selectedMethod: PayplePayMethod | null;
  onMethodSelect: (method: PayplePayMethod | null) => void;
}

const paymentMethods = [
  {
    id: 'appCard' as const,
    name: '앱카드',
    description: '신용카드 직접 결제',
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
  // 결제 방법 선택 핸들러 - 가독성을 위해 분리
  const handleMethodSelect = (methodId: PayplePayMethod) => {
    onMethodSelect(methodId);
  };

  // 아이콘 렌더링 함수 - 예측 가능성 확보
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'naver':
        return (
          <Image
            src="/assets/payment/naver_pay.svg"
            alt="naver"
            width={48}
            height={22}
          />
        );
      case 'kakao':
        return (
          <Image
            src="/assets/payment/kakao_pay.svg"
            alt="kakao"
            width={48}
            height={24}
          />
        );

      default:
        return <span className="text-xl">{iconType}</span>;
    }
  };

  return (
    <div className="flex flex-col rounded-xl bg-white px-4 py-5">
      <h2 className="text-headline-1 font-semibold text-label-normal">
        결제 수단
      </h2>
      <hr className="my-3 border-line-normal" />

      <div className="flex flex-col gap-3">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <label
              key={method.id}
              className="flex items-center  cursor-pointer"
            >
              {/* 라디오 버튼 */}
              <Radio
                name="paymentMethod"
                value={method.id}
                checked={isSelected}
                onChange={() => handleMethodSelect(method.id)}
              />

              {/* 결제 방법 아이콘 */}
              {method.icon && (
                <div className="flex h-10 w-12 items-center justify-center ml-2">
                  {renderIcon(method.icon)}
                </div>
              )}

              {/* 결제 방법 이름 */}
              <div className="flex-1">
                <p className="text-body-2-normal text-label-normal font-semibold ml-[0.38rem]">
                  {method.name}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
