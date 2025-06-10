"use client";

import { ShareIcon } from "./(improvement)/icons/ShareIcon";

interface ShareButtonProps {
  className?: string;
}

export default function ShareButton({ className }: ShareButtonProps) {
  // 공유 아이콘 클릭 핸들러
  const handleShareClick = () => {
    // 클립보드에 현재 URL 복사
    if (typeof window !== "undefined") {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          // 복사 성공 시 알림 표시
          alert("URL이 클립보드에 복사되었습니다.");
        })
        .catch((error) => {
          // 복사 실패 시 에러 메시지 표시
          console.error("URL 복사 실패:", error);
          alert("URL 복사에 실패했습니다.");
        });
    }
  };

  return (
    <ShareIcon
      className={className || "h-5 w-5 cursor-pointer hover:bg-primary-sub-1"}
      onClick={handleShareClick}
    />
  );
}
