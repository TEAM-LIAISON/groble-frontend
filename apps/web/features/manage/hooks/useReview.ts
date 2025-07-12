import { useMutation } from '@tanstack/react-query';
import { createReview } from '../api/purchaseApi';
import type { ApiResponse } from '@/shared/types/api-types';

interface UseReviewResult {
  mutate: (data: {
    contentId: number;
    reviewData: {
      rating: number;
      reviewContent: string;
    };
  }) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  data: ApiResponse<void> | undefined;
}

export function useReview(
  onSuccess?: (data: ApiResponse<void>) => void,
  onError?: (error: Error) => void
): UseReviewResult {
  const mutation = useMutation({
    mutationFn: ({
      contentId,
      reviewData,
    }: {
      contentId: number;
      reviewData: {
        rating: number;
        reviewContent: string;
      };
    }) => createReview(contentId, reviewData),
    onSuccess,
    onError,
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
}
