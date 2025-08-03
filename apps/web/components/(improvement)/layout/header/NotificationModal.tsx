'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  type: '인증' | '심사';
  content: string;
  timestamp: string;
  isRead: boolean;
  image?: string;
}

// 샘플 데이터
const sampleNotifications: NotificationItem[] = [
  {
    id: '1',
    type: '인증',
    content: '메이커 인증이 완료됐어요!',
    timestamp: '3일 전',
    isRead: false,
  },
  {
    id: '2',
    type: '인증',
    content: '메이커 인증이 반려됐어요.',
    timestamp: '3일 전',
    isRead: false,
  },
  {
    id: '3',
    type: '심사',
    content: '상품 심사가 거절됐어요.',
    timestamp: '3일 전',
    isRead: false,
    image: '/images/notification-thumbnail.png',
  },
  {
    id: '4',
    type: '심사',
    content: '상품 심사가 승인됐어요.',
    timestamp: '3일 전',
    isRead: true,
    image: '/images/notification-thumbnail.png',
  },
];

export default function NotificationModal({
  isOpen,
  onClose,
}: NotificationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // 모달이 열릴 때 스크롤 방지
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-20 fixed inset-0 z-50 flex items-start justify-center bg-black pt-16 md:pt-[4.5rem]">
      <div
        ref={modalRef}
        className="w-full rounded-t-lg bg-white shadow-lg md:w-[23.4375rem] md:rounded-lg"
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div className="flex items-center justify-between border-b border-line-normal p-4">
          <h2 className="text-heading-4 font-bold">알림</h2>
          <button onClick={onClose} className="text-2xl text-label-alternative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="divide-y divide-line-normal">
          {sampleNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex p-4 ${
                !notification.isRead ? 'bg-background-hover' : ''
              }`}
            >
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-label-2-normal text-label-alternative">
                    {notification.type}
                  </span>
                  <span className="text-label-2-normal flex items-center text-label-alternative">
                    {notification.timestamp}
                    {!notification.isRead && (
                      <span className="bg-primary-main ml-2 h-2 w-2 rounded-full" />
                    )}
                  </span>
                </div>
                <p className="mt-1 text-body-2-normal font-medium">
                  {notification.content}
                </p>
                {notification.image && (
                  <div className="mt-2 h-[4.5rem] w-[4.5rem] overflow-hidden rounded-md border border-line-normal">
                    <Image
                      src={notification.image}
                      alt="알림 이미지"
                      width={72}
                      height={72}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
