import React from 'react';

interface ProfileInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick?: () => void;
  className?: string;
}

/**
 * 프로필 정보 항목 컴포넌트
 * 아이콘, 라벨, 값, 화살표로 구성된 정보 항목을 표시
 */
export default function ProfileInfoItem({
  icon,
  label,
  value,
  onClick,
  className = '',
}: ProfileInfoItemProps) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-4 rounded-xl bg-white ${
        onClick ? 'cursor-pointer hover:bg-gray-50' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-background-alternative p-3">
          <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
        </div>
        <div className="flex flex-col">
          <span className="text-label-1-normal text-label-alternative">
            {label}
          </span>
          <span className="text-body-1-normal text-label-normal font-semibold">
            {value}
          </span>
        </div>
      </div>

      {onClick && (
        <div className="w-6 h-6 flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-400"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
