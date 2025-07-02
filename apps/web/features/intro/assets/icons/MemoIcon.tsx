interface MemoIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function MemoIcon({
  width = 41,
  height = 41,
  className,
}: MemoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 41 41"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_3245_45358)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.7319 34.7675V5.43555C30.7319 4.33055 29.8369 3.43555 28.7319 3.43555H12.3989L2.3999 13.4355V34.7675C2.3999 35.8725 3.2949 36.7675 4.3999 36.7675H28.7319C29.8369 36.7675 30.7319 35.8725 30.7319 34.7675Z"
          fill="#E5E9EE"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.3999 13.4355H2.3999L12.3989 3.43555V11.4355C12.3989 12.5405 11.5039 13.4355 10.3989 13.4355H10.3999Z"
          fill="#C0C7D1"
        />
        <path
          d="M31.3578 14.9401L17.1895 29.1084L22.5635 34.4824L36.7318 20.3141L31.3578 14.9401Z"
          fill="#FFAA00"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M38.9497 18.0955L36.7317 20.3135L31.3577 14.9395L33.5747 12.7225C34.1747 12.1225 35.1467 12.1225 35.7467 12.7225L38.9487 15.9245C39.5487 16.5245 39.5487 17.4965 38.9487 18.0965L38.9497 18.0955Z"
          fill="#FF9000"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.9458 36.2556L18.5718 35.5516L16.1198 33.0986L15.4158 35.7256C15.3298 36.0476 15.6238 36.3416 15.9458 36.2556Z"
          fill="#313D4C"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.1199 33.0984L18.5729 35.5514L22.5639 34.4814L17.1899 29.1084L16.1199 33.0984Z"
          fill="#FFCCA8"
        />
      </g>
      <defs>
        <clipPath id="clip0_3245_45358">
          <rect
            width="40"
            height="40"
            fill="white"
            transform="translate(0.899902 0.101562)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
