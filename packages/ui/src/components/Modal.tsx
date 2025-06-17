'use client';

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
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

  const actionButtonClass =
    actionButtonColor === 'danger'
      ? 'bg-danger-normal hover:bg-danger-dark text-label-normal'
      : 'bg-primary-normal hover:bg-primary-dark text-label-normal';

  // textarea가 required이고 비어있으면 버튼 비활성화
  const isActionDisabled =
    hasTextarea && textareaRequired && !textareaValue.trim();
  const actionButtonDisabledClass = isActionDisabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

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
        className={`relative bg-white rounded-2xl p-6 w-full mx-auto shadow-xl ${
          hasTextarea ? 'max-w-md' : 'max-w-sm'
        }`}
      >
        {/* 제목 */}
        <div className="text-left mb-4">
          <h2 className="text-lg font-semibold text-label-normal mb-2">
            {title}
          </h2>
          {subText && <p className="text-sm text-gray-600">{subText}</p>}
        </div>

        {/* Textarea 영역 */}
        {hasTextarea && (
          <div className="mb-6">
            {textareaLabel && (
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
        <div className="flex gap-3 mt-6">
          {/* 보조 버튼 (닫기) - secondaryButton이 있을 때만 표시 */}
          {secondaryButton && (
            <button
              onClick={handleSecondaryClick}
              className="cursor-pointer flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
            >
              {secondaryButton}
            </button>
          )}

          {/* 주요 액션 버튼 */}
          <button
            onClick={handleActionClick}
            disabled={isActionDisabled}
            className={`cursor-pointer bg-primary-normal hover:brightness-95 ${
              secondaryButton ? 'flex-1' : 'w-full'
            } py-3 px-4 rounded-xl font-medium transition-colors ${actionButtonClass} ${actionButtonDisabledClass}`}
          >
            {actionButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
