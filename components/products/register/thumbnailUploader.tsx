"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import Image from "next/image";
import { PhotoIcon } from "@/components/icons/PhotoIcon";
import { uploadThumbnailImage } from "@/lib/api/content";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function ThumbnailUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { thumbnailUrl, setThumbnailUrl, resetThumbnailUrl } =
    useNewProductStore();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    // 이미지 삭제 확인
    if (window.confirm("이미지를 삭제하시겠습니까?")) {
      resetThumbnailUrl();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증 (10MB 제한)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    // 파일 타입 검증
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드 가능합니다.");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // 이미지 업로드 중에는 기존 이미지를 초기화 (로딩 스피너를 보여주기 위해)
      if (thumbnailUrl) {
        resetThumbnailUrl();
      }

      // 분리된 API 함수 사용
      const fileUrl = await uploadThumbnailImage(file);
      setThumbnailUrl(fileUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "이미지 업로드 중 오류가 발생했습니다.",
      );
      console.error("이미지 업로드 오류:", err);
    } finally {
      setIsUploading(false);
      // 파일 입력 초기화 (같은 파일 다시 선택 가능하게)
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="mt-4 w-full">
      <div className="relative flex w-full justify-center rounded-lg border-2 border-dashed border-line-normal px-4 py-9">
        {thumbnailUrl ? (
          <div className="relative aspect-[4/3] h-[376px] w-[670px]">
            <Image
              src={thumbnailUrl}
              alt="대표 이미지"
              fill
              className="object-contain"
            />
            <div className="absolute right-4 bottom-4 flex gap-2">
              <button
                onClick={handleDeleteImage}
                className="rounded-md bg-red-500 px-4 py-2 text-body-2-normal text-white hover:brightness-95"
              >
                삭제하기
              </button>
              <button
                onClick={handleUploadClick}
                className="rounded-md bg-primary-normal px-4 py-2 text-body-2-normal text-label-normal hover:brightness-95"
              >
                이미지 변경
              </button>
            </div>
          </div>
        ) : (
          <>
            {isUploading ? (
              <div className="flex aspect-[4/3] h-[376px] w-[670px] items-center justify-center">
                <LoadingSpinner size="large" />
                <p className="ml-2 text-body-1-normal text-label-alternative">
                  이미지 업로드 중...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={handleUploadClick}
                  disabled={isUploading}
                  className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#D8FFF4] px-4 py-2 text-body-1-normal font-semibold text-primary-sub-1 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <PhotoIcon />
                  {isUploading ? "업로드 중..." : "사진 업로드"}
                </button>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              </div>
            )}
          </>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
      />

      <div className="mt-1 flex flex-col">
        <p className="text-label-1-normal text-label-alternative">
          * 670 × 376px
        </p>
        <p className="text-label-1-normal text-label-alternative">
          * 10MB 이하의 PNG, JPG 파일을 업로드 해주세요
        </p>
      </div>
    </div>
  );
}
