import { fetchClient } from "@/shared/api/api-fetch";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { amplitudeEvents } from "@/lib/utils/amplitude";

export interface User {
  isLogin: boolean;
  nickname?: string;
  profileImageUrl?: string;
  canSwitchToSeller?: boolean;
  unreadNotificationCount?: number;
  alreadyRegisteredAsSeller?: boolean;
  lastUserType?: "BUYER" | "SELLER";
  isGuest?: boolean;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isGuest: boolean;
  lastUpdated: number;
  isHydrated: boolean; // 하이드레이션 상태 추가
  fetchUser: () => Promise<void>;
  fetchUserWithoutDebouncing: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  setHydrated: (hydrated: boolean) => void;
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
      isGuest: false,
      lastUpdated: 0,
      isHydrated: false,

      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),

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
          const response = await fetchClient<User>("/api/v1/users/me");

          if (response.status === "SUCCESS") {
            const userData = response.data;
            // User 객체 형식으로 변환
            const newUser: User = {
              ...userData,
              isLogin: true,
            };

            set({
              user: newUser,
              isGuest: newUser.isGuest || false,
              isLoading: false,
              lastUpdated: now,
            });
          } else {
            // 로그인 되지 않은 상태로 처리
            set({
              user: { isLogin: false },
              isGuest: false,
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
            set({ user: { isLogin: false }, isGuest: false });
          }
        }
      },

      fetchUserWithoutDebouncing: async () => {
        const now = Date.now();
        set({ isLoading: true, error: null });
        try {
          const response = await fetchClient<User>("/api/v1/users/me");

          if (response.status === "SUCCESS") {
            const userData = response.data;
            // User 객체 형식으로 변환
            const newUser: User = {
              ...userData,
              isLogin: true,
            };

            set({
              user: newUser,
              isGuest: newUser.isGuest || false,
              isLoading: false,
              lastUpdated: now,
            });
          } else {
            // 로그인 되지 않은 상태로 처리
            set({
              user: { isLogin: false },
              isGuest: false,
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
            set({ user: { isLogin: false }, isGuest: false });
          }
        }
      },

      setUser: (user: User | null) =>
        set({
          user: user || { isLogin: false },
          isGuest: user?.isGuest || false,
          lastUpdated: Date.now(),
        }),

      logout: async () => {
        try {
          await fetchClient("/api/v1/auth/logout", {
            method: "POST",
          });

          // 로그아웃 성공 이벤트 트래킹 (에러 핸들링 추가)
          try {
            await amplitudeEvents.trackEvent("User Logout", {
              success: true,
            });
          } catch (amplitudeError) {
            console.warn("앰플리튜드 이벤트 트래킹 실패:", amplitudeError);
          }
        } catch (error) {
          console.error("로그아웃 중 오류 발생:", error);

          // 로그아웃 실패 이벤트 트래킹 (에러 핸들링 추가)
          try {
            await amplitudeEvents.trackEvent("User Logout Failed", {
              error_message:
                error instanceof Error ? error.message : String(error),
              success: false,
            });
          } catch (amplitudeError) {
            console.warn("앰플리튜드 이벤트 트래킹 실패:", amplitudeError);
          }
        } finally {
          // 로그아웃 성공 여부와 관계없이 사용자 상태 초기화
          set({
            user: { isLogin: false },
            isGuest: false,
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
        isGuest: state.isGuest,
        lastUpdated: state.lastUpdated,
      }), // 저장할 상태만 선택
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
);
