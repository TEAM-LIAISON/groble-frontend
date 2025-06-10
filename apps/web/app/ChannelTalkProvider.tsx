// components/ChannelTalkProvider.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ChannelService from "@/third-party/ChannelTalk";

export default function ChannelTalkProvider() {
  const pathname = usePathname();

  // 채널톡을 숨길 페이지 목록
  const hiddenPages = [
    "/products/register/info",
    "/products/register/description",
    "/products/register/review",
  ];

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY;
    if (!key) {
      console.warn("채널톡 플러그인 키가 설정되지 않았습니다.");
      return;
    }

    // 초기에는 숨길 페이지가 아닌 경우에만 부팅
    const shouldHide = hiddenPages.some((page) => pathname.startsWith(page));

    if (!shouldHide) {
      const svc = new ChannelService();
      svc.boot({ pluginKey: key });
    }

    return () => {
      if (typeof window !== "undefined" && window.ChannelIO) {
        const svc = new ChannelService();
        svc.shutdown();
      }
    };
  }, []);

  // 페이지 변경 시 채널톡 shutdown/boot 처리
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY;
    if (!key) return;

    const shouldHide = hiddenPages.some((page) => pathname.startsWith(page));

    // 채널톡이 로드된 후에 실행되도록 약간의 지연 추가
    const timer = setTimeout(() => {
      if (shouldHide) {
        // 특정 페이지에서는 채널톡 shutdown
        if (typeof window !== "undefined" && window.ChannelIO) {
          window.ChannelIO("shutdown");
        }
      } else {
        // 다른 페이지에서는 채널톡 다시 부트
        if (typeof window !== "undefined") {
          const svc = new ChannelService();
          svc.boot({ pluginKey: key });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
