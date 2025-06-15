'use client';

import { Content } from '../model/ContentType';
import { useQuery } from '@tanstack/react-query';
import { Paginated } from '@/shared/types/PaginationTypes';
import { fetchContents } from '../model/contentApi';

export type UseContentsResult = {
  contents: Content[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
};

export function useContents(
  page: number = 1,
  initialSize = 8,
  initialSort = 'createdAt,desc'
): UseContentsResult {
  const { data, isLoading, error } = useQuery<Paginated<Content>>({
    queryKey: ['admin-contents', page, initialSize, initialSort],
    queryFn: () => fetchContents(page, initialSize, initialSort),
    staleTime: 0,
  });

  return {
    contents: data?.items || [],
    page,
    totalPages: data?.pageInfo.totalPages || 0,
    isLoading,
    error: error as Error | null,
  };
}
