"use client";

import { ComponentPropsWithRef } from "react";
import { twJoin } from "tailwind-merge";

export default function Button({
  groupVariant = "solid",
  typeVariant = "secondary",
  sizeVariant = "large",
  className,
  children,
  ...props
}: {
  groupVariant?: "solid" | "outlined" | "text";
  typeVariant?: "secondary" | "primary" | "primary-dark";
  sizeVariant?: "large" | "medium" | "small" | "x-small";
} & {} & ComponentPropsWithRef<"button">) {
  return (
    <button
      className={twJoin(
        "flex items-center gap-[4px] rounded-8",

        groupVariant == "solid" &&
          twJoin(
            typeVariant == "secondary" &&
              "bg-component-fill-strong text-label-normal",
            typeVariant == "primary" && "bg-primary-normal text-label-normal",
            typeVariant == "primary-dark" && "bg-primary-sub-1 text-common-100",
          ),

        groupVariant == "outlined" &&
          twJoin(
            "outline-[1.5px] -outline-offset-[1.5px]",
            typeVariant == "secondary" &&
              "text-primary-sub-1 outline-primary-sub-1",
            typeVariant == "primary" &&
              "text-label-normal outline-label-normal",
          ),

        groupVariant == "text" &&
          twJoin(
            typeVariant == "secondary" && "text-primary-sub-1",
            typeVariant == "primary" && "text-label-normal",
            typeVariant == "primary-dark" && "text-label-alternative",
          ),

        sizeVariant == "large" &&
          "px-[20px] py-[18px] text-healine-1 font-semibold",
        sizeVariant == "medium" &&
          "px-[16px] py-[14px] text-healine-1 font-medium",
        sizeVariant == "small" &&
          "px-[16px] py-[12px] text-body-1-normal font-medium",
        sizeVariant == "x-small" &&
          "px-[16px] py-[9px] text-body-2-normal font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
