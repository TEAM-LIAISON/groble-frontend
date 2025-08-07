'use client';

import {
  useNotifications,
  useDeleteNotification,
  useDeleteAllNotifications,
} from '../hooks/useNotifications';
import { useNotificationDropdown } from '../hooks/useNotificationDropdown';

import { TrashIcon } from '@/components/(improvement)/icons/trashIcon';
import NotificationItem from './NotificationItem';
import NavigationBar from '@/components/navigation-bar';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDropdown({
  isOpen,
  onClose,
}: NotificationDropdownProps) {
  const { data, isLoading, error } = useNotifications(isOpen);
  const deleteAllMutation = useDeleteAllNotifications();
  const deleteSingleMutation = useDeleteNotification();

  const { isDeleteMode, dropdownRef, toggleDeleteMode } =
    useNotificationDropdown({ onClose });

  const notifications = data?.data?.notificationItems || [];
  const unreadCount = notifications.filter(
    (notification) => notification.notificationReadStatus === 'UNREAD'
  ).length;

  if (!isOpen) return null;

  const handleDeleteAll = () => {
    deleteAllMutation.mutate();
  };

  const handleDeleteSingle = (notificationId: number) => {
    deleteSingleMutation.mutate(notificationId);
  };

  // 뒤로가기 버튼 컴포넌트
  const BackButton = () => (
    <button type="button" onClick={onClose} className="flex items-center">
      <svg
        width="41"
        height="44"
        viewBox="0 0 41 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.5149 14.4661C23.082 14.0205 22.3698 14.0101 21.9241 14.4431L15.1741 21.0002C14.9601 21.2082 14.8374 21.4927 14.8331 21.7911C14.8289 22.0895 14.9433 22.3774 15.1514 22.5914L21.9014 29.5342C22.3345 29.9797 23.0467 29.9897 23.4922 29.5566C23.9377 29.1235 23.9477 28.4113 23.5146 27.9658L17.5492 21.8299L23.4919 16.0569C23.9376 15.624 23.9479 14.9118 23.5149 14.4661Z"
          fill="#171717"
        />
      </svg>
    </button>
  );

  return (
    <div className="fixed inset-x-0 top-0 bottom-0 z-[70] flex flex-col bg-white md:absolute md:inset-auto md:top-full md:right-0 md:mt-2 md:h-auto md:max-h-[30rem] md:w-[23.4375rem] md:rounded-xl md:border md:border-line-normal md:shadow-lg">
      {/* 모바일용 헤더 (md 미만에서만 표시) */}
      <div className="md:hidden">
        <div className="flex h-[60px] items-center justify-between pl-3 pr-5 border-b border-line-normal">
          <BackButton />
          <h1
            style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: '#171717',
            }}
          >
            알림
          </h1>
          <div className="flex items-center">
            {notifications.length > 0 && (
              <button
                onClick={toggleDeleteMode}
                className={`cursor-pointer text-2xl ${
                  isDeleteMode ? 'text-primary-main' : 'text-label-alternative'
                }`}
              >
                <TrashIcon />
              </button>
            )}
          </div>
        </div>
      </div>
      {/*  */}
      <div
        ref={dropdownRef}
        className="flex flex-1 flex-col overflow-hidden md:h-auto "
      >
        {/* 데스크탑용 헤더 (md 이상에서만 표시) */}
        <div className="hidden border-b border-line-normal px-8 pt-8 pb-5 md:flex md:items-center md:justify-between">
          <h2 className="text-headline-1 font-semibold">
            알림
            {unreadCount > 0 && (
              <span className="text-headline-1 font-semibold">
                ({unreadCount})
              </span>
            )}
          </h2>
          {notifications.length > 0 && (
            <button
              onClick={toggleDeleteMode}
              className={`cursor-pointer text-2xl ${
                isDeleteMode ? 'text-primary-main' : 'text-label-alternative'
              }`}
            >
              <TrashIcon />
            </button>
          )}
        </div>

        {isDeleteMode && notifications.length > 0 && (
          <div className="flex justify-end gap-10 bg-component-fill-alternative px-5 py-2 text-body-2-normal">
            <button
              onClick={handleDeleteAll}
              className="cursor-pointer hover:text-primary-sub-1"
            >
              전체 삭제
            </button>
            <button
              onClick={toggleDeleteMode}
              className="cursor-pointer hover:text-primary-sub-1"
            >
              닫기
            </button>
          </div>
        )}

        <div className="min-h-[23rem] flex-1 overflow-y-auto pt-2 gap-2">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <p className="text-body-2-normal text-label-alternative">
                알림을 불러오는 중...
              </p>
            </div>
          ) : error ? (
            <div className="flex justify-center p-8">
              <p className="text-body-2-normal text-label-alternative">
                알림을 불러오는 데 실패했습니다.
              </p>
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.notificationId}
                notification={notification}
                isDeleteMode={isDeleteMode}
                onDelete={() => handleDeleteSingle(notification.notificationId)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center pt-[8rem] pb-[7rem]">
              <p className="text-heading-1 font-bold text-label-normal">
                받은 알림이 없어요
              </p>
              <p className="text-body-2-normal text-label-alternative">
                알림을 켜고 소식을 받아보세요
              </p>
            </div>
          )}
        </div>
      </div>
      <NavigationBar />
    </div>
  );
}
