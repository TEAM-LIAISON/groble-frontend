// 알림 타입
export type NotificationType = "CERTIFY" | "REVIEW" | "SYSTEM";

// 알림 세부 타입
export type SubNotificationType =
  | "MAKER_CERTIFIED"
  | "MAKER_CERTIFY_REJECTED"
  | "CONTENT_REVIEW_APPROVED"
  | "CONTENT_REVIEW_REJECTED"
  | "WELCOME_GROBLE";

// 알림 읽음 상태
export type NotificationReadStatus = "READ" | "UNREAD";

// 알림 세부 정보 타입 (Union Type)
export type NotificationDetails =
  | { nickname: string } // CERTIFY 타입
  | { contentId: number; thumbnailUrl: string } // REVIEW 타입
  | { nickname: string; systemTitle: string }; // SYSTEM 타입

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
