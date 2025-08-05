// components/ChannelTalkProvider.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ChannelService from '@/third-party/ChannelTalk';

export default function ChannelTalkProvider() {
  const pathname = usePathname();

  // 채널톡을 보여줄 페이지 목록
  const allowedPages = ['/users/profile'];

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY;
    if (!key) {
      console.warn('채널톡 플러그인 키가 설정되지 않았습니다.');
      return;
    }

    // 초기에는 허용된 페이지인 경우에만 부팅
    const shouldShow = allowedPages.some((page) => pathname.startsWith(page));

    if (shouldShow) {
      const svc = new ChannelService();
      svc.boot({ pluginKey: key });
    }

    return () => {
      if (typeof window !== 'undefined' && window.ChannelIO) {
        const svc = new ChannelService();
        svc.shutdown();
      }
    };
  }, []);

  // 페이지 변경 시 채널톡 boot/shutdown 처리
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY;
    if (!key) return;

    const shouldShow = allowedPages.some((page) => pathname.startsWith(page));

    // 채널톡이 로드된 후에 실행되도록 약간의 지연 추가
    const timer = setTimeout(() => {
      if (shouldShow) {
        // 허용된 페이지에서는 채널톡 부트
        if (typeof window !== 'undefined') {
          const svc = new ChannelService();
          svc.boot({ pluginKey: key });
        }
      } else {
        // 다른 페이지에서는 채널톡 shutdown
        if (typeof window !== 'undefined' && window.ChannelIO) {
          window.ChannelIO('shutdown');
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
