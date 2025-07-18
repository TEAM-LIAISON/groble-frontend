'use client';

import { useState } from 'react';
import type { ReviewDetailResponse } from '../types/productDetailTypes';
import { ChevronIcon } from '@/components/(improvement)/icons';
import { Button, TextAreaTextField } from '@groble/ui';
import { useReviewReply, useReviewReplyUpdate } from '../hooks/useReviewReply';
import { useReviewDetail } from '../hooks/useReviewDetail';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import ReviewReplyItem from './ReviewReplyItem';
import { showToast } from '@/shared/ui/Toast';

interface ReviewDetailInfoProps {
  reviewId: string;
  contentId: string;
}

export default function ReviewDetailInfo({
  reviewId,
  contentId,
}: ReviewDetailInfoProps) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);

  const { data: reviewDetailResponse, isLoading } = useReviewDetail(
    contentId,
    reviewId
  );

  // 답글 작성 mutation
  const { mutate: submitReply, isPending } = useReviewReply(
    contentId,
    Number(reviewId)
  );

  // 수정할 답글이 선택되었을 때만 수정 mutation 생성
  const updateMutation = useReviewReplyUpdate(
    contentId,
    Number(reviewId),
    editingReplyId || 0
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (!reviewDetailResponse?.data) {
    return (
      <div className="text-center py-8 text-label-alternative">
        리뷰 정보를 불러올 수 없습니다.
      </div>
    );
  }

  const data = reviewDetailResponse.data;
  const hasReplies = data.reviewReplies && data.reviewReplies.length > 0;

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

  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | React.ReactNode;
  }) => (
    <div className="flex">
      <div className="w-[5.5rem] text-body-2-normal text-label-alternative font-semibold flex-shrink-0">
        {label}
      </div>
      <div className="text-body-2-normal text-label-normal font-semibold">
        {value}
      </div>
    </div>
  );

  const toggleReply = () => {
    if (editingReplyId) {
      // 수정 모드 취소
      setEditingReplyId(null);
      setReplyContent('');
      setIsReplyOpen(false);
    } else {
      setIsReplyOpen(!isReplyOpen);
      if (!isReplyOpen) {
        setReplyContent(''); // 열 때 내용 초기화
      }
    }
  };

  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
      showToast.warning('답글 내용을 입력해주세요.');
      return;
    }

    if (editingReplyId) {
      // 수정 모드
      updateMutation.mutate(
        { replyContent: replyContent.trim() },
        {
          onSuccess: () => {
            showToast.success('답글이 수정되었습니다.');
            setIsReplyOpen(false);
            setReplyContent('');
            setEditingReplyId(null);
          },
          onError: (error) => {
            showToast.error('답글 수정에 실패했습니다.');
            console.error('답글 수정 실패:', error);
          },
        }
      );
    } else {
      // 새 답글 작성
      submitReply(
        { replyContent: replyContent.trim() },
        {
          onSuccess: () => {
            showToast.success('답글이 등록되었습니다.');
            setIsReplyOpen(false);
            setReplyContent('');
          },
          onError: (error) => {
            showToast.error('답글 등록에 실패했습니다.');
            console.error('답글 등록 실패:', error);
          },
        }
      );
    }
  };

  const handleEditReply = (replyId: number, content: string) => {
    setEditingReplyId(replyId);
    setReplyContent(content);
    setIsReplyOpen(true);
  };

  return (
    <div className="min-h-[calc(100vh-226px)] flex flex-col">
      {/* 제목과 삭제 요청 버튼 */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-heading-1 font-bold text-label-normal flex-1 mr-4">
          {data.contentTitle}
        </h1>
        <button className="bg-[#FEECEC] text-status-error px-4 py-2 rounded-lg text-body-2-normal font-medium hover:bg-red-100 transition-colors flex-shrink-0 cursor-pointer">
          리뷰 삭제 요청
        </button>
      </div>

      {/* 정보 리스트 */}
      <div className="flex-1 space-y-5">
        <InfoRow label="작성일" value={formatDate(data.createdAt)} />
        <InfoRow label="닉네임" value={data.reviewerNickname} />
        <InfoRow label="상품명" value={data.contentTitle} />
        <InfoRow label="옵션" value={data.selectedOptionName} />
        <InfoRow
          label="별점"
          value={
            <div className="flex items-center gap-1">
              {renderStars(data.rating)}
            </div>
          }
        />
        <InfoRow label="내용" value={data.reviewContent} />

        {/* 답글 목록 - 내용 바로 아래에 배치 */}
        {hasReplies && (
          <>
            <hr className="border-line-normal ml-[5.5rem] " />
            <div className="flex w-full">
              <div className="w-[5.5rem] flex-shrink-0"></div>
              <div className="flex flex-col w-full gap-3">
                {data.reviewReplies.map((reply) => (
                  <ReviewReplyItem
                    key={reply.replyId}
                    reply={reply}
                    reviewId={Number(reviewId)}
                    contentId={contentId}
                    onEditReply={handleEditReply}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* 답글 달기 버튼 - 답글이 없을 때만 표시 */}
        {!hasReplies && (
          <div className="flex mt-[0.81rem]">
            <div className="w-[5.5rem] flex-shrink-0"></div>
            <div>
              <button
                onClick={toggleReply}
                className="flex items-center cursor-pointer gap-2 text-body-2-normal text-label-alternative font-medium hover:text-label-normal transition-colors"
              >
                {editingReplyId ? '답글 수정' : '답글 달기'}
                <ChevronIcon className={`${isReplyOpen ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 답글 입력창 - 기존 위치 유지 */}
      {isReplyOpen && (
        <div className="space-y-4">
          <TextAreaTextField
            placeholder="리뷰 답글을 작성해주세요."
            className="w-full h-[7.5rem] p-4 resize-none"
            type="border"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-3">
            <Button
              onClick={toggleReply}
              group="solid"
              type="secondary"
              size="x-small"
              disabled={
                isPending || (!!editingReplyId && updateMutation.isPending)
              }
            >
              취소
            </Button>
            <Button
              group="solid"
              type="primary"
              size="x-small"
              onClick={handleSubmitReply}
              disabled={
                isPending ||
                !replyContent.trim() ||
                (!!editingReplyId && updateMutation.isPending)
              }
            >
              {isPending || (!!editingReplyId && updateMutation.isPending)
                ? editingReplyId
                  ? '수정 중...'
                  : '등록 중...'
                : editingReplyId
                ? '수정하기'
                : '등록하기'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
