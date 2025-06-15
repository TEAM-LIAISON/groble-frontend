// File: /apps/admin/features/dashboard/users/hooks/useUsers.ts
'use client';

import { User } from '../model/UserType';
import { useQuery } from '@tanstack/react-query';
import { Paginated } from '@/shared/types/PaginationTypes';
import { fetchUsers } from '../model/userApi';

export type UseUsersResult = {
  users: User[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
};

export function useUsers(
  page: number = 1,
  initialSize = 12,
  initialSort = 'createdAt,desc'
): UseUsersResult {
  const { data, isLoading, error } = useQuery<Paginated<User>>({
    queryKey: ['admin-users', page, initialSize, initialSort],
    queryFn: () => fetchUsers(page, initialSize, initialSort),
    staleTime: 0,
  });

  return {
    users: data?.items || [],
    page,
    totalPages: data?.pageInfo.totalPages || 0,
    isLoading,
    error: error as Error | null,
  };
}
