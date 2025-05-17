import { NotificationItem } from "../types/notificationTypes";
import { apiFetch } from "./fetch";
import { ApiResponse } from "../types/apiTypes";

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
    const response = await apiFetch<NotificationResponse>(
      "/api/v1/notifications",
    );
    return response;
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return {
      message: "알림 목록을 불러오는 데 실패했습니다.",
      data: { notificationItems: [] },
      status: "",
      code: 500,
      timestamp: new Date().toISOString(),
    };
  }
}
