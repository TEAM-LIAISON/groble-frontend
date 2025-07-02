interface ArrowIconProps {
  width?: number;
  height?: number;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export default function ArrowIcon({
  width,
  height,
  className,
  direction = 'right',
}: ArrowIconProps) {
  const getArrowConfig = () => {
    switch (direction) {
      case 'left':
        return {
          width: width || 20,
          height: height || 10,
          viewBox: '0 0 20 10',
          path: 'M18.8334 5.64844C19.2476 5.64844 19.5834 5.31265 19.5834 4.89844C19.5834 4.48422 19.2476 4.14844 18.8334 4.14844V5.64844ZM0.833374 4.89844L8.33337 9.22856V0.568312L0.833374 4.89844ZM18.8334 4.89844V4.14844L7.58337 4.14844V4.89844V5.64844L18.8334 5.64844V4.89844Z',
        };
      case 'right':
        return {
          width: width || 20,
          height: height || 10,
          viewBox: '0 0 20 10',
          path: 'M1.16663 4.35156C0.752412 4.35156 0.416626 4.68735 0.416626 5.10156C0.416626 5.51578 0.752412 5.85156 1.16663 5.85156V4.35156ZM19.1666 5.10156L11.6666 0.771435V9.43169L19.1666 5.10156ZM1.16663 5.10156V5.85156L12.4166 5.85156V5.10156V4.35156L1.16663 4.35156V5.10156Z',
        };
      case 'up':
        return {
          width: width || 10,
          height: height || 20,
          viewBox: '0 0 10 20',
          path: 'M5.64844 18.8334C5.64844 19.2476 5.31265 19.5834 4.89844 19.5834C4.48422 19.5834 4.14844 19.2476 4.14844 18.8334H5.64844ZM4.89844 0.833374L0.568312 8.33337H9.22856L4.89844 0.833374ZM4.89844 18.8334H4.14844V7.58337H4.89844H5.64844V18.8334H4.89844Z',
        };
      case 'down':
        return {
          width: width || 10,
          height: height || 20,
          viewBox: '0 0 10 20',
          path: 'M4.35156 1.16663C4.35156 0.752412 4.68735 0.416626 5.10156 0.416626C5.51578 0.416626 5.85156 0.752412 5.85156 1.16663L4.35156 1.16663ZM5.10156 19.1666L9.43169 11.6666L0.771435 11.6666L5.10156 19.1666ZM5.10156 1.16663L5.85156 1.16663L5.85156 12.4166L5.10156 12.4166L4.35156 12.4166L4.35156 1.16663L5.10156 1.16663Z',
        };
      default:
        return {
          width: width || 20,
          height: height || 10,
          viewBox: '0 0 20 10',
          path: 'M1.16663 4.35156C0.752412 4.35156 0.416626 4.68735 0.416626 5.10156C0.416626 5.51578 0.752412 5.85156 1.16663 5.85156V4.35156ZM19.1666 5.10156L11.6666 0.771435V9.43169L19.1666 5.10156ZM1.16663 5.10156V5.85156L12.4166 5.85156V5.10156V4.35156L1.16663 4.35156V5.10156Z',
        };
    }
  };

  const config = getArrowConfig();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={config.width}
      height={config.height}
      viewBox={config.viewBox}
      fill="none"
      className={className}
    >
      <path d={config.path} fill="#878A93" />
    </svg>
  );
}
