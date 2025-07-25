'use client';

import Image from 'next/image';
import StarRating from '@/shared/ui/StarRating';
import DropdownMenu, {
  type DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import type { ContentReview } from '@/entities/product/model';

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
  // 드롭다운 메뉴 아이템들
  const dropdownItems: DropdownMenuItem[] = [
    {
      id: 'edit',
      label: '수정하기',
      onClick: () => onEdit?.(review.reviewId),
    },
    {
      id: 'delete',
      label: '삭제하기',
      onClick: () => onDelete?.(review.reviewId),
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

  return (
    <div className="">
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
        {!review.isReviewManage && (
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
  );
}
