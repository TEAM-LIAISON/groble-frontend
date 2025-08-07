'use client';

import { useEffect, useRef } from 'react';
import { trackContentView, trackMarketView } from '@/shared/api/viewTracker';

interface ViewTrackerProps {
  /** 추적할 뷰 타입 */
  type: 'content' | 'market';
  /** 콘텐츠 ID 또는 마켓 링크 URL */
  id: string;
  /** 뷰 추적을 활성화할지 여부 (기본값: true) */
  enabled?: boolean;
}

/**
 * 뷰 추적 컴포넌트
 * 1시간 이내 중복 조회를 방지하며 조회수를 증가시킵니다.
 *
 * @param type - 'content' 또는 'market'
 * @param id - 콘텐츠 ID 또는 마켓 링크 URL
 * @param enabled - 뷰 추적 활성화 여부
 */
export default function ViewTracker({
  type,
  id,
  enabled = true,
}: ViewTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // 비활성화된 경우나 이미 추적한 경우 건너뛰기
    if (!enabled || hasTracked.current || !id) {
      return;
    }

    const trackView = async () => {
      try {
        if (type === 'content') {
          await trackContentView(id);
          console.log(`콘텐츠 조회수 추적 완료: ${id}`);
        } else if (type === 'market') {
          await trackMarketView(id);
          console.log(`마켓 조회수 추적 완료: ${id}`);
        }

        // 추적 완료 표시
        hasTracked.current = true;
      } catch (error) {
        console.error(`뷰 추적 실패 (${type}:${id}):`, error);
      }
    };

    // 페이지 로드 후 약간의 지연을 두어 실행 (성능 최적화)
    const timeoutId = setTimeout(trackView, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [type, id, enabled]);

  // 뷰 추적 컴포넌트는 UI를 렌더링하지 않음
  return null;
}
