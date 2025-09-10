'use client';

import type { ButtonHTMLAttributes, MouseEvent } from "react";

interface KBAuthMarkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  popupHeight?: number;
  popupWidth?: number;
}

export default function KBAuthMark({
  popupHeight = 604,
  popupWidth = 648,
  className,
  ...props
}: KBAuthMarkProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    window.open('https://okbfex.kbstar.com/quics?page=C021590&cc=b034066%3Ab035526&mHValue=9ab557807beadc991dfde9d3ebf6c1f8#loading', '_blank', `height=${popupHeight}, width=${popupWidth}, status=yes, toolbar=no, menubar=no, location=no`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`bg-background-alternative border-0 p-0 cursor-pointer ${className}`}
      aria-label="KB 에스크로 인증마크"
      {...props}
    >
      <img
        src="/third-party/escrowcmark.png"
        alt="KB 에스크로 인증마크"
        width={36}
        height={36}
      />
    </button>
  );
}
