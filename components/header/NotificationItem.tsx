"use client";

import Image from "next/image";
import { NotificationItem as NotificationItemType } from "@/lib/types/notificationTypes";
import Link from "next/link";
import { XIcon } from "../icons/XIcon";

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
  const {
    notificationType,
    subNotificationType,
    notificationReadStatus,
    notificationOccurTime,
    notificationDetails,
  } = notification;

  // 알림 타입에 따른 텍스트 변환
  const getNotificationTypeText = () => {
    switch (notificationType) {
      case "CERTIFY":
        return "인증";
      case "REVIEW":
        return "심사";
      case "SYSTEM":
        return "시스템";
      default:
        return "알림";
    }
  };

  // 알림 타입에 따른 내용 생성
  const getNotificationContent = () => {
    switch (subNotificationType) {
      case "MAKER_CERTIFIED":
        return "메이커 인증이 완료됐어요!";
      case "MAKER_CERTIFY_REJECTED":
        return "메이커 인증이 반려됐어요.";
      case "CONTENT_REVIEW_APPROVED":
        return "상품 심사가 승인됐어요.";
      case "CONTENT_REVIEW_REJECTED":
        return "상품 심사가 거절됐어요.";
      case "WELCOME_GROBLE":
        return (notificationDetails as { systemTitle: string }).systemTitle;
      default:
        return "새로운 알림이 있습니다.";
    }
  };

  // 이미지가 필요한 알림인지 확인
  const hasImage = notificationType === "REVIEW";

  // 알림 클릭 시 이동할 링크 생성
  const getNotificationLink = () => {
    switch (subNotificationType) {
      case "MAKER_CERTIFIED":
      case "MAKER_CERTIFY_REJECTED":
        return "/users/me/seller";
      case "CONTENT_REVIEW_APPROVED":
      case "CONTENT_REVIEW_REJECTED": {
        const { contentId } = notificationDetails as { contentId: number };
        return `/products/${contentId}`;
      }
      default:
        return "#";
    }
  };

  // 썸네일 URL 가져오기 (REVIEW 타입의 경우)
  const getThumbnailUrl = () => {
    if (notificationType === "REVIEW") {
      return (notificationDetails as { thumbnailUrl: string }).thumbnailUrl;
    }
    return "";
  };

  const isUnread = notificationReadStatus === "UNREAD";
  const link = getNotificationLink();

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
      <Link
        href={link}
        className={`relative flex ${isUnread ? "bg-background-hover" : ""}`}
        onClick={(e) => isDeleteMode && e.preventDefault()}
      >
        <div className="flex flex-1 flex-col px-8 py-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-label-1-normal text-label-alternative">
              {getNotificationTypeText()}
            </span>
            {isDeleteMode ? (
              <button
                onClick={handleDeleteClick}
                className="cursor-pointer text-label-alternative hover:text-label-normal"
              >
                <XIcon className="" />
              </button>
            ) : (
              <span className="flex items-center text-caption-1 text-label-alternative">
                {notificationOccurTime}
                {isUnread && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-primary-normal"></span>
                )}
              </span>
            )}
          </div>
          <p className="not-first: mt-1 flex gap-3 text-body-1-normal font-semibold text-label-normal">
            {hasImage && (
              <div className="roundeted-md mt-2 h-[2.81rem] w-[3.75rem] overflow-hidden rounded-md border border-line-normal">
                <Image
                  src={getThumbnailUrl()}
                  alt="알림 이미지"
                  width={72}
                  height={72}
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
            )}
            <p className="mt-2">{getNotificationContent()}</p>
          </p>
        </div>
      </Link>
    </div>
  );
}
