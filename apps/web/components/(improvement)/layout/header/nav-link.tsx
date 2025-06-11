"use client";

import { twMerge } from "@/lib/tailwind-merge";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

/**
 * 네비게이션 링크 컴포넌트
 * 활성화된 링크에는 하단 보더와 색상 강조 표시
 */
export default function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        "relative px-6 py-[21px] text-body-1-normal font-medium text-label-assistive transition-colors",
        active && "border-b border-black text-label-normal",
        active &&
          "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-black",
      )}
    >
      {children}
    </Link>
  );
}
