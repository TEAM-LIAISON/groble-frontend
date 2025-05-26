import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { apiFetch } from "../api/fetch";

export interface User {
  isLogin: boolean;
  nickname?: string;
  profileImageUrl?: string;
  canSwitchToSeller?: boolean;
  unreadNotificationCount?: number;
  alreadyRegisteredAsSeller?: boolean;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: number;
  fetchUser: () => Promise<void>;
  fetchUserWithoutDebouncing: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

/**
 * useUserStore - 로그인 상태 및 사용자 정보를 관리하는 Zustand 스토어
 */
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: { isLogin: false },
      isLoading: false,
      error: null,
      lastUpdated: 0,

      fetchUser: async () => {
        // 이미 로딩 중이면 중복 요청 방지
        if (get().isLoading) return;

        // 마지막 갱신 후 짧은 시간 내에는 재요청 방지 (디바운싱)
        const now = Date.now();
        const { lastUpdated } = get();

        if (now - lastUpdated < 3000) {
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await apiFetch<User>("/api/v1/users/me");

          if (response.status === "SUCCESS") {
            const userData = response.data;
            // User 객체 형식으로 변환
            const newUser: User = {
              ...userData,
              isLogin: true,
            };

            set({
              user: newUser,
              isLoading: false,
              lastUpdated: now,
            });
          } else {
            // 로그인 되지 않은 상태로 처리
            set({
              user: { isLogin: false },
              isLoading: false,
              lastUpdated: now,
            });
          }
        } catch (error) {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
          set({
            error: error as Error,
            isLoading: false,
            lastUpdated: now,
          });
          // 네트워크 오류가 발생해도 기존 유저 정보 유지
          // 만약 기존 정보가 없으면 비로그인 상태로 설정
          if (!get().user) {
            set({ user: { isLogin: false } });
          }
        }
      },

      fetchUserWithoutDebouncing: async () => {
        const now = Date.now();
        set({ isLoading: true, error: null });
        try {
          const response = await apiFetch<User>("/api/v1/users/me");

          if (response.status === "SUCCESS") {
            const userData = response.data;
            // User 객체 형식으로 변환
            const newUser: User = {
              ...userData,
              isLogin: true,
            };

            set({
              user: newUser,
              isLoading: false,
              lastUpdated: now,
            });
          } else {
            // 로그인 되지 않은 상태로 처리
            set({
              user: { isLogin: false },
              isLoading: false,
              lastUpdated: now,
            });
          }
        } catch (error) {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
          set({
            error: error as Error,
            isLoading: false,
            lastUpdated: now,
          });
          // 네트워크 오류가 발생해도 기존 유저 정보 유지
          // 만약 기존 정보가 없으면 비로그인 상태로 설정
          if (!get().user) {
            set({ user: { isLogin: false } });
          }
        }
      },

      setUser: (user: User | null) =>
        set({
          user: user || { isLogin: false },
          lastUpdated: Date.now(),
        }),

      logout: async () => {
        try {
          await apiFetch("/api/v1/auth/logout", {
            method: "POST",
          });
        } catch (error) {
          console.error("로그아웃 중 오류 발생:", error);
        } finally {
          // 로그아웃 성공 여부와 관계없이 사용자 상태 초기화
          set({
            user: { isLogin: false },
            lastUpdated: Date.now(),
          });
        }
      },
    }),
    {
      name: "user-storage", // 로컬 스토리지 키 이름
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지 사용
      partialize: (state) => ({
        user: state.user,
        lastUpdated: state.lastUpdated,
      }), // 저장할 상태만 선택
    },
  ),
);
