import { fetchClient } from "@/shared/api/api-fetch";
import type { ApiResponse } from "@/shared/types/api-types";
import type { UserDetail, ProfileImageUploadData } from "../model/types";

export const profileApi = {
  getUserDetail: async (): Promise<ApiResponse<UserDetail>> => {
    return fetchClient<UserDetail>("/api/v1/me/detail", {
      method: "GET",
    });
  },

  uploadProfileImage: async (
    file: File
  ): Promise<ApiResponse<ProfileImageUploadData>> => {
    const formData = new FormData();
    formData.append("profileImage", file);

    // FormData 업로드를 위해 직접 fetch 사용 (Content-Type 자동 설정 필요)
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE || process.env.INTERNAL_API_BASE;
    const response = await fetch(`${API_BASE_URL}/api/v1/me/profile-image`, {
      method: "POST",
      credentials: "include",
      body: formData,
      // Content-Type 헤더를 설정하지 않음 (브라우저가 자동으로 multipart/form-data 설정)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || `업로드 실패: ${response.status}`;

      // 클라이언트 사이드에서만 토스트 표시
      if (typeof window !== "undefined") {
        const { showToast } = await import("@/shared/ui/Toast");
        showToast.error(errorMessage);
      }

      throw new Error(errorMessage);
    }

    return response.json();
  },
};
