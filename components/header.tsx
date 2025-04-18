"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Back from "./icons/back";

export default function Header({
  leftIcons,
  text,
  rightIcons,
}: {
  leftIcons?: ReactNode;
  text?: string;
  rightIcons?: ReactNode;
}) {
  return (
    <header className="flex min-h-[60px] items-center justify-between px-3 py-2">
      <div className="flex items-center">{leftIcons}</div>
      <span>{text}</span>
      <div className="flex items-center">{rightIcons}</div>
    </header>
  );
}

export function BackButton() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      <Back />
    </button>
  );
}
