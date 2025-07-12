'use client';

import React, { useEffect } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title?: string;
  subText?: string;
  actionButton: string;
  secondaryButton?: string;
  onActionClick: (() => void) | 'close';
  onSecondaryClick?: () => void;
  actionButtonColor?: 'primary' | 'danger';
  // Textarea 관련 props
  hasTextarea?: boolean;
  textareaValue?: string;
  onTextareaChange?: (value: string) => void;
  textareaPlaceholder?: string;
  textareaLabel?: string;
  textareaRequired?: boolean;
  textareaMaxLength?: number;
  textareaRows?: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  subText,
  actionButton,
  secondaryButton,
  onActionClick,
  onSecondaryClick,
  actionButtonColor = 'primary',
  hasTextarea = false,
  textareaValue = '',
  onTextareaChange,
  textareaPlaceholder = '',
  textareaLabel,
  textareaRequired = false,
  textareaMaxLength,
  textareaRows = 4,
}) => {
  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      onRequestClose();
    }
  };

  const handleActionClick = () => {
    // textarea가 있고 required인 경우 validation
    if (hasTextarea && textareaRequired && !textareaValue.trim()) {
      return; // 빈 값이면 실행하지 않음
    }

    if (onActionClick === 'close') {
      onRequestClose();
    } else {
      onActionClick();
    }
  };

  // textarea가 required이고 비어있으면 버튼 비활성화
  const isActionDisabled =
    hasTextarea && textareaRequired && !textareaValue.trim();

  // ESC 키로 모달 닫기 및 스크롤 방지
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);

      // 스크롤바 너비 계산
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // 배경 스크롤 방지 및 스크롤바 너비 보상
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen, onRequestClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onRequestClose}
        aria-hidden="true"
      />

      {/* 모달 컨텐츠 */}
      <div
        className={`w-[18rem] md:min-w-[25rem] relative bg-white rounded-2xl pt-7 md:pt-8 px-5 md:px-8 pb-5 md:pb-6  ${
          hasTextarea ? 'max-w-md' : 'max-w-sm'
        }`}
      >
        {/* 제목 */}
        <div className="text-left mb-1 md:mb-4">
          <h2 className="text-headline-1 md:text-title-3 font-bold text-label-normal mb-2">
            {title}
          </h2>
          {subText && (
            <p className="text-body-2-normal md:text-headline-1 text-label-neutral leading-7 tracking-[0.009em] whitespace-pre-line">
              {subText}
            </p>
          )}
        </div>

        {/* Textarea 영역 */}
        {hasTextarea && (
          <div className="mb-6">
            {textareaLabel && (
              <label className="block text-body-1-normal text-label-neutral mb-2">
                {textareaLabel}
                {textareaRequired && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
            )}
            <textarea
              value={textareaValue}
              onChange={(e) => onTextareaChange?.(e.target.value)}
              placeholder={textareaPlaceholder}
              rows={textareaRows}
              maxLength={textareaMaxLength}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            {textareaMaxLength && (
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-500">
                  {textareaValue.length}/{textareaMaxLength}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 버튼 그룹 */}
        <div className="flex gap-2 mt-5 md:mt-8">
          {/* 보조 버튼 (닫기) - secondaryButton이 있을 때만 표시 */}
          {secondaryButton && (
            <Button
              onClick={handleSecondaryClick}
              group="solid"
              type="secondary"
              size="medium"
              className="w-full"
            >
              {secondaryButton}
            </Button>
          )}

          {/* 주요 액션 버튼 */}
          <Button
            onClick={handleActionClick}
            disabled={isActionDisabled}
            group="solid"
            type="primary"
            size="medium"
            error={actionButtonColor === 'danger'}
            className={` w-full`}
          >
            {actionButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// 커스텀 모달 컴포넌트
interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  // ESC 키로 모달 닫기 및 스크롤 방지
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);

      // 스크롤바 너비 계산
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // 배경 스크롤 방지 및 스크롤바 너비 보상
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen, onRequestClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onRequestClose}
        aria-hidden="true"
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white w-full max-w-[25rem] mx-auto  rounded-[1.25rem] ">
        {/* 커스텀 내용 */}
        {children}
      </div>
    </div>
  );
};
