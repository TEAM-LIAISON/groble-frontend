'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (e: { target: { value: string; name?: string } }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  error?: boolean;
  label?: string;
  type?: 'black' | 'grey';
  showDescription?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = '',
  className = '',
  disabled = false,
  name,
  error,
  label,
  type = 'black',
  showDescription = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 옵션 찾기 - 명시적으로 문자열 비교
  const selectedOption = options.find(
    (opt) => String(opt.value) === String(value)
  );

  // 값이 있으면 에러 스타일을 적용하지 않음
  const shouldShowError = error && (!value || value.trim() === '');

  // type에 따른 스타일 클래스 결정
  const getBorderClass = () => {
    if (shouldShowError) return 'border-[1.5px] border-status-error';
    return type === 'grey' ? 'border border-line-normal' : 'border';
  };

  const getPlaceholderTextClass = () => {
    if (shouldShowError) return 'text-status-error';
    return type === 'grey' ? 'text-label-alternative' : '';
  };

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 값 선택 처리
  const handleOptionClick = (option: Option) => {
    // 이벤트 객체 생성
    const syntheticEvent = {
      target: {
        value: option.value,
        name: name,
      },
    };

    // onChange 호출
    onChange(syntheticEvent);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      {/* 라벨 */}
      {label && (
        <p className="text-body-1-normal font-semibold text-label-normal mb-2">
          {label}
        </p>
      )}
      {/* 선택 UI */}
      <div
        className={` flex w-full cursor-pointer items-center justify-between rounded-8 ${getBorderClass()} bg-background-normal px-[14px] py-[16px] text-left text-body-2-normal font-medium transition-colors ${disabled ? 'cursor-not-allowed opacity-50' : ''
          } `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`${!selectedOption ? getPlaceholderTextClass() : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Down isOpen={isOpen} />
      </div>
      {/* 드롭다운 목록 */}
      {isOpen && !disabled && (
        <div
          className={`${getBorderClass()} absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-8 bg-white`}
        >
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer px-[14px] py-[16px] text-body-2-normal font-medium transition-colors hover:bg-gray-50 ${String(option.value) === String(value) ? 'bg-gray-100' : ''
                  }`}
                onClick={() => handleOptionClick(option)}
                data-value={option.value} // 디버깅을 위한 data 속성 추가
              >
                {showDescription && option.description ? (
                  <div className="flex justify-between items-center gap-2">
                    <span className="truncate flex-1 text-left">
                      {option.label}
                    </span>
                    <span className="text-body-2-normal text-primary-sub-1 truncate flex-shrink-0 max-w-[40%] text-right">
                      {option.description}
                    </span>
                  </div>
                ) : (
                  <span className="truncate block">{option.label}</span>
                )}
              </div>
            ))
          ) : (
            <div className="px-[14px] py-[16px] text-center text-body-2-normal text-gray-400">
              옵션이 없습니다
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Down({ isOpen = false }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none transition-transform ${isOpen ? 'rotate-180' : ''
        }`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.36191 6.15046C3.57319 5.94522 3.91084 5.95011 4.11608 6.16139L7.88907 10.0454L11.8951 6.15061C12.1063 5.94529 12.4439 5.95004 12.6493 6.16123C12.8546 6.37243 12.8498 6.71008 12.6386 6.91541L8.25007 11.1821C8.14862 11.2807 8.01214 11.335 7.87067 11.333C7.7292 11.3309 7.59433 11.2728 7.49574 11.1713L3.35098 6.90463C3.14574 6.69335 3.15063 6.3557 3.36191 6.15046Z"
        fill="#171717"
      />
    </svg>
  );
}
