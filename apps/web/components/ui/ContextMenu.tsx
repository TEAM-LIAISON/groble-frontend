'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  action: {
    type: 'copy' | 'link' | 'custom';
    value?: string; // 복사할 텍스트 또는 링크 URL
    onClick?: () => void; // 커스텀 액션
  };
  disabled?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  trigger: ReactNode;
  className?: string;
}

// URL을 외부 링크로 보장하는 함수
const ensureExternalUrl = (url: string): string => {
  // 이미 프로토콜이 있는 경우 그대로 사용
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // 프로토콜이 없는 경우 https:// 추가
  return `https://${url}`;
};

export function ContextMenu({
  items,
  trigger,
  className = '',
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!triggerRef.current || !menuRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = triggerRect.top;
    let left = triggerRect.right + 8; // 기본적으로 오른쪽에 8px 간격

    // 오른쪽 공간이 부족한 경우 왼쪽에 배치
    if (left + menuRect.width > viewportWidth) {
      left = triggerRect.left - menuRect.width - 8;
    }

    // 왼쪽에도 공간이 부족한 경우 뷰포트 내에 맞추기
    if (left < 0) {
      left = 8; // 최소 8px 여백
    }

    // 아래쪽 공간이 부족한 경우 위쪽에 배치
    if (top + menuRect.height > viewportHeight) {
      top = triggerRect.bottom - menuRect.height;
    }

    // 위쪽에도 공간이 부족한 경우 뷰포트 내에 맞추기
    if (top < 0) {
      top = 8; // 최소 8px 여백
    }

    setPosition({ top, left });
  };

  const handleTriggerClick = () => {
    setIsOpen(true);
  };

  const handleItemClick = async (item: ContextMenuItem) => {
    if (item.disabled) return;

    switch (item.action.type) {
      case 'copy':
        if (item.action.value) {
          try {
            await navigator.clipboard.writeText(item.action.value);
            console.log('클립보드에 복사됨:', item.action.value);
          } catch (err) {
            console.error('클립보드 복사 실패:', err);
          }
        }
        break;
      case 'link':
        if (item.action.value) {
          try {
            // 외부 사이트 URL로 보장
            const externalUrl = ensureExternalUrl(item.action.value);
            console.log('외부 링크로 이동:', externalUrl);

            // 새 창에서 외부 사이트 열기
            const newWindow = window.open(
              externalUrl,
              '_blank',
              'noopener,noreferrer'
            );

            // 팝업 차단 확인
            if (!newWindow) {
              console.warn('팝업이 차단되었습니다. 현재 탭에서 이동합니다.');
              window.location.href = externalUrl;
            }
          } catch (err) {
            console.error('링크 열기 실패:', err);
          }
        }
        break;
      case 'custom':
        if (item.action.onClick) {
          item.action.onClick();
        }
        break;
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // 위치 계산은 다음 렌더 사이클에서 실행
      setTimeout(calculatePosition, 0);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <>
      <div ref={triggerRef} onClick={handleTriggerClick} className={className}>
        {trigger}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-50 min-w-[120px] bg-white border border-gray-200 rounded-lg shadow-lg py-1"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={`
                  w-full px-3 py-2 text-left text-sm hover:bg-gray-50 
                  transition-colors duration-150 flex items-center gap-2
                  ${
                    item.disabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 cursor-pointer'
                  }
                `}
              >
                {item.icon && (
                  <span className="flex-shrink-0">{item.icon}</span>
                )}
                <span className="flex-1">{item.label}</span>
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
