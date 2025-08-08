'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@groble/ui';
import { ClipIcon } from '@/components/(improvement)/icons/ClipIcon';

export interface FileUploadProps {
  /** 파일 업로드 API 함수 */
  uploadApi: (file: File) => Promise<string>;
  /** 허용되는 파일 타입 (예: ['.pdf', '.zip']) */
  acceptedTypes?: string[];
  /** 허용되는 MIME 타입 (예: ['application/pdf']) */
  acceptedMimeTypes?: string[];
  /** 최대 파일 크기 (MB) */
  maxSizeInMB?: number;
  /** 업로드 버튼 텍스트 */
  uploadButtonText?: string;
  /** 안내 텍스트 */
  helpText?: string;
  /** 드래그 앤 드롭 안내 텍스트 */
  dragDropText?: string;
  /** 초기 파일 URL */
  initialFileUrl?: string;
  /** 초기 원본 파일명 (서버에서 전달된 값) */
  initialOriginalFileName?: string;
  /** 파일 URL 변경 콜백 */
  onFileUrlChange: (url: string | null) => void;
  /** 에러 발생 콜백 */
  onError?: (error: string) => void;
  /** 커스텀 스타일 클래스 */
  className?: string;
  /** 에러 상태 (외부에서 전달) */
  error?: boolean;
}

export default function FileUpload({
  uploadApi,
  acceptedTypes = ['.pdf', '.zip'],
  acceptedMimeTypes = [
    'application/pdf',
    'application/zip',
    'application/x-zip-compressed',
  ],
  maxSizeInMB = 10,
  uploadButtonText = '파일 업로드',
  helpText,
  dragDropText = '',
  initialFileUrl,
  initialOriginalFileName,
  onFileUrlChange,
  onError,
  className = '',
  error = false,
}: FileUploadProps) {
  // 상태 관리
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(!!initialFileUrl);
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(
    initialFileUrl || null
  );
  const [originalFileName, setOriginalFileName] = useState<string | null>(
    initialOriginalFileName || null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 초기 파일 URL 설정
  useEffect(() => {
    if (initialFileUrl) {
      setIsFileUploaded(true);
      setCurrentFileUrl(initialFileUrl);
    }
    if (initialOriginalFileName) {
      setOriginalFileName(initialOriginalFileName);
    }
  }, [initialFileUrl, initialOriginalFileName]);

  // 파일 업로드 버튼 클릭 핸들러
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 검증
  const validateFile = (file: File): string | null => {
    // 파일 크기 검사
    if (file.size > maxSizeInMB * 1024 * 1024) {
      return `파일 크기는 ${maxSizeInMB}MB 이하여야 합니다.`;
    }

    // 파일 확장자 검사
    const fileName = file.name.toLowerCase();
    const hasValidExtension = acceptedTypes.some((type) =>
      fileName.endsWith(type.toLowerCase())
    );

    // MIME 타입 검사
    const hasValidMimeType = acceptedMimeTypes.includes(file.type);

    // 둘 중 하나라도 통과하면 OK (브라우저별 MIME 타입 차이 대응)
    if (!hasValidExtension && !hasValidMimeType) {
      const typeText = acceptedTypes
        .join(', ')
        .toUpperCase()
        .replace(/\./g, '');
      return `${typeText} 파일만 업로드 가능합니다.`;
    }

    return null;
  };

  // 파일 처리 핸들러
  const handleFile = async (file: File) => {
    // 파일 검증
    const validationError = validateFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      onError?.(validationError);
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);
    setUploadedFile(file);

    try {
      // 파일 업로드 API 호출
      const fileUrl = await uploadApi(file);

      // 상태 업데이트
      setCurrentFileUrl(fileUrl);
      setIsFileUploaded(true);
      onFileUrlChange(fileUrl);
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : '파일 업로드 중 오류가 발생했습니다.';
      setErrorMessage(errorMsg);
      onError?.(errorMsg);
      console.error('파일 업로드 오류:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // 파일 삭제 핸들러
  const handleFileDelete = () => {
    setUploadedFile(null);
    setIsFileUploaded(false);
    setCurrentFileUrl(null);
    setErrorMessage(null);
    onFileUrlChange(null);
  };

  // 파일 이름 추출
  const getFileName = (): string => {
    if (uploadedFile) return uploadedFile.name;

    if (originalFileName) return originalFileName;

    if (currentFileUrl) {
      try {
        const { pathname } = new URL(currentFileUrl);
        const lastSegment = pathname.split('/').pop() ?? ''; // 825c9a86..._FigmaBeta.zip
        const underscoreIdx = lastSegment.indexOf('_');

        // 언더바가 있으면 뒷부분만, 없으면 그대로 반환
        const rawName =
          underscoreIdx >= 0
            ? lastSegment.slice(underscoreIdx + 1)
            : lastSegment;

        // 퍼센트 인코딩(%20 등) 제거
        try {
          return decodeURIComponent(rawName);
        } catch {
          return rawName;
        }
      } catch {
        return '업로드된 파일';
      }
    }

    return '';
  };

  // 드래그 이벤트 핸들러
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={className}>
      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* 드래그 앤 드롭 영역 */}
      <div
        className={`mb-2 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed ${
          isDragging
            ? 'border-primary-main bg-primary-lightest'
            : error
            ? 'border-status-error'
            : 'border-line-neutral'
        } py-9 transition-colors`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="text-primary-main flex items-center gap-2">
              <svg
                className="text-primary-main h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>업로드 중...</span>
            </div>
          </div>
        ) : isFileUploaded ? (
          <div className="flex flex-col items-center">
            <div className="text-primary-main flex items-center gap-2">
              <ClipIcon />
              <span className="font-medium">{getFileName()}</span>
            </div>
            <div className="mt-2 flex gap-2">
              <Button
                group="outlined"
                type="tertiary"
                size="x-small"
                buttonType="button"
                onClick={handleFileUpload}
                className="hover:brightness-95"
              >
                파일 변경
              </Button>
              <Button
                group="outlined"
                type="tertiary"
                size="x-small"
                buttonType="button"
                onClick={handleFileDelete}
                className="border-red-500 text-red-500 hover:bg-red-50 hover:brightness-95"
              >
                삭제하기
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Button
              group="solid"
              type="tertiary"
              size="x-small"
              buttonType="button"
              onClick={handleFileUpload}
              className="flex items-center gap-2 hover:brightness-95"
            >
              <ClipIcon />
              {uploadButtonText}
            </Button>
            {helpText && (
              <span className="mt-2 text-label-1-normal text-label-alternative">
                {helpText}
              </span>
            )}
            {errorMessage && (
              <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
            )}
          </>
        )}
      </div>

      {/* 드래그 앤 드롭 안내 텍스트 */}
      <span className="text-label-1-normal text-label-alternative">
        {dragDropText}
      </span>
    </div>
  );
}
