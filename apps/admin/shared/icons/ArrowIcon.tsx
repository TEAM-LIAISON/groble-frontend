// File: /apps/admin/shared/icons/ArrowIcon.tsx

type ArrowIconProps = {
  direction: 'up' | 'down' | 'left' | 'right';
};

export default function ArrowIcon({ direction }: ArrowIconProps) {
  const path = {
    up: 'M7 14L12 9L17 14', // ↑
    down: 'M7 10L12 15L17 10', // ↓
    left: 'M14 7L9 12L14 17', // ←
    right: 'M10 7L15 12L10 17', // →
  };

  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={path[direction]}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
