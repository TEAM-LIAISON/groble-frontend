import SalesItem from './SalesItem';
import type { ContentSellItem } from '../types/productDetailTypes';
import NoContent from '@/shared/ui/NoContent';
import ChevronRightIcon from '@/shared/icons/ChevronRightIcon';
import Link from 'next/link';

interface SalesListProps {
  data: ContentSellItem[];
  contentId: string;
}

export default function SalesList({ data, contentId }: SalesListProps) {
  if (data.length === 0) {
    return (
      <section className="mb-8">
        <div className="flex mb-4">
          <h2 className="text-headline-1 font-bold text-label-normal">
            판매 리스트
          </h2>
        </div>

        <NoContent
          message="아직 내역이 없어요."
          mainTextClassName="text-body-1-normal text-label-normal"
        />
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">판매 리스트</h2>
        <Link
          href={`/manage/store/products/${contentId}/sales`}
          className="text-body-2-normal text-primary-sub-1 flex items-center gap-1 cursor-pointer hover:underline"
        >
          전체 보기
          <ChevronRightIcon />
        </Link>
      </div>

      {/* 스크롤 가능한 테이블 컨테이너 */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg border-b border-gray-200 min-w-[800px]">
          {/* 헤더 */}
          <div
            className="grid gap-[2.5rem] py-3 text-body-2-normal font-semibold text-label-alternative border-b border-line-normal"
            style={{
              gridTemplateColumns: '8.5rem 8.5rem 9.75rem 7.5rem 7.5rem 1fr',
            }}
          >
            <div>구매일</div>
            <div>닉네임</div>
            <div>이메일</div>
            <div>전화번호</div>
            <div>옵션</div>
            <div>결제</div>
          </div>

          {/* 리스트 */}
          <div className="">
            {data.map((item) => (
              <SalesItem key={item.purchaseId} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
