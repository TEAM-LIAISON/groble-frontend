'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { NotificationItem as NotificationItemType } from '../types/notificationTypes';
import {
  getNotificationTypeText,
  getNotificationContent,
  getNotificationLink,
  getThumbnailUrl,
  hasNotificationImage,
} from '../utils/notificationUtils';
import { useMarkNotificationAsRead } from '../hooks/useNotifications';
import { XIcon } from '@/components/(improvement)/icons/XIcon';

interface NotificationItemProps {
  notification: NotificationItemType;
  isDeleteMode?: boolean;
  onDelete?: () => void;
}

export default function NotificationItem({
  notification,
  isDeleteMode = false,
  onDelete,
}: NotificationItemProps) {
  const router = useRouter();
  const markAsReadMutation = useMarkNotificationAsRead();

  const {
    notificationId,
    notificationType,
    subNotificationType,
    notificationReadStatus,
    notificationOccurTime,
    notificationDetails,
  } = notification;

  const isUnread = notificationReadStatus === 'UNREAD';
  const typeText = getNotificationTypeText(notificationType);
  const content = getNotificationContent(
    subNotificationType,
    notificationDetails
  );
  const link = getNotificationLink(subNotificationType, notificationDetails);
  const thumbnailUrl = getThumbnailUrl(notificationType, notificationDetails);
  const showImage = hasNotificationImage(notificationType);

  // 알림 클릭 처리 - 읽음 상태로 변경 후 라우팅
  const handleNotificationClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isDeleteMode) return;

    // 읽지 않은 알림인 경우 읽음 상태로 변경
    if (isUnread) {
      try {
        await markAsReadMutation.mutateAsync(notificationId);
      } catch (error) {
        console.error('알림 읽음 처리 실패:', error);
        // 에러가 발생해도 라우팅은 진행
      }
    }

    // 라우팅 처리
    router.push(link);
  };

  // 삭제 버튼 클릭 처리
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="hover:bg-component-fill-alternative">
      <div
        className={`relative flex cursor-pointer ${
          isUnread ? 'bg-background-hover' : ''
        }`}
        onClick={handleNotificationClick}
      >
        <div className="flex flex-1 flex-col px-8 py-3">
          {/* 유형, 날짜 */}
          <div className="flex items-center justify-between gap-[0.38rem]">
            {/* 유형 */}
            <span className="text-label-1-normal text-label-alternative">
              {typeText}
            </span>
            {isDeleteMode ? (
              <button
                onClick={handleDeleteClick}
                className="cursor-pointer text-label-alternative hover:text-label-normal"
              >
                <XIcon className="" />
              </button>
            ) : (
              // 날짜
              <span className="flex items-center text-caption-1 text-label-alternative">
                {notificationOccurTime}
                {isUnread && (
                  <span className="ml-2 h-[6px] w-[6px] rounded-full bg-primary-normal"></span>
                )}
              </span>
            )}
          </div>

          {/* 내용 */}
          <p className="not-first: flex gap-3 text-body-1-normal font-semibold text-label-normal mt-[0.38rem]">
            {showImage && (
              <div className="relative rounded-[0.19rem] h-[2.81rem]  w-[3.75rem] overflow-hidden border border-line-normal">
                <Image
                  src={thumbnailUrl}
                  alt="알림 이미지"
                  fill
                  className="h-full w-full "
                />
              </div>
            )}
            <p className="">{content}</p>
          </p>
        </div>
      </div>
    </div>
  );
}
