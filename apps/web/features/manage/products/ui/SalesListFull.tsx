import ClickableSalesItem from './ClickableSalesItem';
import type { ContentSellDetailResponse } from '../types/productDetailTypes';
import NoContent from '@/shared/ui/NoContent';
import Pagination from '@/shared/ui/Pagination';

interface SalesListFullProps {
  data: ContentSellDetailResponse[];
  contentId: string;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
}

export default function SalesListFull({
  data,
  contentId,
  currentPage,
  totalPages,
  isLoading,
}: SalesListFullProps) {
  if (data.length === 0 && !isLoading) {
    return (
      <section className="">
        <div className="flex mb-4">
          <h2 className="text-headline-1 font-bold text-label-normal">
            판매 리스트
          </h2>
        </div>

        <NoContent
          message="아직 판매 내역이 없어요."
          mainTextClassName="text-body-1-normal text-label-normal"
        />
      </section>
    );
  }

  return (
    <section className="">
      <h1 className="text-heading-1 font-bold text-label-normal mb-4">
        {data[0].contentTitle}
      </h1>
      <div className="flex mb-4">
        <h2 className="text-headline-1 font-bold text-label-normal">
          판매 리스트
        </h2>
      </div>

      {/* 스크롤 가능한 테이블 컨테이너 */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg border-b border-gray-200 min-w-[800px]">
          {/* 헤더 */}
          <div
            className="grid gap-[2.5rem] py-3 text-body-2-normal font-semibold text-label-alternative border-b border-line-normal"
            style={{
              gridTemplateColumns:
                '8.5rem 8.5rem 11.75rem 7.5rem 7.5rem minmax(10rem, 1fr)',
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
              <ClickableSalesItem
                key={item.purchaseId}
                item={item}
                contentId={contentId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </section>
  );
}
