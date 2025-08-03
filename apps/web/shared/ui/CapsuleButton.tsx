'use client';

import { useEffect, useRef, useState } from 'react';

interface CapsuleButtonProps {
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 버튼 크기 */
  size?: 's' | 'm' | 'l';
  /** 버튼 타입 */
  type?: 'primary' | 'secondary';
  /** 활성화 상태 */
  activated?: boolean;
  /** 화살표 아이콘 표시 여부 */
  showIcon?: boolean;
  /** 버튼 텍스트 */
  textValue: string;
  /** 드롭다운 메뉴 옵션들 */
  menuOptions?: Array<{
    label: string;
    value: string;
  }>;
  /** 메뉴 선택 시 콜백 */
  onMenuSelect?: (value: string) => void;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

export default function CapsuleButton({
  disabled = false,
  size = 'm',
  type = 'secondary',
  activated = false,
  showIcon = false,
  textValue,
  menuOptions,
  onMenuSelect,
  onClick,
  className = '',
}: CapsuleButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 버튼 크기별 스타일
  const sizeStyles = {
    s: 'px-4 py-2 text-caption-1',
    m: 'px-4 py-2 text-label-1-normal',
    l: 'px-5 py-2.5 text-body-1-normal font-semibold',
  };

  // 버튼 타입별 스타일
  const getTypeStyles = () => {
    if (disabled) {
      if (type === 'primary') {
        return 'bg-interaction-disabled text-label-disabled border-interaction-disabled';
      }
      return 'bg-white text-label-neutral border-line-normal';
    }

    if (activated) {
      if (type === 'primary') {
        return 'bg-primary-sub-1 text-white border-primary-sub-1';
      }
      return 'bg-white text-primary-sub-1 border-primary-sub-1';
    }

    if (type === 'primary') {
      return 'bg-component-fill-alternative text-label-neutral border-component-fill-alternative hover:bg-primary-alternative';
    }

    return 'bg-white text-label-alternative border-line-normal hover:border-label-assistive';
  };

  // 아이콘 색상 스타일
  const getIconColorClass = () => {
    if (disabled) {
      return type === 'primary' ? 'text-label-disabled' : 'text-label-neutral';
    }

    if (activated && type === 'secondary') {
      return 'text-primary-sub-1';
    }

    return 'text-current';
  };

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    if (disabled) return;

    if (menuOptions && menuOptions.length > 0) {
      setIsMenuOpen(!isMenuOpen);
    } else if (onClick) {
      onClick();
    }
  };

  const handleMenuItemClick = (value: string) => {
    if (onMenuSelect) {
      onMenuSelect(value);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        disabled={disabled}
        className={`
          inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors
          ${sizeStyles[size]}
          ${getTypeStyles()}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span>{textValue}</span>
        {showIcon && (
          <svg
            className={`transition-transform ${
              isMenuOpen ? 'rotate-180' : ''
            } ${getIconColorClass()}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* 드롭다운 메뉴 */}
      {menuOptions && menuOptions.length > 0 && isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 mt-2 min-w-[120px] bg-white border border-line-normal rounded-lg z-50"
          style={{
            boxShadow:
              '0px 5px 12px 0px rgba(0, 0, 0, 0.05), 0px 1px 5px 0px rgba(0, 0, 0, 0.05), 0px 0px 2px 0px rgba(0, 0, 0, 0.05)',
          }}
        >
          {menuOptions.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleMenuItemClick(option.value)}
              className={`
                w-full px-4 py-3 text-left text-body-1-normal text-label-normal
                hover:bg-background-alternative transition-colors
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${
                  index === menuOptions.length - 1
                    ? 'rounded-b-lg'
                    : 'border-b border-line-normal'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
