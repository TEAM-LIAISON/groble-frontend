"use client";

import Image from "next/image";
import { twMerge } from "@/lib/tailwind-merge";

type LogoVariant = "default" | "row";

interface GrobalLogoProps {
  variant?: LogoVariant;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  priority?: boolean;
}

const logoSrcMap: Record<LogoVariant, string> = {
  default: "/assets/logos/groble.svg",
  row: "/assets/logos/groble-row.svg",
};

export function GrobleLogo({
  variant = "default",
  width = 120,
  height = 36,
  alt = "Grobal Logo",
  className,
  priority = true,
}: GrobalLogoProps) {
  const src = logoSrcMap[variant];

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={twMerge("object-contain", className)}
      priority={priority}
    />
  );
}
