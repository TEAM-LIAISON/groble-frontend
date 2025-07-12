import { useMutation } from '@tanstack/react-query';
import { createReview, updateReview } from '../api/purchaseApi';
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
  data: ApiResponse<any> | undefined;
}

export function useReview(
  onSuccess?: (data: ApiResponse<any>) => void,
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

interface UseUpdateReviewResult {
  mutate: (data: {
    contentId: number;
    reviewId: number;
    reviewData: {
      rating: number;
      reviewContent: string;
    };
  }) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  data: ApiResponse<any> | undefined;
}

export function useUpdateReview(
  onSuccess?: (data: ApiResponse<any>) => void,
  onError?: (error: Error) => void
): UseUpdateReviewResult {
  const mutation = useMutation({
    mutationFn: ({
      contentId,
      reviewId,
      reviewData,
    }: {
      contentId: number;
      reviewId: number;
      reviewData: {
        rating: number;
        reviewContent: string;
      };
    }) => updateReview(contentId, reviewId, reviewData),
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
