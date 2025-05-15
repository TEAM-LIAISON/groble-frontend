"use client";

import { Providers } from "@/app/providers";
import { Toaster } from "sonner";
import Header from "@/components/header/index";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <style jsx global>{`
        header {
          position: relative !important;
        }
      `}</style>
      {children}
    </>
  );
}
