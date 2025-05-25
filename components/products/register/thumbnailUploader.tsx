"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import { ProductFormData } from "@/lib/schemas/productSchema";
import Image from "next/image";
import { PhotoIcon } from "@/components/icons/PhotoIcon";
import { uploadThumbnailImage } from "@/lib/api/content";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function ThumbnailUploader() {
  const {
    formState: { errors },
    setValue,
    register,
  } = useFormContext<ProductFormData>();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { thumbnailUrl, setThumbnailUrl, resetThumbnailUrl } =
    useNewProductStore();

  // thumbnailUrl이 변경될 때 폼에도 반영
  useEffect(() => {
    setValue("thumbnailUrl", thumbnailUrl);
  }, [thumbnailUrl, setValue]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    // 이미지 삭제 확인
    if (window.confirm("이미지를 삭제하시겠습니까?")) {
      resetThumbnailUrl();
    }
  };

  // 이미지를 4:3 비율로 리사이즈하는 함수
  const resizeImageTo4x3 = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img") as HTMLImageElement;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context를 생성할 수 없습니다."));
        return;
      }

      img.onload = () => {
        // 4:3 비율로 캔버스 크기 설정
        const targetWidth = 512;
        const targetHeight = 384; // 4:3 비율 (670 * 3 / 4 ≈ 502, 하지만 기존 크기 유지)

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // 이미지를 4:3 비율에 맞게 크롭하여 그리기
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              reject(new Error("이미지 리사이즈에 실패했습니다."));
            }
          },
          file.type,
          0.9,
        );
      };

      img.onerror = () => {
        reject(new Error("이미지를 로드할 수 없습니다."));
      };

      img.src = URL.createObjectURL(file);
    });
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

      // 이미지를 4:3 비율로 리사이즈
      const resizedFile = await resizeImageTo4x3(file);

      // 분리된 API 함수 사용
      const fileUrl = await uploadThumbnailImage(resizedFile);
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
      {/* Hidden input for form validation */}
      <input
        {...register("thumbnailUrl", {
          required: "대표 이미지를 업로드해주세요.",
        })}
        type="hidden"
        value={thumbnailUrl}
      />

      {thumbnailUrl ? (
        <div className="group relative aspect-[4/3] h-[24rem] w-[32rem] overflow-hidden rounded-lg">
          <Image
            src={thumbnailUrl}
            alt="대표 이미지"
            fill
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-dashed border-white"></div>

          {/* 호버시 나타나는 검정 배경과 이미지 변경 버튼 */}
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:bg-black/30">
            <button
              type="button"
              onClick={handleUploadClick}
              className="flex scale-0 cursor-pointer items-center gap-1 rounded-lg bg-[#D8FFF4] px-4 py-2 text-body-1-normal font-semibold text-primary-sub-1 transition-all duration-300 group-hover:scale-100"
            >
              <PhotoIcon />
              이미지 변경
            </button>
          </div>
        </div>
      ) : (
        <>
          {isUploading ? (
            <div
              className={`flex aspect-[4/3] h-[24rem] w-[32rem] items-center justify-center rounded-lg border-2 border-dashed ${errors?.thumbnailUrl ? "border-status-error" : "border-line-normal"}`}
            >
              <LoadingSpinner size="large" />
              <p className="ml-2 text-body-1-normal text-label-alternative">
                이미지 업로드 중...
              </p>
            </div>
          ) : (
            <div
              className={`relative flex w-full justify-center rounded-lg border-2 border-dashed ${errors?.thumbnailUrl ? "border-status-error" : "border-line-normal"} px-4 py-9`}
            >
              <div className="flex flex-col items-center justify-center">
                <button
                  type="button"
                  onClick={handleUploadClick}
                  disabled={isUploading}
                  className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#D8FFF4] px-4 py-2 text-body-1-normal font-semibold text-primary-sub-1 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <PhotoIcon />
                  {isUploading ? "업로드 중..." : "사진 업로드"}
                </button>
                {(error || errors?.thumbnailUrl) && (
                  <p className="mt-2 text-sm text-status-error">
                    {error ||
                      errors?.thumbnailUrl?.message ||
                      "대표 이미지를 업로드해주세요."}
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
      />

      <div className="mt-1 flex flex-col">
        <p className="text-label-1-normal text-label-alternative">
          * 670 × 376px (4:3 비율로 자동 조정됩니다)
        </p>
        <p className="text-label-1-normal text-label-alternative">
          * 10MB 이하의 PNG, JPG 파일을 업로드 해주세요
        </p>
      </div>
    </div>
  );
}
