"use client";

import {
  deleteAllNotifications,
  deleteNotification,
  fetchNotifications,
} from "@/lib/api/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Header from "../header";
import { TrashIcon } from "../icons/trashIcon";
import NotificationItem from "./NotificationItem";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDropdown({
  isOpen,
  onClose,
}: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const queryClient = useQueryClient();

  // TanStack Query를 사용하여 알림 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    // 메뉴가 열려있을 때만 활성화
    enabled: isOpen,
    // 5분마다 자동 갱신
    staleTime: 5 * 60 * 1000,
  });

  // 알림 전체 삭제 mutation
  const deleteAllMutation = useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: () => {
      // 삭제 성공 시 notifications 쿼리 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      setIsDeleteMode(false);
    },
  });

  // 알림 개별 삭제 mutation
  const deleteSingleMutation = useMutation({
    mutationFn: (notificationId: number) => deleteNotification(notificationId),
    onSuccess: () => {
      // 삭제 성공 시 notifications 쿼리 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const notifications = data?.data?.notificationItems || [];

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
        setIsDeleteMode(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // 모바일에서 드롭다운이 열렸을 때 스크롤 방지
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // 메뉴가 닫힐 때 삭제 모드도 종료
  useEffect(() => {
    if (!isOpen) {
      setIsDeleteMode(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 읽지 않은 알림 개수
  const unreadCount = notifications.filter(
    (notification) => notification.notificationReadStatus === "UNREAD",
  ).length;

  // 알림 전체 삭제 처리
  const handleDeleteAll = () => {
    deleteAllMutation.mutate();
  };

  // 개별 알림 삭제 처리
  const handleDeleteSingle = (notificationId: number) => {
    deleteSingleMutation.mutate(notificationId);
  };

  // 삭제 모드 토글
  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
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
    <div className="fixed inset-x-0 top-0 bottom-0 z-50 flex flex-col bg-white md:absolute md:inset-auto md:top-full md:right-0 md:mt-2 md:h-auto md:max-h-[30rem] md:w-[23.4375rem] md:rounded-lg md:border md:border-line-normal md:shadow-lg">
      {/* 모바일용 헤더 (md 미만에서만 표시) */}
      <div className="md:hidden">
        <Header
          left={<BackButton />}
          title="알림"
          right={
            notifications.length > 0 && (
              <button
                onClick={toggleDeleteMode}
                className={`cursor-pointer text-2xl ${
                  isDeleteMode ? "text-primary-main" : "text-label-alternative"
                }`}
              >
                <TrashIcon />
              </button>
            )
          }
        />
      </div>

      <div
        ref={dropdownRef}
        className="flex flex-1 flex-col overflow-hidden md:h-auto md:border-t md:border-line-normal"
      >
        {/* 데스크탑용 헤더 (md 이상에서만 표시) */}
        <div className="hidden border-b border-line-normal px-8 pt-8 pb-5 md:flex md:items-center md:justify-between">
          <h2 className="text-heading-4 font-bold">
            알림
            {unreadCount > 0 && (
              <span className="text-primary-main ml-2 text-body-2-normal">
                {unreadCount}
              </span>
            )}
          </h2>
          {notifications.length > 0 && (
            <button
              onClick={toggleDeleteMode}
              className={`cursor-pointer text-2xl ${
                isDeleteMode ? "text-primary-main" : "text-label-alternative"
              }`}
            >
              <TrashIcon />
            </button>
          )}
        </div>

        {isDeleteMode && notifications.length > 0 && (
          <div className="flex justify-end gap-10 bg-component-fill-alternative px-5 py-4">
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

        <div className="min-h-[23rem] flex-1 divide-y divide-line-normal overflow-y-auto pt-3">
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
    </div>
  );
}
