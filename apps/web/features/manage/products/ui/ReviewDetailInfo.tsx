'use client';

import { useState } from 'react';
import type { ReviewDetailResponse } from '../types/productDetailTypes';
import { ChevronIcon } from '@/components/(improvement)/icons';
import { Button, TextAreaTextField } from '@groble/ui';

interface ReviewDetailInfoProps {
  data: ReviewDetailResponse;
}

export default function ReviewDetailInfo({ data }: ReviewDetailInfoProps) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

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
    setIsReplyOpen(!isReplyOpen);
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

        {/* 답글 달기 버튼 - 내용 바로 아래에 배치 */}
        <div className="flex mt-[0.81rem]">
          <div className="w-[5.5rem] flex-shrink-0"></div>
          <div>
            <button
              onClick={toggleReply}
              className="flex items-center cursor-pointer gap-2 text-body-2-normal text-label-alternative font-medium hover:text-label-normal transition-colors"
            >
              답글 달기
              <ChevronIcon className={`${isReplyOpen ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 답글 입력창 - 기존 위치 유지 */}
      {isReplyOpen && (
        <div className="space-y-4">
          <TextAreaTextField
            placeholder="리뷰 답글을 작성해주세요."
            className="w-full h-[7.5rem] p-4 resize-none "
            type="border"
          />
          <div className="flex justify-end gap-2 mt-3">
            <Button
              onClick={toggleReply}
              group="solid"
              type="secondary"
              size="x-small"
            >
              취소
            </Button>
            <Button group="solid" type="primary" size="x-small">
              등록하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
