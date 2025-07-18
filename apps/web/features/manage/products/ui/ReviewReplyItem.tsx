'use client';

import { useState } from 'react';
import { DropdownMenu } from '@/components/ui';
import type { DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { useReviewReplyUpdate } from '../hooks/useReviewReply';
import type { ReviewReply } from '../types/productDetailTypes';

interface ReviewReplyItemProps {
  reply: ReviewReply;
  reviewId: number;
  onEditReply: (replyId: number, content: string) => void;
}

const InfoRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-4">
    <div className="w-20 flex-shrink-0 text-label-alternative text-body-2-normal">
      {label}
    </div>
    <div className="text-label-normal text-body-2-normal">{children}</div>
  </div>
);

export default function ReviewReplyItem({
  reply,
  reviewId,
  onEditReply,
}: ReviewReplyItemProps) {
  const dropdownItems: DropdownMenuItem[] = [
    {
      id: 'edit',
      label: '수정하기',
      onClick: () => handleEdit(),
    },
    {
      id: 'delete',
      label: '삭제하기',
      onClick: () => handleDelete(),
      destructive: true,
    },
  ];

  const handleEdit = () => {
    onEditReply(reply.replyId, reply.replyContent);
  };

  const handleDelete = () => {
    // TODO: 삭제 기능은 아직 연결하지 않음
    console.log('삭제 기능은 추후 구현 예정');
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-4 items-start flex-1 min-w-0">
        {/* 답글 라벨 - 고정 크기 */}
        <span className="text-body-2-normal text-label-alternative font-semibold flex items-center gap-1 flex-shrink-0">
          {/* 들여쓰기 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
          >
            <path
              d="M0.474609 3.95078V0.0507812H1.53961V2.88578H7.52461V3.95078H0.474609Z"
              fill="#878A93"
            />
          </svg>
          답글
        </span>
        {/* 답글 내용 - 남은 공간 모두 사용 */}
        <p className="text-body-2-normal font-semibold text-label-normal leading-[1.37rem] whitespace-pre-line flex-1 min-w-0 break-words">
          {reply.replyContent}
        </p>
      </div>
      <DropdownMenu
        items={dropdownItems}
        dotDirection="vertical"
        className="flex-shrink-0 ml-9"
      />
    </div>
  );
}
