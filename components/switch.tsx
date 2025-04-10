"use client";

import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

export default function Switch({
  className,
  ...props
}: ComponentPropsWithRef<"input">) {
  return (
    <label className="group inline-block">
      <input
        type="checkbox"
        className={twMerge("hidden", className)}
        {...props}
      />
      <svg
        width="36"
        height="20"
        viewBox="0 0 36 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          width="36"
          height="20"
          rx="10"
          className="fill-component-fill-strong transition-[fill] group-has-checked:fill-primary-sub-1"
        />
        <rect
          y="2"
          width="16"
          height="16"
          rx="8"
          fill="white"
          className="transition-[x] [x:2px] group-has-checked:[x:18px]"
        />
      </svg>
    </label>
  );
}
