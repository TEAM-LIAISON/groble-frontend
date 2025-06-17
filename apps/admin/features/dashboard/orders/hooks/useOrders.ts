'use client';

import { Order } from '../model/OrderType';
import { useQuery } from '@tanstack/react-query';
import { Paginated } from '@/shared/types/PaginationTypes';
import { fetchOrders } from '../model/orderApi';

export type UseOrdersResult = {
  orders: Order[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

export function useOrders(
  page: number = 1,
  initialSize = 8,
  initialSort = 'createdAt,desc'
): UseOrdersResult {
  const { data, isLoading, error, refetch } = useQuery<Paginated<Order>>({
    queryKey: ['admin-orders', page, initialSize, initialSort],
    queryFn: () => fetchOrders(page, initialSize, initialSort),
    staleTime: 0,
  });

  return {
    orders: data?.items || [],
    page,
    totalPages: data?.pageInfo.totalPages || 0,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
