'use client';

import { User } from '@/lib/store/useUserStore';
import Image from 'next/image';

interface ProfileAvatarProps {
  user: User | null;
  size?: 'sm' | 'md';
}

/**
 * 사용자 프로필 아바타 컴포넌트
 * 프로필 이미지가 있으면 표시하고, 없으면 닉네임 첫 글자로 아바타 생성
 */
export default function ProfileAvatar({
  user,
  size = 'md',
}: ProfileAvatarProps) {
  // user가 null이면 기본 아이콘 표시
  if (!user) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-background-alternative"
        style={{
          width: size === 'sm' ? '36px' : '32px',
          height: size === 'sm' ? '36px' : '32px',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM12 14C7.58172 14 4 17.5817 4 22C4 22.5523 4.44772 23 5 23H19C19.5523 23 20 22.5523 20 22C20 17.5817 16.4183 14 12 14Z"
            fill="#171717"
          />
        </svg>
      </div>
    );
  }

  const sizeStyles = {
    sm: { width: '36px', height: '36px', fontSize: '14px' },
    md: { width: '32px', height: '32px', fontSize: '16px' },
  };

  const style = sizeStyles[size];

  // 이미지가 있으면 이미지 표시, 없으면 닉네임의 첫 글자로 아바타 생성
  if (user.profileImageUrl) {
    return (
      <div
        className="relative overflow-hidden rounded-full w-[32px] h-[32px]"
        style={style}
      >
        <Image
          src={user.profileImageUrl}
          alt={user.nickname || '프로필'}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  // 닉네임이 있으면 첫 글자 추출, 없으면 기본 아이콘 사용
  const initial = user.nickname ? user.nickname.charAt(0).toUpperCase() : '';

  if (initial) {
    // 랜덤한 배경색 생성 (닉네임에 따라 결정적으로 생성)
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-indigo-500',
    ];
    const colorIndex = user.nickname
      ? user.nickname.charCodeAt(0) % colors.length
      : 0;

    return (
      <div
        className={`flex items-center justify-center rounded-full text-white ${colors[colorIndex]}`}
        style={style}
      >
        {initial}
      </div>
    );
  }

  // 기본 아이콘
  return (
    <div
      className="flex items-center justify-center rounded-full bg-background-alternative"
      style={style}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM12 14C7.58172 14 4 17.5817 4 22C4 22.5523 4.44772 23 5 23H19C19.5523 23 20 22.5523 20 22C20 17.5817 16.4183 14 12 14Z"
          fill="#171717"
        />
      </svg>
    </div>
  );
}
