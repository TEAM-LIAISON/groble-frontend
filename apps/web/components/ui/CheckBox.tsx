// components/Checkbox.tsx
"use client";

import { useId } from "react";

type CheckboxSize = "small" | "medium" | "large";

interface CheckboxProps {
  /** 선택된 상태인지 (true = 체크됨) */
  selected: boolean;
  /** 비활성화 상태인지 */
  disabled?: boolean;
  /** 크기: small | medium | large */
  size?: CheckboxSize;
  /** 옆에 표시할 라벨 텍스트 */
  label?: string;
  /** 체크/언체크 상태가 바뀔 때 호출되는 콜백 */
  onChange: (checked: boolean) => void;
}

export default function Checkbox({
  selected,
  disabled = false,
  size = "medium",
  label = "",
  onChange,
}: CheckboxProps) {
  // 고유 ID 생성 (input과 label을 연결하기 위해)
  const id = useId();

  /**
   * size별로 TailwindCSS 클래스 매핑
   * - small: 1rem(16px) → w-4 h-4
   * - medium: 1.25rem(20px) → w-5 h-5
   * - large: 1.5rem(24px) → w-6 h-6
   */
  const sizeMap: Record<CheckboxSize, { boxClass: string; textClass: string }> =
    {
      small: {
        boxClass: "w-4 h-4", // 16px × 16px
        textClass: "text-sm",
      },
      medium: {
        boxClass: "w-5 h-5", // 20px × 20px
        textClass: "text-base",
      },
      large: {
        boxClass: "w-6 h-6", // 24px × 24px
        textClass: "text-lg",
      },
    };

  const { boxClass, textClass } = sizeMap[size];

  /**
   * SVG 아이콘들 (size는 CSS로 제어)
   *  - checkedLargeSVG: 체크된 상태의 Large 버전
   *  - uncheckedLargeSVG: 체크되지 않은 상태의 Large 버전
   *
   * disabled 상태일 때 컬러는 CSS 변수 또는 fallback 컬러를 그대로 사용합니다.
   */
  const CheckedSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${boxClass}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      {disabled ? (
        <>
          {/* Disabled & Checked */}
          <rect
            width="24"
            height="24"
            rx="12"
            fill="var(--Interaction-Disable, #F7F7F8)"
          />
          <path
            d="M6 12.8441L9.95599 16.8001L17.3028 7.75781"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          {/* Enabled & Checked */}
          <rect width="24" height="24" rx="12" fill="#008660" />
          <path
            d="M6 12.8441L9.95599 16.8001L17.3028 7.75781"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );

  const UncheckedSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${boxClass}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      {disabled ? (
        <>
          {/* Disabled & Unchecked */}
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="23"
            rx="11.5"
            fill="var(--Interaction-Disable, #F7F7F8)"
          />
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="23"
            rx="11.5"
            stroke="var(--Line-Neutral, #EAEBEC)"
            strokeWidth="1"
          />
          {/* 체크 부분 path는 흰색으로 그렸지만, 배경색과 같아서 보이지 않음 */}
          <path
            d="M7 12.5L10.5 16L17 8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          {/* Enabled & Unchecked */}
          <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white" />
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="23"
            rx="11.5"
            stroke="#C2C4C8"
            strokeWidth="1"
          />
          {/* 체크 path는 흰색이므로 보이지 않음 (단순 클릭 영역 확보용) */}
          <path
            d="M7 12.5L10.5 16L17 8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );

  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      {/* 숨겨진 실제 checkbox input */}
      <input
        id={id}
        type="checkbox"
        checked={selected}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      {/* 커스텀 SVG 렌더링 */}
      <div className={`${boxClass} flex items-center justify-center`}>
        {selected ? CheckedSVG : UncheckedSVG}
      </div>

      {/* 선택 시 여백 조절: 체크박스 크기 + 0.5rem */}
      {label && (
        <span className={`ml-2 select-none ${textClass} text-gray-900`}>
          {label}
        </span>
      )}
    </label>
  );
}
