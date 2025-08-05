import ReviewItem from './ReviewItem';
import type { ContentReviewDetailResponse } from '../types/productDetailTypes';
import NoContent from '@/shared/ui/NoContent';
import Pagination from '@/shared/ui/Pagination';

interface ReviewsListFullProps {
  data: ContentReviewDetailResponse[];
  contentId: string;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
}

export default function ReviewsListFull({
  data,
  contentId,
  currentPage,
  totalPages,
  isLoading,
}: ReviewsListFullProps) {
  if (data.length === 0 && !isLoading) {
    return (
      <section className="">
        <div className="flex mb-4">
          <h2 className="text-body-1-normal md:text-headline-1 font-bold text-label-normal">
            리뷰 내역
          </h2>
        </div>

        <NoContent
          message="아직 리뷰가 없어요."
          mainTextClassName="text-body-1-normal text-label-normal"
        />
      </section>
    );
  }

  return (
    <section className="">
      <h1 className="text-headline-1 md:text-heading-1 font-bold text-label-normal mb-6 md:mb-4">
        {data[0]?.contentTitle}
      </h1>
      <div className="flex mb-4">
        <h2 className="text-body-1-normal md:text-headline-1 font-bold text-label-normal">
          리뷰 내역
        </h2>
      </div>

      {/* 스크롤 가능한 테이블 컨테이너 */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg min-w-[1080px]">
          {/* 헤더 */}
          <div
            className="grid gap-[2.5rem] px-3 py-3 text-body-2-normal font-semibold text-label-alternative border-b border-line-normal"
            style={{
              gridTemplateColumns:
                '10.5rem 8.5rem 7.5rem 7.5rem minmax(10rem, 1fr)',
            }}
          >
            <div>작성일</div>
            <div>닉네임</div>
            <div>옵션</div>
            <div>별점</div>
            <div>내용</div>
          </div>

          {/* 리스트 */}
          <div className="">
            {data.map((item) => (
              <ReviewItem
                key={item.reviewId}
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
