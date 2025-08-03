'use client';

import { useNotificationDropdown } from '../hooks/useNotificationDropdown';
import {
  useNotifications,
  useUnreadNotificationCount,
} from '../hooks/useNotifications';
import NotificationDropdown from './NotificationDropdown';

interface NotificationIconProps {
  count?: number;
}

/**
 * 알림 아이콘 컴포넌트
 * 읽지 않은 알림이 있을 경우 작은 빨간색 원으로 표시
 */
export default function NotificationIcon({ count }: NotificationIconProps) {
  const unreadCountFromHook = useUnreadNotificationCount();
  const unreadCount = count ?? unreadCountFromHook;

  const { isOpen, buttonRef, toggleDropdown, closeDropdown } =
    useNotificationDropdown();

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="relative rounded-full p-1 hover:bg-background-alternative"
        aria-expanded={isOpen}
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
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      <NotificationDropdown isOpen={isOpen} onClose={closeDropdown} />
    </div>
  );
}
