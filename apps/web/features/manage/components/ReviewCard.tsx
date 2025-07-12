import { useState } from 'react';
import { Button, Modal } from '@groble/ui';
import StarRating from './StarRating';
import type { MyReview } from '../types/purchaseTypes';
import { XIcon } from '@/components/(improvement)/icons/XIcon';
import { useDeleteReview } from '../hooks/useReview';
import { showToast } from '@/shared/ui/Toast';

interface ReviewCardProps {
  review: MyReview;
  contentId: number;
  onEdit?: (reviewId: number) => void;
  onDelete?: () => void;
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

export default function ReviewCard({
  review,
  contentId,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const { mutate: deleteReview, isLoading: isDeleting } = useDeleteReview(
    () => {
      showToast.success('리뷰가 삭제되었습니다.');
      setIsDeleteModalOpen(false);
      if (onDelete) {
        onDelete();
      }
    },
    (error) => {
      console.error('리뷰 삭제 실패:', error);
      showToast.error('리뷰 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  );

  const handleDeleteConfirm = () => {
    deleteReview({
      contentId,
      reviewId: review.reviewId,
    });
  };

  return (
    <div className="bg-white xs:rounded-xl p-5 ">
      <div className="flex justify-between">
        <h3 className="text-headline-1 text-label-normal font-semibold">
          내가 작성한 리뷰
        </h3>
        {/* 삭제하기 버튼 */}
        <span className="cursor-pointer" onClick={handleDeleteClick}>
          <XIcon />
        </span>
      </div>

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

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        title="리뷰를 삭제할까요?"
        subText="삭제하면 다시 복구할 수 없어요."
        actionButton="삭제하기"
        secondaryButton="취소"
        actionButtonColor="danger"
        onActionClick={handleDeleteConfirm}
        onSecondaryClick={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
