import { create } from "zustand";
import { customFetch } from "../custom-fetch";

export interface User {
  isLogin: boolean;
  nickname?: string;
  profileImageUrl?: string;
  canSwitchToSeller?: boolean;
  unreadNotificationCount?: number;
}

interface ApiResponse<T> {
  status: number;
  data: T;
  headers: Headers;
}

interface UserStore {
  user: User | null;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  fetchUser: async () => {
    try {
      const response = await customFetch<ApiResponse<User>>("/api/v1/me", {
        method: "GET",
      });

      if (response.status === 200) {
        set({ user: response.data });
      } else {
        // 로그인 되지 않은 상태로 처리
        set({ user: { isLogin: false } });
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      // 에러 발생 시 로그인 되지 않은 상태로 처리
      set({ user: { isLogin: false } });
    }
  },

  setUser: (user: User | null) => set({ user }),
}));
