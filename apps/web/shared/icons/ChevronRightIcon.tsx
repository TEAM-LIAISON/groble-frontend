interface ChevronRightIconProps {
  /** 아이콘 너비 (기본값: 16) */
  width?: number;
  /** 아이콘 높이 (기본값: 16) */
  height?: number;
  /** 아이콘 색상 (기본값: #008660) */
  color?: string;
  /** 추가 클래스명 */
  className?: string;
}

export default function ChevronRightIcon({
  width = 16,
  height = 16,
  color = '#008660',
  className = '',
}: ChevronRightIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.15095 3.36093C5.94571 3.57221 5.9506 3.90986 6.16188 4.1151L10.0458 7.88809L6.1511 11.8941C5.94577 12.1053 5.95053 12.443 6.16172 12.6483C6.37291 12.8536 6.71057 12.8489 6.91589 12.6377L11.1826 8.24909C11.2812 8.14764 11.3355 8.01117 11.3334 7.86969C11.3314 7.72822 11.2733 7.59335 11.1718 7.49476L6.90512 3.35C6.69384 3.14476 6.35619 3.14966 6.15095 3.36093Z"
        fill={color}
      />
    </svg>
  );
}
