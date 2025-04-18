import { twMerge } from "@/lib/tailwind-merge";
import { ComponentPropsWithRef } from "react";

export default function Switch({
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
          className="fill-component-fill-strong transition-[fill] group-has-checked:fill-primary-sub-1 group-has-disabled:fill-label-disable group-has-disabled:group-has-checked:fill-label-disable"
        />
        <rect
          y="2"
          width="16"
          height="16"
          rx="8"
          className="fill-common-100 transition-[x] [x:2px] group-has-checked:[x:18px] group-has-disabled:fill-background-alternative group-has-disabled:group-has-checked:fill-background-alternative"
        />
      </svg>
    </label>
  );
}
