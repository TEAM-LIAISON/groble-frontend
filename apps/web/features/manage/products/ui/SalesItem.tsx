import Link from 'next/link';
import type { ContentSellDetailResponse } from '../types/productDetailTypes';

interface SalesItemProps {
  item: ContentSellDetailResponse;
  contentId: string;
}

export default function SalesItem({ item, contentId }: SalesItemProps) {
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
    return `${price.toLocaleString()}원`;
  };

  return (
    <Link
      href={`/manage/store/products/${contentId}/sales/${item.purchaseId}`}
      className="grid gap-[2.5rem] px-3 pt-3 pb-2 text-body-2-normal font-semibold text-label-normal hover:bg-background-alternative"
      style={{
        gridTemplateColumns: '10.5rem 8.5rem 11.75rem 7.5rem 7.5rem 1fr',
      }}
    >
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
      <div>
        <span className="block truncate" title={item.selectedOptionName}>
          {item.selectedOptionName}
        </span>
      </div>

      {/* 결제 */}
      <div>
        <span className="">{formatPrice(item.finalPrice)}</span>
      </div>
    </Link>
  );
}
