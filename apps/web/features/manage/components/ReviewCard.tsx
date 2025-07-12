import { Button } from '@groble/ui';
import StarRating from './StarRating';
import type { MyReview } from '../types/purchaseTypes';

interface ReviewCardProps {
  review: MyReview;
  onEdit?: (reviewId: number) => void;
}

// 별점에 따른 텍스트 반환
function getRatingText(rating: number): string {
  switch (rating) {
    case 1:
      return '매우 불만족';
    case 2:
      return '불만족';
    case 3:
      return '보통';
    case 4:
      return '만족';
    case 5:
      return '매우 만족';
    default:
      return '';
  }
}

export default function ReviewCard({ review, onEdit }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(review.reviewId);
    }
  };

  return (
    <div className="bg-white xs:rounded-xl p-5 ">
      <h3 className="text-headline-1 text-label-normal font-semibold">
        내가 작성한 리뷰
      </h3>

      <hr className="my-3 border-line-normal" />

      <div className="flex flex-col">
        {/* 별점 */}
        <div className="flex items-center gap-3 justify-between">
          <StarRating rating={review.rating} readOnly size="small" />

          {onEdit && (
            <Button
              onClick={handleEdit}
              size="x-small"
              group="outlined"
              type="tertiary"
              className="text-label-normal"
            >
              수정
            </Button>
          )}
        </div>

        {/* 리뷰 내용 */}
        {review.reviewContent && (
          <div className="text-label-1-normal text-label-normal">
            {review.reviewContent}
          </div>
        )}

        {/* 작성일 */}
        <div className="text-caption-1 text-label-alternative">
          {formatDate(review.createdAt)}
        </div>
      </div>
    </div>
  );
}
