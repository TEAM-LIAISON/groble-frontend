import { Button } from '@groble/ui';
import Image from 'next/image';
import Link from 'next/link';
import { PurchaseContentItem } from '../types/purchase-types';

export default function ProductManageItem({
  item,
  index,
}: {
  item: PurchaseContentItem;
  index: number;
}) {
  return (
    <Link
      key={`${item.contentId}-${index}`}
      href={`/manage/product/${item.contentId}`}
      className="flex flex-col gap-4"
    >
      <div className="relative aspect-[335/251] w-full border border-line-normal rounded-xl">
        <Image
          src={item.thumbnailUrl}
          alt={item.title}
          fill
          className="rounded-xl"
        />
      </div>

      {/* 콘텐츠 정보 */}
      <div className="flex flex-col gap-[0.12rem]">
        {/* 상태, 날짜 */}
        <div className="flex items-center gap-1">
          <p className="text-caption-1 font-semibold text-label-neutral">
            {/* PAID, EXPIRED, CANCELLED */}
            {item.orderStatus === 'PAID' ? (
              <p className="text-status-success">결제완료</p>
            ) : item.orderStatus === 'EXPIRED' ? (
              <p className="text-label-neutral">기간만료</p>
            ) : (
              <p className="text-status-error">결제취소</p>
            )}
          </p>
          <p className="text-caption-1 text-label-neutral">·</p>
          <p className="text-caption-1 text-label-neutral">
            {/* 날짜 포맷팅  ex 2025.08.12 */}
            {new Date(item.purchasedAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: 'numeric',
            })}
          </p>
        </div>
        {/* 제목 */}
        <p className="line-clamp-2 text-body-1-normal font-semibold text-label-normal">
          {item.title}
        </p>

        <p className="text-label-1-reading text-label-alternative">
          {item.sellerName}
        </p>

        <div className="flex text-body-1-normal text-label-normal">
          <p className="font-bold">{item.finalPrice}</p>
          <p className="">원</p>
        </div>
      </div>

      {/* 버튼 */}
      {item.contentType === 'CONTENT' ? (
        <div className="flex items-center gap-2">
          <Button
            size="small"
            type="secondary"
            group="solid"
            className="w-full"
          >
            문의하기
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            size="small"
            type="secondary"
            group="solid"
            className="w-full"
          >
            문의하기
          </Button>
          <Button size="small" type="tertiary" className="w-full">
            다운로드
          </Button>
        </div>
      )}
    </Link>
  );
}
