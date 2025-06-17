import { apiClient } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/type';
import type { Paginated } from '@/shared/types/PaginationTypes';
import type { Order } from './OrderType';

/**
 * 주문 목록 조회
 *
 * @param page 1-based 페이지 번호
 * @param size 페이지당 항목 수
 * @param sort 정렬 기준 ("property,direction" 형식, 예: "createdAt,desc")
 * @returns Paginated<Order>
 */
export async function fetchOrders(
  page: number,
  size: number,
  sort: string
): Promise<Paginated<Order>> {
  // Spring Boot API는 0-based 페이지 인덱스를 사용합니다.
  const zeroBasedPage = page - 1;

  const query = new URLSearchParams({
    page: String(zeroBasedPage),
    size: String(size),
    sort,
  });

  // baseURL은 shared/api/client.ts에서 설정됨
  const response = await apiClient<Paginated<Order>>(
    `/api/v1/admin/orders?${query.toString()}`,
    {
      cache: 'no-store',
    }
  );

  if (response.code !== 200) {
    throw new Error(
      response.message || '주문 목록을 가져오는 데 실패했습니다.'
    );
  }

  return response.data;
}

/**
 * 주문 상세 정보 조회
 */
export async function fetchOrderDetail(orderId: string): Promise<Order> {
  const response = await apiClient<Order>(`/api/v1/admin/orders/${orderId}`, {
    cache: 'no-store',
  });

  if (response.code !== 200) {
    throw new Error(
      response.message || '주문 정보를 가져오는 데 실패했습니다.'
    );
  }

  return response.data;
}
