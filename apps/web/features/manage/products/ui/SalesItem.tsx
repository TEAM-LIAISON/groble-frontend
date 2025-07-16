import type { ContentSellItem } from '../types/productDetailTypes';

interface SalesItemProps {
  item: ContentSellItem;
}

export default function SalesItem({ item }: SalesItemProps) {
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

  return (
    <div className="grid grid-cols-6 gap-4 py-4 border-b border-gray-100 text-body-2-normal font-semibold text-label-normal">
      {/* 구매일 */}
      <div>
        <span className="">{formatDate(item.purchasedAt)}</span>
      </div>

      {/* 닉네임 */}
      <div>
        <span className="">{item.purchaserNickname}</span>
      </div>

      {/* 이메일 */}
      <div>
        <span className="">{item.purchaserEmail}</span>
      </div>

      {/* 전화번호 */}
      <div>
        <span className="">{item.purchaserPhoneNumber}</span>
      </div>

      {/* 옵션 */}
      <div className="w-[7.5rem]">
        <span className=" block truncate" title={item.selectedOptionName}>
          {item.selectedOptionName}
        </span>
      </div>

      {/* 결제 */}
      <div>
        <span className="">{formatPrice(item.finalPrice)}</span>
      </div>
    </div>
  );
}
