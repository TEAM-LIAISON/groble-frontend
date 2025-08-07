import {
  NotificationType,
  SubNotificationType,
  NotificationDetails,
} from '../types/notificationTypes';

/**
 * 알림 타입에 따른 텍스트 변환
 */
export const getNotificationTypeText = (type: NotificationType): string => {
  switch (type) {
    case 'SELL':
      return '판매';
    case 'REVIEW':
      return '리뷰';
    case 'SYSTEM':
      return '시스템';
    case 'PURCHASE':
      return '구매';
    case 'CERTIFY':
      return '인증';
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
    case 'WELCOME_GROBLE':
      return '그로블에 오신 것을 환영합니다!';
    case 'MAKER_CERTIFY_REJECTED':
      return '메이커 인증이 반려됐어요.';
    case 'MAKER_CERTIFIED':
      return '메이커 인증이 완료됐어요';

    // SELL
    case 'CONTENT_SOLD_STOPPED':
      return '상품 판매가 중단됐어요';
    case 'CONTENT_SOLD':
      return '상품이 판매됐어요!';

    // REVIEW
    case 'CONTENT_REVIEWED':
      return '리뷰가 등록됐어요';
    case 'CONTENT_REVIEW_REPLY':
      return '리뷰에 답글이 달렸어요';

    // PURCHASE
    case 'CONTENT_PURCHASED':
      return '상품을 구매했어요';

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
    // CERTIFY
    case 'MAKER_CERTIFIED':
      return '/users/profile/info';
    case 'MAKER_CERTIFY_REJECTED':
      return '/users/profile/info';

    // SELL
    case 'CONTENT_SOLD_STOPPED':
      return `/products/${(details as { contentId: number }).contentId}`;
    case 'CONTENT_SOLD':
      return `/manage/store/products/${
        (details as { contentId: number }).contentId
      }/sales/${(details as { purchaseId: number }).purchaseId}`;

    // REVIEW
    case 'CONTENT_REVIEWED':
      return `/manage/store/products/${
        (details as { contentId: number }).contentId
      }/reviews/${(details as { reviewId: number }).reviewId}`;
    case 'CONTENT_REVIEW_REPLY':
      return `/products/${(details as { contentId: number }).contentId}`;

    // PURCHASE
    case 'CONTENT_PURCHASED':
      return `/manage/purchase/${
        (details as { merchantUid: string }).merchantUid
      }`;

    // SYSTEM
    case 'WELCOME_GROBLE':
      return '/users/profile/info';

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
  if (type === 'REVIEW' || type === 'SELL' || type === 'PURCHASE') {
    return (details as { thumbnailUrl: string }).thumbnailUrl;
  }
  return '';
};

/**
 * 이미지가 필요한 알림인지 확인
 */
export const hasNotificationImage = (type: NotificationType): boolean => {
  // 구매, 리뷰, 판매
  return type === 'REVIEW' || type === 'SELL' || type === 'PURCHASE';
};
