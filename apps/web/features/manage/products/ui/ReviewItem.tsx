import Link from 'next/link';
import type { ContentReviewDetailResponse } from '../types/productDetailTypes';

interface ReviewItemProps {
  item: ContentReviewDetailResponse;
  contentId: string;
}

export default function ReviewItem({ item, contentId }: ReviewItemProps) {
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

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-label-normal">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-label-normal">
            ☆
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <Link
      href={`/manage/store/products/${contentId}/reviews/${item.reviewId}`}
      className="grid gap-[2.5rem] px-3 pt-3 pb-2 text-body-2-normal font-semibold text-label-normal hover:bg-background-alternative"
      style={{
        gridTemplateColumns: '10.5rem 8.5rem 7.5rem 7.5rem minmax(10rem, 1fr)',
      }}
    >
      {/* 작성일 */}
      <div>
        <span className="">{formatDate(item.createdAt)}</span>
      </div>

      {/* 닉네임 */}
      <div>
        <span className="">{item.reviewerNickname}</span>
      </div>

      {/* 옵션 */}
      <div>
        <span className="block truncate" title={item.selectedOptionName}>
          {item.selectedOptionName}
        </span>
      </div>

      {/* 별점 */}
      <div>
        <div className="flex items-center gap-1">
          {renderStars(item.rating)}
        </div>
      </div>

      {/* 내용 */}
      <div className="max-w-[26.25rem]">
        <p className="line-clamp-2 truncate" title={item.reviewContent}>
          {item.reviewContent}
        </p>
      </div>
    </Link>
  );
}
