'use client';

import { useState, useRef, useEffect } from 'react';
import NotificationDropdown from './NotificationDropdown';
import { mockNotifications } from '@/lib/mocks/notificationMock';
import { useQuery } from '@tanstack/react-query';
import { fetchNotifications } from '@/lib/api/notification';

interface NotificationIconProps {
  count?: number;
}

/**
 * 알림 아이콘 컴포넌트
 * 읽지 않은 알림이 있을 경우 작은 빨간색 원으로 표시
 */
export default function NotificationIcon({ count }: NotificationIconProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // TanStack Query를 사용하여 알림 데이터 가져오기
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    // 5분마다 자동 갱신
    staleTime: 5 * 60 * 1000,
  });

  // 읽지 않은 알림 개수를 가져옵니다
  const unreadCount =
    count ??
    (data?.data.notificationItems.filter(
      (notification) => notification.notificationReadStatus === 'UNREAD'
    ).length ||
      0);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // 버튼을 다시 클릭했을 때 드롭다운이 닫히도록 이벤트 리스너 추가
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // 버튼 클릭이 아닌 경우에는 처리하지 않음
      if (!buttonRef.current?.contains(e.target as Node)) {
        return;
      }

      // 이미 열려있는 상태에서 버튼 클릭 시 닫기
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [isDropdownOpen]);

  return (
    <div ref={iconRef} className="relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="relative rounded-full p-1 hover:bg-background-alternative"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.73311 13.163C7.73311 8.65471 11.3878 5 15.8961 5C20.4044 5 24.0592 8.65471 24.0592 13.163V18.998L26.4746 22.6673C26.6205 22.8889 26.4615 23.1839 26.1962 23.1839H5.7394C5.47775 23.1839 5.31811 22.8963 5.45654 22.6742L7.73311 19.0227V13.163ZM15.8961 3C10.2832 3 5.73311 7.55014 5.73311 13.163V18.4503L3.75937 21.6161C2.79038 23.1703 3.90788 25.1839 5.7394 25.1839H12.3333V25.3333C12.3333 27.3584 13.975 29 16 29C18.025 29 19.6667 27.3584 19.6667 25.3333V25.1839H26.1962C28.0536 25.1839 29.1665 23.1191 28.1451 21.5676L26.0591 18.3988V13.163C26.0591 7.55014 21.509 3 15.8961 3ZM17.6667 25.1839H14.3333V25.3333C14.3333 26.2538 15.0795 27 16 27C16.9205 27 17.6667 26.2538 17.6667 25.3333V25.1839Z"
            fill="#1D212C"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </button>

      <NotificationDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
    </div>
  );
}
