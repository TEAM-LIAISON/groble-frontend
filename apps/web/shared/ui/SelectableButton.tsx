import React from 'react';

interface SelectableButtonProps {
  /** 버튼 내용 */
  children: React.ReactNode;
  /** 선택된 상태 */
  selected?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 버튼 타입 */
  type?: 'button' | 'submit' | 'reset';
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
}

/**
 * 선택 가능한 버튼 컴포넌트
 * 선택된 상태에 따라 다른 스타일이 적용됩니다.
 */
export default function SelectableButton({
  children,
  selected = false,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = true,
}: SelectableButtonProps) {
  const baseClasses = `
    text-body-2-normal text-label-normal border rounded-lg py-4 px-[0.88rem] 
    flex justify-start cursor-pointer transition-colors duration-200
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'cursor-not-allowed opacity-50' : ''}
  `;

  const selectedClasses = selected
    ? 'border-primary-sub-1 bg-[#EEFFFA]'
    : 'border-line-normal';

  const combinedClasses =
    `${baseClasses} ${selectedClasses} ${className}`.trim();

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
