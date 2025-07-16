import Image from 'next/image';
import { ReactNode } from 'react';

interface NoContentProps {
  /** 표시할 이미지 경로 (기본값: groble-3d-folder.svg) */
  imageSrc?: string;
  /** 이미지 alt 텍스트 */
  imageAlt?: string;
  /** 메인 메시지 */
  message: string;
  /** 부가 설명 텍스트 (선택사항) */
  description?: string;
  /** 추가 액션 버튼이나 컴포넌트 (선택사항) */
  action?: ReactNode;
  /** 컨테이너 추가 클래스명 */
  className?: string;
  /** 메인 텍스트 커스텀 클래스명 (제공되면 기본 스타일 무시) */
  mainTextClassName?: string;
}

export default function NoContent({
  imageSrc = '/images/groble-3d-folder.svg',
  imageAlt = 'empty-content',
  message,
  description,
  action,
  className = '',
  mainTextClassName = '',
}: NoContentProps) {
  // mainTextClassName이 있으면 커스텀 스타일만, 없으면 기본 스타일 사용
  const textClassName = mainTextClassName
    ? mainTextClassName
    : 'text-body-1-normal md:text-title-3 font-medium md:font-bold mt-3';

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${className}`}
    >
      {/* 이미지 */}
      <div className="md:w-[180px] md:h-[180px] w-[160px] h-[160px] relative mb-3">
        <Image src={imageSrc} alt={imageAlt} fill />
      </div>

      {/* 메인 메시지 */}
      <p className={textClassName}>{message}</p>

      {/* 부가 설명 (있는 경우) */}
      {description && (
        <p className="text-label-2-reading md:text-body-1-reading text-gray-600 mt-2">
          {description}
        </p>
      )}

      {/* 액션 버튼 (있는 경우) */}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
