import { NotificationItem } from "../types/notificationTypes";
import { apiFetch } from "./fetch";
import { ApiResponse } from "../types/apiTypes";
import { mockNotifications } from "../mocks/notificationMock";

type NotificationResponse = {
  notificationItems: NotificationItem[];
};

/**
 * 알림 목록을 가져오는 API
 *
 * 개발 환경에서는 mock 데이터를 반환합니다.
 * MOCK_ENABLED 값을 false로 변경하면 실제 API를 호출합니다.
 */
export async function fetchNotifications(): Promise<
  ApiResponse<NotificationResponse>
> {
  // mock 데이터 사용 여부 (true: mock 데이터 사용, false: 실제 API 호출)
  const MOCK_ENABLED = false;

  if (MOCK_ENABLED) {
    // mock 데이터를 API 응답 형태로 변환하여 반환
    return {
      message: "알림 목록을 성공적으로 불러왔습니다.",
      data: {
        notificationItems: mockNotifications.data.notificationItems,
      },
      status: "success",
      code: 200,
      timestamp: new Date().toISOString(),
    };
  }

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

/**
 * 특정 알림을 삭제하는 API
 *
 * @param notificationId 삭제할 알림 ID
 */
export async function deleteNotification(
  notificationId: number,
): Promise<ApiResponse<null>> {
  // mock 데이터 사용 여부 (true: mock 데이터 사용, false: 실제 API 호출)
  const MOCK_ENABLED = false;

  if (MOCK_ENABLED) {
    // 실제로는 데이터를 삭제하지 않고 성공 응답만 반환
    console.log(`삭제 요청: 알림 ID ${notificationId}`);
    return {
      message: "알림이 성공적으로 삭제되었습니다.",
      data: null,
      status: "success",
      code: 200,
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const response = await apiFetch<null>(
      `/api/v1/notifications/${notificationId}`,
      {
        method: "DELETE",
      },
    );
    return response;
  } catch (error) {
    console.error(`Failed to delete notification ${notificationId}:`, error);
    return {
      message: "알림 삭제에 실패했습니다.",
      data: null,
      status: "error",
      code: 500,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * 모든 알림을 삭제하는 API
 */
export async function deleteAllNotifications(): Promise<ApiResponse<null>> {
  // mock 데이터 사용 여부 (true: mock 데이터 사용, false: 실제 API 호출)
  const MOCK_ENABLED = false;

  if (MOCK_ENABLED) {
    // 실제로는 데이터를 삭제하지 않고 성공 응답만 반환
    console.log("전체 알림 삭제 요청");
    return {
      message: "모든 알림이 성공적으로 삭제되었습니다.",
      data: null,
      status: "success",
      code: 200,
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const response = await apiFetch<null>("/api/v1/notifications", {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error("Failed to delete all notifications:", error);
    return {
      message: "모든 알림 삭제에 실패했습니다.",
      data: null,
      status: "error",
      code: 500,
      timestamp: new Date().toISOString(),
    };
  }
}
