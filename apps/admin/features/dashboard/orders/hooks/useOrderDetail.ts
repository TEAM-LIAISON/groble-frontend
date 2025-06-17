'use client';

import { Order } from '../model/OrderType';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderDetail } from '../model/orderApi';

export type UseOrderDetailResult = {
  order: Order | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

export function useOrderDetail(orderId: string): UseOrderDetailResult {
  const { data, isLoading, error, refetch } = useQuery<Order>({
    queryKey: ['admin-order-detail', orderId],
    queryFn: () => fetchOrderDetail(orderId),
    enabled: !!orderId,
    staleTime: 0,
  });

  return {
    order: data || null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
