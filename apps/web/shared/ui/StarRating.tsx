import StarIcon from '@/shared/icons/StarIcon';

interface StarRatingProps {
  /** 별점 (0-5) */
  rating: number;
  /** 별 아이콘 크기 (기본값: 16) */
  size?: number;
  /** 총 별 개수 (기본값: 5) */
  maxStars?: number;
  /** 추가 CSS 클래스 */
  className?: string;
}

export default function StarRating({
  rating,
  size = 16,
  maxStars = 5,
  className = '',
}: StarRatingProps) {
  // 반올림하여 채워질 별의 개수 계산
  const filledStars = Math.round(rating);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: maxStars }, (_, index) => (
        <StarIcon key={index} filled={index < filledStars} size={size} />
      ))}
    </div>
  );
}
