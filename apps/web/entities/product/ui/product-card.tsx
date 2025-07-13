'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { ProductCardProps } from '../model';

export default function ProductCard({
  contentId,
  thumbnailUrl,
  title,
  sellerName,
  lowestPrice,
  priceOptionLength,

  // 새로운 속성들 (기본값 적용)
  star = false,
  isRow = false,
  dotDirection = 'horizontal',

  // 조건부 데이터
  orderStatus,
  purchasedAt,
  merchantUid,
  rating,
  optionName,
  dropdownItems,
  finalPrice,
  originalPrice,
}: ProductCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 상태 표시 여부 (orderStatus가 있으면 표시)
  const shouldShowStatus = !!orderStatus;

  // 더보기 드롭다운 표시 여부 (dropdownItems가 있으면 표시)
  const shouldShowDropdown = !!dropdownItems && dropdownItems.length > 0;

  // 상태 텍스트 변환
  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return '판매중';
      case 'DRAFT':
        return '작성중';
      case 'PAID':
        return '결제완료';
      case 'EXPIRED':
        return '기간만료';
      case 'CANCELLED':
        return '결제취소';
      default:
        return '';
    }
  };

  // 상태 색상 클래스
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-primary-sub-1';
      case 'DRAFT':
        return 'text-primary-sub-1';
      case 'PAID':
        return 'text-status-success';
      case 'EXPIRED':
        return 'text-label-neutral';
      case 'CANCELLED':
        return 'text-status-error';
      default:
        return 'text-label-neutral';
    }
  };

  // 표시할 가격 계산
  const displayPrice = finalPrice ?? lowestPrice;

  // 라우팅 URL 결정
  const getHref = () => {
    if (shouldShowStatus && merchantUid) {
      return `/manage/purchase/${merchantUid}`;
    }
    return `/products/${contentId}`;
  };

  const href = getHref();

  // 더보기 아이콘 렌더링
  const renderDropdownIcon = () => {
    if (dotDirection === 'vertical') {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="13" r="1.5" />
        </svg>
      );
    } else {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="3" cy="8" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="13" cy="8" r="1.5" />
        </svg>
      );
    }
  };

  return (
    <div
      className={`group flex w-full ${isRow ? 'flex-row gap-4' : 'flex-col'}`}
    >
      {/* 상품 이미지 */}
      <Link
        href={href}
        className={`relative overflow-hidden rounded-[0.8rem] border border-line-normal bg-gray-100 block ${
          isRow ? 'w-[9.9rem] h-[7.4rem] flex-shrink-0' : 'mb-2 w-full xl:mb-3'
        }`}
        style={!isRow ? { aspectRatio: '4/3' } : undefined}
      >
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
      </Link>

      {/* 상품 정보 */}
      <div
        className={`flex flex-col space-y-[0.12rem] ${isRow ? 'flex-1' : ''}`}
      >
        {/* 상태 정보 (orderStatus가 있을 때만 표시) */}
        {shouldShowStatus && purchasedAt && (
          <div className="flex items-center gap-1 mb-1">
            <p
              className={`text-caption-1 font-semibold ${getStatusColor(
                orderStatus
              )}`}
            >
              {getStatusText(orderStatus)}
            </p>
            <p className="text-caption-1 text-label-neutral">·</p>
            <p className="text-caption-1 text-label-neutral">
              {new Date(purchasedAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: 'numeric',
              })}
            </p>
          </div>
        )}

        {/* 제목과 더보기 아이콘 */}
        <div className="flex items-start justify-between">
          <Link href={href} className="flex-1">
            <h3 className="line-clamp-2 font-semibold text-label-normal text-body-2-normal">
              {title}
            </h3>
          </Link>

          {/* 더보기 드롭다운 (dropdownItems가 있을 때만 표시) */}
          {shouldShowDropdown && (
            <div className="relative ml-2" ref={dropdownRef}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowDropdown(!showDropdown);
                }}
                className="flex items-center cursor-pointer justify-center w-6 h-6 text-label-alternative hover:text-label-normal"
              >
                {renderDropdownIcon()}
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-7 z-10 w-48 py-1 bg-white border border-line-normal rounded-lg shadow-lg">
                  {dropdownItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        item.onClick();
                        setShowDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${
                        item.destructive
                          ? 'text-status-error'
                          : 'text-label-normal'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 브랜드명 */}
        <Link href={href}>
          <p className="text-label-1-reading lg:text-label-1-normal text-label-alternative">
            {sellerName}
          </p>
        </Link>

        {/* 가격 (값이 있을 때만 표시) */}
        {displayPrice && (
          <Link href={href}>
            <p className="text-body-2-normal font-bold">
              {displayPrice.toLocaleString()}
              <span className="font-medium">원</span>
              {priceOptionLength && priceOptionLength > 1 && (
                <span className="ml-1 font-medium">~</span>
              )}
            </p>
          </Link>
        )}

        {/* 옵션 정보 (값이 있을 때만 표시) */}
        {optionName && (
          <p className="text-caption-1 text-label-alternative">{optionName}</p>
        )}

        {/* 별점 (star가 true일 때만 표시) */}
        {star && rating && (
          <div className="flex items-center">
            <svg
              className="h-3 w-3 text-yellow-400 sm:h-3.5 sm:w-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-xs text-gray-500">
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
