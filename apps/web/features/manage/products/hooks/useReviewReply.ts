import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postReviewReply,
  updateReviewReply,
  deleteReviewReply,
} from '../api/productDetailApi';
import type {
  ReviewReplyRequest,
  ReplyModifyRequest,
} from '../types/productDetailTypes';

// 답글 작성 훅
export const useReviewReply = (contentId: string, reviewId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReviewReplyRequest) => postReviewReply(reviewId, data),
    onSuccess: () => {
      // 리뷰 상세 데이터를 다시 불러와서 새로운 답글을 반영
      queryClient.invalidateQueries({
        queryKey: ['reviewDetail', contentId, reviewId.toString()],
      });
    },
  });
};

// 답글 수정 훅
export const useReviewReplyUpdate = (
  contentId: string,
  reviewId: number,
  replyId: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReplyModifyRequest) =>
      updateReviewReply(reviewId, replyId, data),
    onSuccess: () => {
      // 리뷰 상세 데이터를 다시 불러와서 수정된 답글을 반영
      queryClient.invalidateQueries({
        queryKey: ['reviewDetail', contentId, reviewId.toString()],
      });
    },
  });
};

// 답글 삭제 훅
export const useReviewReplyDelete = (
  contentId: string,
  reviewId: number,
  replyId: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteReviewReply(reviewId, replyId),
    onSuccess: () => {
      // 리뷰 상세 데이터를 다시 불러와서 삭제된 답글을 반영
      queryClient.invalidateQueries({
        queryKey: ['reviewDetail', contentId, reviewId.toString()],
      });
    },
  });
};
