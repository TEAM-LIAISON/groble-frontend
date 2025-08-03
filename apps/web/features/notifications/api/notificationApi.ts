import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type { NotificationItem } from '../types/notificationTypes';

type NotificationResponse = {
  notificationItems: NotificationItem[];
};

/**
 * 알림 목록을 가져오는 API
 */
export async function fetchNotifications(): Promise<
  ApiResponse<NotificationResponse>
> {
  try {
    const response = await fetchClient<NotificationResponse>(
      '/api/v1/notifications'
    );
    return response;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    return {
      message: '알림 목록을 불러오는 데 실패했습니다.',
      data: { notificationItems: [] },
      status: '',
      code: 500,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * 특정 알림을 삭제하는 API
 */
export async function deleteNotification(
  notificationId: number
): Promise<ApiResponse<null>> {
  try {
    const response = await fetchClient<null>(
      `/api/v1/notifications/${notificationId}`,
      {
        method: 'DELETE',
      }
    );
    return response;
  } catch (error) {
    console.error(`Failed to delete notification ${notificationId}:`, error);
    return {
      message: '알림 삭제에 실패했습니다.',
      data: null,
      status: 'error',
      code: 500,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * 모든 알림을 삭제하는 API
 */
export async function deleteAllNotifications(): Promise<ApiResponse<null>> {
  try {
    const response = await fetchClient<null>('/api/v1/notifications', {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('Failed to delete all notifications:', error);
    return {
      message: '모든 알림 삭제에 실패했습니다.',
      data: null,
      status: 'error',
      code: 500,
      timestamp: new Date().toISOString(),
    };
  }
}
