import type { NotificationResponse } from '../types/notificationTypes';

// 판매자 인증 성공 알림
export const makerCertifiedNotification: NotificationResponse = {
  success: true,
  message: '알림 조회 성공',
  data: {
    notificationItems: [
      {
        notificationId: 1,
        notificationType: 'CERTIFY',
        subNotificationType: 'MAKER_CERTIFIED',
        notificationReadStatus: 'UNREAD',
        notificationOccurTime: '3시간 전',
        notificationDetails: {
          nickname: 'seller123',
        },
      },
    ],
  },
};

// 판매자 인증 거부 알림
export const makerCertifyRejectedNotification: NotificationResponse = {
  success: true,
  message: '알림 조회 성공',
  data: {
    notificationItems: [
      {
        notificationId: 2,
        notificationType: 'CERTIFY',
        subNotificationType: 'MAKER_CERTIFY_REJECTED',
        notificationReadStatus: 'UNREAD',
        notificationOccurTime: '2시간 전',
        notificationDetails: {
          nickname: 'seller456',
        },
      },
    ],
  },
};

// 콘텐츠 승인 알림
export const contentReviewApprovedNotification: NotificationResponse = {
  success: true,
  message: '알림 조회 성공',
  data: {
    notificationItems: [
      {
        notificationId: 3,
        notificationType: 'REVIEW',
        subNotificationType: 'CONTENT_REVIEW_APPROVED',
        notificationReadStatus: 'READ',
        notificationOccurTime: '1일 전',
        notificationDetails: {
          contentId: 12345,
          thumbnailUrl: '',
        },
      },
    ],
  },
};

// 콘텐츠 거부 알림
export const contentReviewRejectedNotification: NotificationResponse = {
  success: true,
  message: '알림 조회 성공',
  data: {
    notificationItems: [
      {
        notificationId: 4,
        notificationType: 'REVIEW',
        subNotificationType: 'CONTENT_REVIEW_REJECTED',
        notificationReadStatus: 'UNREAD',
        notificationOccurTime: '5시간 전',
        notificationDetails: {
          contentId: 54321,
          thumbnailUrl: '',
        },
      },
    ],
  },
};

// 시스템 환영 알림
export const welcomeGrobleNotification: NotificationResponse = {
  success: true,
  message: '알림 조회 성공',
  data: {
    notificationItems: [
      {
        notificationId: 5,
        notificationType: 'SYSTEM',
        subNotificationType: 'WELCOME_GROBLE',
        notificationReadStatus: 'UNREAD',
        notificationOccurTime: '방금 전',
        notificationDetails: {
          nickname: 'newuser123',
          systemTitle: 'Groble에 오신 것을 환영합니다!',
        },
      },
    ],
  },
};

// 모든 알림을 합친 샘플 데이터
export const mockNotifications: NotificationResponse = {
  success: true,
  message: '알림 조회 성공',
  data: {
    notificationItems: [
      // 시스템 환영 알림
      {
        notificationId: 5,
        notificationType: 'SYSTEM',
        subNotificationType: 'WELCOME_GROBLE',
        notificationReadStatus: 'UNREAD',
        notificationOccurTime: '방금 전',
        notificationDetails: {
          nickname: 'newuser123',
          systemTitle: 'Groble에 오신 것을 환영합니다!',
        },
      },
      // 콘텐츠 거부 알림
      {
        notificationId: 4,
        notificationType: 'REVIEW',
        subNotificationType: 'CONTENT_REVIEW_REJECTED',
        notificationReadStatus: 'UNREAD',
        notificationOccurTime: '5시간 전',
        notificationDetails: {
          contentId: 54321,
          thumbnailUrl: '',
        },
      },
      // 판매자 인증 성공 알림
      {
        notificationId: 1,
        notificationType: 'CERTIFY',
        subNotificationType: 'MAKER_CERTIFIED',
        notificationReadStatus: 'UNREAD',
        notificationOccurTime: '3시간 전',
        notificationDetails: {
          nickname: 'seller123',
        },
      },
      // 판매자 인증 거부 알림
      {
        notificationId: 2,
        notificationType: 'CERTIFY',
        subNotificationType: 'MAKER_CERTIFY_REJECTED',
        notificationReadStatus: 'UNREAD',
        notificationOccurTime: '2시간 전',
        notificationDetails: {
          nickname: 'seller456',
        },
      },
      // 콘텐츠 승인 알림
      {
        notificationId: 3,
        notificationType: 'REVIEW',
        subNotificationType: 'CONTENT_REVIEW_APPROVED',
        notificationReadStatus: 'READ',
        notificationOccurTime: '1일 전',
        notificationDetails: {
          contentId: 12345,
          thumbnailUrl: '',
        },
      },
    ],
  },
};
