import { twMerge } from "@/lib/tailwind-merge";
import { ComponentPropsWithRef } from "react";

export default function Checkbox({
  className,
  ...props
}: ComponentPropsWithRef<"input">) {
  return (
    <label className="group inline-block has-disabled:cursor-not-allowed">
      <input
        type="checkbox"
        className={twMerge("hidden", className)}
        {...props}
      />
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-opacity group-has-checked:opacity-0"
      >
        <rect x="1" y="0.5" width="19" height="19" rx="9.5" fill="white" />
        <rect x="1" y="0.5" width="19" height="19" rx="9.5" stroke="#C2C4C8" />
        <path
          d="M5.5 10.5L9 14L15.5 6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 opacity-0 transition-opacity group-has-checked:opacity-100"
      >
        <rect x="0.5" width="20" height="20" rx="10" fill="#008660" />
        <path
          d="M5.5 10.5L9 14L14.5 7"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
}
