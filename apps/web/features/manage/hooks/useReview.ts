import type { ApiResponse } from '@/shared/types/api-types';
import { useMutation } from '@tanstack/react-query';
import { createReview, deleteReview, updateReview } from '../api/purchaseApi';

interface UseReviewResult {
  mutate: (data: {
    merchantUid: string;
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
      merchantUid,
      reviewData,
    }: {
      merchantUid: string;
      reviewData: {
        rating: number;
        reviewContent: string;
      };
    }) => createReview(merchantUid, reviewData),
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
      reviewId,
      reviewData,
    }: {
      reviewId: number;
      reviewData: {
        rating: number;
        reviewContent: string;
      };
    }) => updateReview(reviewId, reviewData),
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

interface UseDeleteReviewResult {
  mutate: (data: { reviewId: number }) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  data: ApiResponse<any> | undefined;
}

export function useDeleteReview(
  onSuccess?: (data: ApiResponse<any>) => void,
  onError?: (error: Error) => void
): UseDeleteReviewResult {
  const mutation = useMutation({
    mutationFn: ({ reviewId }: { reviewId: number }) => deleteReview(reviewId),
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
