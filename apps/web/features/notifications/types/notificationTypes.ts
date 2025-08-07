// 알림 타입
export type NotificationType =
  | 'SYSTEM'
  | 'SELL'
  | 'REVIEW'
  | 'PURCHASE'
  | 'CERTIFY';

// 알림 세부 타입
export type SubNotificationType =
  // SYSTEM
  | 'WELCOME_GROBLE'

  // SELL
  | 'CONTENT_SOLD_STOPPED'
  | 'CONTENT_SOLD'

  // REVIEW
  | 'CONTENT_REVIEWED'

  // PURCHASE
  | 'CONTENT_PURCHASED'
  | 'CONTENT_REVIEW_REPLY'

  // CERTIFY
  | 'MAKER_CERTIFIED'
  | 'MAKER_CERTIFY_REJECTED';

// 알림 읽음 상태
export type NotificationReadStatus = 'READ' | 'UNREAD';

// 알림 세부 정보 타입 (Union Type)
export type NotificationDetails =
  | { nickname: string } // CERTIFY 타입
  | { contentId: number; thumbnailUrl: string; reviewId: number } // REVIEW 타입
  | { nickname: string; systemTitle: string } // SYSTEM 타입
  | { purchaseId: number; merchantUid: string } // PURCHASE 타입
  | { systemTitle: string }; // SELL 타입

// 알림 아이템 타입
export interface NotificationItem {
  notificationId: number;
  notificationType: NotificationType;
  subNotificationType: SubNotificationType;
  notificationReadStatus: NotificationReadStatus;
  notificationOccurTime: string;
  notificationDetails: NotificationDetails;
}

// 알림 API 응답 타입
export interface NotificationResponse {
  success: boolean;
  message: string;
  data: {
    notificationItems: NotificationItem[];
  };
}
