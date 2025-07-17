import { useRouter } from 'next/navigation';
import type { ContentSellDetailResponse } from '../types/productDetailTypes';

interface ClickableSalesItemProps {
  item: ContentSellDetailResponse;
  contentId: string;
}

export default function ClickableSalesItem({
  item,
  contentId,
}: ClickableSalesItemProps) {
  const router = useRouter();

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

  const handleClick = () => {
    router.push(`/manage/store/products/${contentId}/sales/${item.purchaseId}`);
  };

  return (
    <div
      className="grid gap-[2.5rem] py-4 border-b border-gray-100 text-body-2-normal font-semibold text-label-normal cursor-pointer hover:bg-gray-50 transition-colors"
      style={{
        gridTemplateColumns:
          '8.5rem 8.5rem 11.75rem 7.5rem 7.5rem minmax(10rem, 1fr)',
      }}
      onClick={handleClick}
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
    </div>
  );
}
