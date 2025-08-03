import ChevronRightIcon from '@/shared/icons/ChevronRightIcon';
import NoContent from '@/shared/ui/NoContent';
import Link from 'next/link';
import type { ContentReviewItem } from '../types/productDetailTypes';
import ReviewItem from './ReviewItem';

interface ReviewsListProps {
  data: ContentReviewItem[];
  contentId: string;
}

export default function ReviewsList({ data, contentId }: ReviewsListProps) {
  if (data.length === 0) {
    return (
      <section className="mt-12">
        <div className="flex mb-4">
          <h2 className="text-headline-1 font-bold text-label-normal">
            리뷰 내역
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
    <section className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-body-1-normal md:text-headline-1 text-label-normal font-bold">
          리뷰 내역
        </h2>
        <Link
          href={`/manage/store/products/${contentId}/reviews`}
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
              gridTemplateColumns:
                '8.5rem 8.5rem 7.5rem 7.5rem minmax(10rem, 1fr)',
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
              <ReviewItem key={item.reviewId} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
