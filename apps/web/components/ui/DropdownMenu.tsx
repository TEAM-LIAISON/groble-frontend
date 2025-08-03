'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  destructive?: boolean;
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
  trigger?: ReactNode;
  dotDirection?: 'vertical' | 'horizontal';
  className?: string;
}

export default function DropdownMenu({
  items,
  trigger,
  dotDirection = 'vertical',
  className = '',
}: DropdownMenuProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 기본 트리거 아이콘 렌더링
  const renderDefaultTrigger = () => {
    if (dotDirection === 'vertical') {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="13" r="1.5" />
        </svg>
      );
    }
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="3" cy="8" r="1.5" />
        <circle cx="8" cy="8" r="1.5" />
        <circle cx="13" cy="8" r="1.5" />
      </svg>
    );
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
        className="p-1 text-label-alternative hover:text-label-normal cursor-pointer"
      >
        {trigger || renderDefaultTrigger()}
      </button>

      {showDropdown && (
        <div
          style={{
            boxShadow:
              '0px 5px 12px 0px rgba(0, 0, 0, 0.05), 0px 1px 5px 0px rgba(0, 0, 0, 0.05), 0px 0px 2px 0px rgba(0, 0, 0, 0.05)',
          }}
          className="absolute right-0 top-7 z-10  bg-white rounded-lg min-w-[6.6rem]"
        >
          {items.map((item, index) => (
            <div key={item.id}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  item.onClick();
                  setShowDropdown(false);
                }}
                className={
                  'w-full px-4 pt-3 pb-2 text-left text-body-1-normal text-label-normal hover:bg-gray-50 flex items-center gap-2 cursor-pointer '
                }
              >
                {item.icon}
                {item.label}
              </button>
              {index < items.length - 1 && (
                <div className="w-[70%] mx-auto border-b border-line-alternative" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
