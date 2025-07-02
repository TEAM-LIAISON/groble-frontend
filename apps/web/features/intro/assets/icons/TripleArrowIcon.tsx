interface TripleArrowIconProps {
  width?: number;
  height?: number;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export default function TripleArrowIcon({
  width,
  height,
  className,
  direction = 'right',
}: TripleArrowIconProps) {
  const getArrowConfig = () => {
    switch (direction) {
      case 'left':
        return {
          width: width || 60,
          height: height || 36,
          viewBox: '0 0 60 36',
          paths: [
            'M57.0712 33.4126L41.5567 17.8981L57.0712 2.38367',
            'M37.6014 33.4126L22.087 17.8981L37.6014 2.38367',
            'M18.1344 33.4126L2.62 17.8981L18.1344 2.38367',
          ],
          colors: ['#008660', '#878A93', '#C2C4C8'],
        };
      case 'right':
        return {
          width: width || 60,
          height: height || 36,
          viewBox: '0 0 60 36',
          paths: [
            'M2.92883 2.5874L18.4433 18.1019L2.92883 33.6163',
            'M22.3986 2.5874L37.913 18.1019L22.3986 33.6163',
            'M41.8656 2.5874L57.38 18.1019L41.8656 33.6163',
          ],
          colors: ['#C2C4C8', '#878A93', '#008660'],
        };
      case 'up':
        return {
          width: width || 36,
          height: height || 60,
          viewBox: '0 0 36 60',
          paths: [
            'M33.6163 57.0712L18.1019 41.5567L2.5874 57.0712',
            'M33.6163 37.6014L18.1019 22.087L2.5874 37.6014',
            'M33.6163 18.1344L18.1019 2.62L2.5874 18.1344',
          ],
          colors: ['#C2C4C8', '#878A93', '#008660'],
        };
      case 'down':
        return {
          width: width || 36,
          height: height || 60,
          viewBox: '0 0 36 60',
          paths: [
            'M2.38367 2.92883L17.8981 18.4433L33.4126 2.92883',
            'M2.38367 22.3986L17.8981 37.913L33.4126 22.3986',
            'M2.38367 41.8656L17.8981 57.38L33.4126 41.8656',
          ],
          colors: ['#C2C4C8', '#878A93', '#008660'],
        };
      default:
        return {
          width: width || 60,
          height: height || 36,
          viewBox: '0 0 60 36',
          paths: [
            'M2.92883 2.5874L18.4433 18.1019L2.92883 33.6163',
            'M22.3986 2.5874L37.913 18.1019L22.3986 33.6163',
            'M41.8656 2.5874L57.38 18.1019L41.8656 33.6163',
          ],
          colors: ['#C2C4C8', '#878A93', '#008660'],
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
      {config.paths.map((path, index) => (
        <path
          key={index}
          d={path}
          stroke={config.colors[index]}
          strokeWidth="4.09712"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
