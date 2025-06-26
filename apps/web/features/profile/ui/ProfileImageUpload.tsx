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
    <div
      className={`relative w-[120px] md:w-[64px] h-[120px] md:h-[64px] ${className}`}
    >
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
            className="absolute bottom-0 right-0 md:w-[22px] w-[36px] md:h-[22px] h-[36px] rounded-full flex items-center justify-center cursor-pointer hover:brightness-105 "
            onClick={handleImageClick}
          >
            <Image
              src="/assets/common/icons/circle_plus.svg"
              alt="프로필 이미지 업로드"
              fill
            />
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
