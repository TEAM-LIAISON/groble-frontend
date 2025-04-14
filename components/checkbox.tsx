"use client";

import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

export default function Checkbox({
  className,
  ...props
}: {} & ComponentPropsWithRef<"input">) {
  return (
    <input
      type="checkbox"
      className={twMerge(
        "h-[24px] w-[24px] appearance-none rounded-full border-1 border-none outline-1 -outline-offset-1 outline-label-assistive transition-colors disabled:cursor-not-allowed",
        "checked:bg-primary-sub-1 checked:bg-[url(data:image/svg+xml,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%205.84408L4.95599%209.80007L12.3028%200.757812%22%20stroke%3D%22white%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E)] checked:bg-center checked:bg-no-repeat checked:outline-0",
        "disabled:bg-interaction-disable disabled:outline-line-neutral disabled:checked:bg-[url(data:image/svg+xml,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%205.84408L4.95599%209.80007L12.3028%200.757812%22%20stroke%3D%22%23DBDCDF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E)]",
        className,
      )}
      {...props}
    />
  );
}
