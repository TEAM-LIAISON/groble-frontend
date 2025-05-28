// components/ChannelTalkProvider.tsx
"use client";

import ChannelService from "@/third-party/ChannelTalk";
import { useEffect } from "react";

export default function ChannelTalkProvider() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY;
    if (!key) {
      console.warn("채널톡 플러그인 키가 설정되지 않았습니다.");
      return;
    }
    const svc = new ChannelService();
    svc.boot({ pluginKey: key });
    return () => svc.shutdown();
  }, []);

  return null;
}
