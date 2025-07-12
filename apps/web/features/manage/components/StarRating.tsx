// 별점 컴포넌트
interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'default' | 'small';
}

export default function StarRating({
  rating,
  onRatingChange,
  readOnly = false,
  size = 'default',
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = (star: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(star);
    }
  };

  // 크기에 따른 스타일 설정
  const sizeStyles = {
    default: {
      width: 32,
      height: 31,
      gap: 'gap-1',
    },
    small: {
      width: 20,
      height: 19,
      gap: 'gap-2',
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div className={`flex items-center ${currentSize.gap}`}>
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          className={`transition-colors focus:outline-none ${
            readOnly ? 'cursor-default' : 'cursor-pointer'
          }`}
          disabled={readOnly}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={currentSize.width}
            height={currentSize.height}
            viewBox="0 0 32 31"
            fill="none"
          >
            <path
              d="M7.30746 30.2505C6.51719 30.8164 5.45525 30.0523 5.75954 29.1366L8.8682 19.7824C9.00525 19.37 8.85525 18.9176 8.49772 18.6649L0.422542 12.958C-0.373276 12.3956 0.029876 11.1565 1.00869 11.1565H10.977C11.4125 11.1565 11.7986 10.8802 11.934 10.4717L15.0232 1.14579C15.3253 0.233962 16.6317 0.232204 16.9362 1.14322L20.0558 10.4742C20.192 10.8814 20.5774 11.1565 21.0119 11.1565H30.9913C31.9693 11.1565 32.373 12.3938 31.5788 12.957L23.5311 18.6647C23.1745 18.9176 23.0251 19.3694 23.1619 19.7812L26.2765 29.1532C26.5803 30.0672 25.5221 30.8313 24.7313 30.269L16.5664 24.4628C16.2139 24.2121 15.7382 24.2129 15.3865 24.4647L7.30746 30.2505Z"
              fill={star <= rating ? '#008660' : '#C2C4C8'}
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
