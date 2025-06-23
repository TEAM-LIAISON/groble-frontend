import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  disabled?: boolean;
}

export default function LoadingSpinner({
  size = 'medium',
  color = 'text-white',
  className = '',
  disabled = false,
}: LoadingSpinnerProps) {
  // 크기에 따른 클래스 설정
  const sizeClass = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  // 크기에 따른 테두리 두께 설정
  const borderWidth = {
    small: 'border-2',
    medium: 'border-3',
    large: 'border-4',
  };

  // 색상 매핑 (더 안정적인 색상 처리)
  const getSpinnerColor = (colorClass: string, isDisabled: boolean) => {
    // disabled 상태면 회색으로 고정
    if (isDisabled) {
      return '#9ca3af'; // gray-400
    }

    const colorMap: { [key: string]: string } = {
      'text-white': '#ffffff',
      'text-black': '#000000',
      'text-blue-500': '#3b82f6',
      'text-blue-600': '#2563eb',
      'text-green-500': '#10b981',
      'text-red-500': '#ef4444',
      'text-yellow-500': '#eab308',
      'text-purple-500': '#a855f7',
      'text-indigo-500': '#6366f1',
      'text-pink-500': '#ec4899',
      'text-gray-500': '#6b7280',
      'text-gray-600': '#4b5563',
      'text-gray-700': '#374151',
    };

    return colorMap[colorClass] || '#ffffff';
  };

  const spinnerColor = getSpinnerColor(color, disabled);
  const borderOpacity = disabled ? 0.3 : 0.1; // disabled일 때 배경도 더 흐리게

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeClass[size]} ${
          borderWidth[size]
        } ${disabled ? 'opacity-60' : ''}`}
        style={{
          border: `${
            borderWidth[size].includes('2')
              ? '2px'
              : borderWidth[size].includes('3')
              ? '3px'
              : '4px'
          } solid rgba(0, 0, 0, ${borderOpacity})`,
          borderTop: `${
            borderWidth[size].includes('2')
              ? '2px'
              : borderWidth[size].includes('3')
              ? '3px'
              : '4px'
          } solid ${spinnerColor}`,
        }}
        role="status"
        aria-label={disabled ? '비활성화됨' : '로딩 중'}
      />
    </div>
  );
}
