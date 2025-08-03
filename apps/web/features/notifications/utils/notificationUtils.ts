import type {
  NotificationDetails,
  NotificationType,
  SubNotificationType,
} from '../types/notificationTypes';

/**
 * 알림 타입에 따른 텍스트 변환
 */
export const getNotificationTypeText = (type: NotificationType): string => {
  switch (type) {
    case 'CERTIFY':
      return '인증';
    case 'REVIEW':
      return '심사';
    case 'SYSTEM':
      return '시스템';
    default:
      return '알림';
  }
};

/**
 * 알림 타입에 따른 내용 생성
 */
export const getNotificationContent = (
  subType: SubNotificationType,
  details: NotificationDetails
): string => {
  switch (subType) {
    case 'MAKER_CERTIFIED':
      return '메이커 인증이 완료됐어요!';
    case 'MAKER_CERTIFY_REJECTED':
      return '메이커 인증이 반려됐어요.';
    case 'CONTENT_REVIEW_APPROVED':
      return '상품 심사가 승인됐어요.';
    case 'CONTENT_REVIEW_REJECTED':
      return '상품 심사가 거절됐어요.';
    case 'WELCOME_GROBLE':
      return (details as { systemTitle: string }).systemTitle;
    default:
      return '새로운 알림이 있습니다.';
  }
};

/**
 * 알림 클릭 시 이동할 링크 생성
 */
export const getNotificationLink = (
  subType: SubNotificationType,
  details: NotificationDetails
): string => {
  switch (subType) {
    case 'MAKER_CERTIFIED':
    case 'MAKER_CERTIFY_REJECTED':
      return '/users/me/seller';
    case 'CONTENT_REVIEW_APPROVED':
    case 'CONTENT_REVIEW_REJECTED': {
      const { contentId } = details as { contentId: number };
      return `/products/${contentId}`;
    }
    default:
      return '#';
  }
};

/**
 * 썸네일 URL 가져오기 (REVIEW 타입의 경우)
 */
export const getThumbnailUrl = (
  type: NotificationType,
  details: NotificationDetails
): string => {
  if (type === 'REVIEW') {
    return (details as { thumbnailUrl: string }).thumbnailUrl;
  }
  return '';
};

/**
 * 이미지가 필요한 알림인지 확인
 */
export const hasNotificationImage = (type: NotificationType): boolean => {
  return type === 'REVIEW';
};
