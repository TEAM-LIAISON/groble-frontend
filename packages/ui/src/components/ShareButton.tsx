'use client';

interface ShareButtonProps {
  className?: string;
}

export default function ShareButton({ className }: ShareButtonProps) {
  // 공유 아이콘 클릭 핸들러
  const handleShareClick = () => {
    // 클립보드에 현재 URL 복사
    if (typeof window !== 'undefined') {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          // 복사 성공 시 알림 표시
          alert('URL이 클립보드에 복사되었습니다.');
        })
        .catch((error) => {
          // 복사 실패 시 에러 메시지 표시
          console.error('URL 복사 실패:', error);
          alert('URL 복사에 실패했습니다.');
        });
    }
  };

  return (
    <ShareIcon
      className={className || 'h-5 w-5 cursor-pointer hover:bg-primary-sub-1'}
      onClick={handleShareClick}
    />
  );
}

function ShareIcon({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M13.3333 6.66667C14.9442 6.66667 16.25 5.36083 16.25 3.75C16.25 2.13917 14.9442 0.833333 13.3333 0.833333C11.7225 0.833333 10.4167 2.13917 10.4167 3.75C10.4167 5.36083 11.7225 6.66667 13.3333 6.66667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 12.5C5.36083 12.5 6.66667 11.1942 6.66667 9.58333C6.66667 7.9725 5.36083 6.66667 3.75 6.66667C2.13917 6.66667 0.833333 7.9725 0.833333 9.58333C0.833333 11.1942 2.13917 12.5 3.75 12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 19.1667C14.9442 19.1667 16.25 17.8608 16.25 16.25C16.25 14.6392 14.9442 13.3333 13.3333 13.3333C11.7225 13.3333 10.4167 14.6392 10.4167 16.25C10.4167 17.8608 11.7225 19.1667 13.3333 19.1667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.11621 8.27502L11.8829 5.05835"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.11621 11.725L11.8829 14.9417"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
