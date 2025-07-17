import { useRouter } from 'next/navigation';
import type { ContentReviewDetailResponse } from '../types/productDetailTypes';

interface ClickableReviewItemProps {
  item: ContentReviewDetailResponse;
  contentId: string;
}

export default function ClickableReviewItem({
  item,
  contentId,
}: ClickableReviewItemProps) {
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

  const handleClick = () => {
    router.push(`/manage/store/products/${contentId}/reviews/${item.reviewId}`);
  };

  return (
    <div
      className="grid gap-[2.5rem] py-4 border-b border-gray-100 text-body-2-normal font-semibold text-label-normal cursor-pointer hover:bg-gray-50 transition-colors"
      style={{
        gridTemplateColumns: '8.5rem 8.5rem 7.5rem 7.5rem minmax(10rem, 1fr)',
      }}
      onClick={handleClick}
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
    </div>
  );
}
