// File: src/features/products/register/components/form/thumbnail-uploader.tsx
"use client";

import { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { useNewProductStore } from "../../store/useNewProductStore";
import type { ProductFormData } from "@/lib/schemas/productSchema";

import Image from "next/image";

import { uploadThumbnailImage } from "@/lib/api/content";
import { PhotoIcon } from "@/components/(improvement)/icons/PhotoIcon";
import LoadingSpinner from "@/shared/ui/LoadingSpinner";
import { resizeImageTo4x3 } from "@/lib/utils/image-utils";

export default function ThumbnailUploader() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormData>();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { thumbnailUrl, setThumbnailUrl, resetThumbnailUrl } =
    useNewProductStore();

  // store -> form 동기화
  useEffect(() => {
    setValue("thumbnailUrl", thumbnailUrl, { shouldValidate: true });
  }, [thumbnailUrl, setValue]);

  const onClickUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onDelete = useCallback(() => {
    if (window.confirm("이미지를 삭제하시겠습니까?")) {
      resetThumbnailUrl();
    }
  }, [resetThumbnailUrl]);

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // 검증
      if (!file.type.startsWith("image/")) {
        setUploadError("이미지 파일만 가능합니다.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setUploadError("10MB 이하 이미지만 업로드 가능합니다.");
        return;
      }

      setUploadError(null);
      setUploading(true);
      resetThumbnailUrl();

      try {
        const resized = await resizeImageTo4x3(file);
        const url = await uploadThumbnailImage(resized);
        setThumbnailUrl(url);
      } catch (err) {
        console.error(err);
        setUploadError(
          err instanceof Error ? err.message : "업로드 중 오류가 발생했습니다.",
        );
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    },
    [resetThumbnailUrl, setThumbnailUrl],
  );

  const borderClass = errors.thumbnailUrl
    ? "border-status-error"
    : "border-line-normal";

  return (
    <div className="mt-4 w-full">
      {/* hidden input for validation */}
      <input
        {...register("thumbnailUrl", {
          required: "대표 이미지를 업로드해주세요.",
        })}
        type="hidden"
      />

      {thumbnailUrl ? (
        <div className="group relative aspect-[4/3] h-[24rem] w-[32rem] overflow-hidden rounded-lg">
          <Image
            src={thumbnailUrl}
            alt="대표 이미지"
            fill
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-dashed border-white" />

          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:bg-black/30">
            <button
              type="button"
              onClick={onClickUpload}
              className="flex scale-0 cursor-pointer items-center gap-1 rounded-lg bg-[#D8FFF4] px-4 py-2 text-body-1-normal font-semibold text-primary-sub-1 transition-all duration-300 group-hover:scale-100"
            >
              <PhotoIcon />
              이미지 변경
            </button>
          </div>
        </div>
      ) : uploading ? (
        <div
          className={`flex aspect-[4/3] h-[24rem] w-[32rem] items-center justify-center rounded-lg border-2 border-dashed ${borderClass}`}
        >
          <LoadingSpinner size="large" />
          <p className="ml-2 text-body-1-normal text-label-alternative">
            업로드 중...
          </p>
        </div>
      ) : (
        <div
          className={`relative flex w-full justify-center rounded-lg border-2 border-dashed ${borderClass} px-4 py-9`}
        >
          <button
            type="button"
            onClick={onClickUpload}
            disabled={uploading}
            className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#D8FFF4] px-4 py-2 text-body-1-normal font-semibold text-primary-sub-1 hover:brightness-95 disabled:opacity-50"
          >
            <PhotoIcon />
            사진 업로드
          </button>
          {(uploadError || errors.thumbnailUrl) && (
            <p className="mt-2 text-sm text-status-error">
              {uploadError || errors.thumbnailUrl?.message}
            </p>
          )}
        </div>
      )}

      <input
        type="file"
        accept="image/png,image/jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="mt-1 flex flex-col text-label-1-normal text-label-alternative">
        <span>* 512x384px 이상 (4:3 비율로 자동 조정)</span>
        <span>* 10MB 이하 PNG/JPG 파일만 업로드</span>
      </div>
    </div>
  );
}
