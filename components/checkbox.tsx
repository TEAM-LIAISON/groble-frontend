"use client";

import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

export default function Checkbox({
  className,
  ...props
}: {} & ComponentPropsWithRef<"input">) {
  return (
    <label className="group inline-block has-disabled:cursor-not-allowed">
      <input
        type="checkbox"
        className={twMerge("hidden", className)}
        {...props}
      />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.4"
          y="0.4"
          width="15.2"
          height="15.2"
          rx="7.6"
          className="fill-common-100 transition-[fill] group-has-checked:fill-primary-sub-1 group-has-disabled:fill-interaction-disable"
        />
        <rect
          x="0.4"
          y="0.4"
          width="15.2"
          height="15.2"
          rx="7.6"
          strokeWidth="0.8"
          className="stroke-label-assistive transition-[stroke] group-has-checked:stroke-transparent group-has-disabled:stroke-line-neutral group-has-disabled:group-has-checked:stroke-transparent"
        />
        <path
          d="M4 8.4001L6.8 11.2001L11.2 5.6001"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-transparent transition-[stroke] group-has-checked:stroke-common-100 group-has-disabled:group-has-checked:stroke-label-disable"
        />
      </svg>
    </label>
  );
}
