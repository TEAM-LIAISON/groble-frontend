'use client';

import DropdownMenu, {
  type DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import type { ContentReview } from '@/entities/product/model';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import StarRating from '@/shared/ui/StarRating';
import { showToast } from '@/shared/ui/Toast';
import { Modal } from '@groble/ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteReview } from '../api/review-api';

interface ReviewItemProps {
  review: ContentReview;
  onEdit?: (reviewId: number) => void;
  onDelete?: (reviewId: number) => void;
}

export default function ReviewItem({
  review,
  onEdit,
  onDelete,
}: ReviewItemProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 리뷰 수정 페이지로 이동
  const handleEditReview = () => {
    const editUrl = `/manage/purchase/${review.merchantUid}/review?mode=edit&reviewId=${review.reviewId}`;
    router.push(editUrl);
    // 기존 콜백도 호출 (필요시)
    onEdit?.(review.reviewId);
  };

  // 드롭다운 메뉴 아이템들
  const dropdownItems: DropdownMenuItem[] = [
    {
      id: 'edit',
      label: '수정하기',
      onClick: handleEditReview,
    },
    {
      id: 'delete',
      label: '삭제하기',
      onClick: () => setIsDeleteModalOpen(true),
      destructive: true,
    },
  ];

  // 날짜 포맷팅 함수
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  // 리뷰 삭제 처리
  const handleDeleteReview = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteReview(review.reviewId);
      showToast.success('리뷰가 삭제되었습니다.');
      setIsDeleteModalOpen(false);
      // 부모 컴포넌트에 삭제 완료 알림
      onDelete?.(review.reviewId);
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
      showToast.error('리뷰 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="border-b border-line-normal pb-6 last:border-b-0">
        {/* 리뷰 헤더 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* 프로필 이미지 */}
            <div className="w-9 h-9 rounded-full overflow-hidden bg-background-alternative flex-shrink-0">
              {review.reviewerProfileImageUrl ? (
                <Image
                  src={review.reviewerProfileImageUrl}
                  alt={`${review.reviewerNickname} 프로필`}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-component-fill-alternative" />
              )}
            </div>

            {/* 사용자 정보 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <StarRating rating={review.rating} size={20} />
                <span className="text-body-2-normal font-bold">
                  {review.rating}
                </span>
              </div>
              <div className="flex mt-1 gap-1">
                <span className="text-body-2-normal text-label-alternative font-medium">
                  {review.reviewerNickname}
                </span>
                <span className="text-label-assistive">•</span>
                <span className="text-body-2-normal text-label-alternative">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* 더보기 메뉴 (리뷰 관리 권한이 있는 경우에만) */}
          {review.isReviewManage && (
            <DropdownMenu
              items={dropdownItems}
              dotDirection="vertical"
              className="flex-shrink-0"
            />
          )}
        </div>

        {/* 리뷰 내용 */}
        <div className="mb-3">
          <p className="text-body-2-reading text-label-neutral whitespace-pre-wrap">
            {review.reviewContent}
          </p>
        </div>

        {/* 구매 옵션 */}
        <div className="mb-4">
          <span className="text-label-1-normal text-label-alternative">
            옵션 <span className="text-label-assistive">|</span>{' '}
            {review.selectedOptionName}
          </span>
        </div>

        {/* 답글 (있는 경우에만) */}
        {review.reviewReplies && review.reviewReplies.length > 0 && (
          <div className="bg-background-alternative rounded-lg p-4 space-y-3">
            {review.reviewReplies.map((reply) => (
              <div key={reply.replyId} className="flex">
                {/* 답글 내용 */}
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-body-2-normal font-medium text-label-normal">
                      {reply.replierNickname}
                    </span>
                    <span className="text-label-assistive text-body-2-normal">
                      •
                    </span>
                    <span className="text-body-2-normal text-label-alternative">
                      {formatDate(reply.createdAt)}
                    </span>
                  </div>
                  <p className="text-body-2-reading text-label-neutral whitespace-pre-wrap">
                    {reply.replyContent}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        title="리뷰를 삭제할까요?"
        subText="삭제하면 다시 복구할 수 없어요."
        actionButton={isDeleting ? '삭제 중...' : '삭제하기'}
        secondaryButton="취소"
        onActionClick={handleDeleteReview}
        onSecondaryClick={() => setIsDeleteModalOpen(false)}
        actionButtonColor="danger"
      />
    </>
  );
}
