import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'medium',
  color = 'text-white',
  className = '',
}: LoadingSpinnerProps) {
  // 크기에 따른 클래스 설정
  const sizeClass = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-solid ${color} ${sizeClass[size]}`}
        role="status"
        aria-label="로딩 중"
      />
    </div>
  );
}
