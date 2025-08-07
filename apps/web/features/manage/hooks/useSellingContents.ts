import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSellingContents,
  deleteContent,
  activateContent,
  toggleContentSale,
  stopProductSale,
} from '../api/productApi';
import type { ContentStatus } from '../types/productTypes';

interface UseSellingContentsParams {
  state?: ContentStatus;
  page?: number;
}

interface UseSellingContentsResult {
  items: any[];
  pageInfo: any;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useSellingContents({
  state,
  page = 0,
}: UseSellingContentsParams = {}): UseSellingContentsResult {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['selling-contents', state, page],
    queryFn: () =>
      getSellingContents({
        page,
        size: 12,
        sort: 'createdAt',
        state,
      }),
    staleTime: 1000 * 60 * 5, // 5분
  });

  return {
    items: data?.data?.items ?? [],
    pageInfo: data?.data?.pageInfo,
    isLoading,
    isError,
    error: error as Error | null,
  };
}

export function useActivateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleContentSale,
    onSuccess: () => {
      // 판매 활성화 성공 시 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['selling-contents'] });
    },
  });
}

export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContent,
    onSuccess: () => {
      // 콘텐츠 삭제 성공 시 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['selling-contents'] });
    },
  });
}

export function useStopContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stopProductSale,
    onSuccess: () => {
      // 판매 중단 성공 시 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['selling-contents'] });
    },
  });
}
