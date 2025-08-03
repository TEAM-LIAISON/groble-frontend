import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteAllNotifications,
  deleteNotification,
  fetchNotifications,
} from '../api/notificationApi';

/**
 * 알림 목록을 가져오는 훅
 */
export const useNotifications = (enabled?: boolean) => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    enabled,
  });
};

/**
 * 알림 삭제 훅
 */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

/**
 * 모든 알림 삭제 훅
 */
export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

/**
 * 읽지 않은 알림 개수를 계산하는 훅
 */
export const useUnreadNotificationCount = () => {
  const { data } = useNotifications();

  const unreadCount =
    data?.data.notificationItems.filter(
      (notification) => notification.notificationReadStatus === 'UNREAD'
    ).length || 0;

  return unreadCount;
};
