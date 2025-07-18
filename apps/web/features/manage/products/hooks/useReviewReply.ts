import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReviewReply, updateReviewReply } from '../api/productDetailApi';
import type {
  ReviewReplyRequest,
  ReplyModifyRequest,
} from '../types/productDetailTypes';

// 답글 작성 훅
export const useReviewReply = (reviewId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReviewReplyRequest) => postReviewReply(reviewId, data),
    onSuccess: () => {
      // 리뷰 상세 데이터를 다시 불러와서 새로운 답글을 반영
      queryClient.invalidateQueries({
        queryKey: ['reviewDetail', reviewId],
      });
    },
  });
};

// 답글 수정 훅
export const useReviewReplyUpdate = (reviewId: number, replyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReplyModifyRequest) =>
      updateReviewReply(reviewId, replyId, data),
    onSuccess: () => {
      // 리뷰 상세 데이터를 다시 불러와서 수정된 답글을 반영
      queryClient.invalidateQueries({
        queryKey: ['reviewDetail', reviewId],
      });
    },
  });
};
