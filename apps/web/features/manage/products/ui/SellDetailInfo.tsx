import type { SellDetailResponse } from '../types/productDetailTypes';

interface SellDetailInfoProps {
  data: SellDetailResponse;
}

export default function SellDetailInfo({ data }: SellDetailInfoProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24시간제 사용
    });
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}₩`;
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center ">
      <div className="w-[5.5rem] text-body-2-normal text-label-alternative font-semibold flex-shrink-0">
        {label}
      </div>
      <div className="text-body-2-normal text-label-normal font-semibold">
        {value}
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-226px)] flex flex-col">
      {/* 제목 */}
      <div className="mb-8">
        <h1 className="text-heading-1 font-bold text-label-normal">
          {data.contentTitle}
        </h1>
      </div>

      {/* 정보 리스트 */}
      <div className="flex-1 space-y-5">
        <InfoRow label="구매일" value={formatDate(data.purchasedAt)} />
        <InfoRow label="닉네임" value={data.purchaserNickname} />
        <InfoRow label="이메일" value={data.purchaserEmail} />
        <InfoRow label="전화번호" value={data.purchaserPhoneNumber} />
        <InfoRow label="옵션" value={data.selectedOptionName} />
        <InfoRow label="결제" value={formatPrice(data.finalPrice)} />
      </div>
    </div>
  );
}
