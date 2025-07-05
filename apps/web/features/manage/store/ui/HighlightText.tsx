/**
 * 형광펜 효과를 적용하는 텍스트 컴포넌트
 */
interface HighlightTextProps {
  children: React.ReactNode;
  color?: string;
  intensity?: number; // 0-100, 형광펜 진하기
  thickness?: number; // 1-5, 형광펜 두께 (배수)
  className?: string;
}

export default function HighlightText({
  children,
  color = '#BBFFEC',
  intensity = 60,
  thickness = 1,
  className = '',
}: HighlightTextProps) {
  const highlightStyle = {
    background: `linear-gradient(180deg, transparent ${intensity}%, ${color} ${intensity}%)`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0',
    paddingBottom: `${thickness * 2}px`,
  };

  return (
    <span
      className={`relative inline-block ${className}`}
      style={highlightStyle}
    >
      {children}
    </span>
  );
}

/**
 * 다양한 형광펜 스타일 프리셋
 */
export const HighlightStyles = {
  mint: { color: '#BBFFEC', intensity: 60 },
  yellow: { color: '#FFF2B3', intensity: 60 },
  pink: { color: '#FFE1E6', intensity: 60 },
  blue: { color: '#E1F5FE', intensity: 60 },
  orange: { color: '#FFE0B2', intensity: 60 },

  // 진한 버전
  mintBold: { color: '#BBFFEC', intensity: 50, thickness: 2 },
  yellowBold: { color: '#FFF2B3', intensity: 50, thickness: 2 },
};
