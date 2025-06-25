'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useUploadProfileImage } from '../model/queries';

interface ProfileImageUploadProps {
  profileImageUrl?: string;
  className?: string;
}

/**
 * 프로필 이미지 업로드 컴포넌트
 * 이미지 클릭 시 파일 선택 창이 열리고 업로드 기능 제공
 */
export default function ProfileImageUpload({
  profileImageUrl,
  className = '',
}: ProfileImageUploadProps) {
  const uploadProfileImage = useUploadProfileImage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 검증 (예: 5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      uploadProfileImage.mutate(file);
    }
  };

  return (
    <div className={`relative w-[94px] h-[94px] ${className}`}>
      {profileImageUrl ? (
        // 프로필 이미지가 있는 경우
        <>
          <div className="relative w-full h-full">
            <Image
              src={profileImageUrl}
              alt="profile"
              fill
              className="rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleImageClick}
            />

            {/* 업로드 중 오버레이 */}
            {uploadProfileImage.isPending && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* + 버튼 (프로필 이미지가 있을 때만 표시) */}
          <div
            className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors border-2 border-gray-100"
            onClick={handleImageClick}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-600"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </>
      ) : (
        // 프로필 이미지가 없는 경우 - AvatarPlus 이미지만 표시
        <>
          <Image
            src="/assets/common/icons/AvatarPlus.svg"
            alt="add profile"
            fill
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleImageClick}
          />

          {/* 업로드 중 오버레이 */}
          {uploadProfileImage.isPending && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </>
      )}

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
