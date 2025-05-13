import type { Metadata } from "next";
import localFont from "next/font/local";
import { unstable_ViewTransition as ViewTransition } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const pretendardVariable = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard-variable",
});

export const metadata: Metadata = {
  title: {
    default: "Groble",
    template: "%s - Groble",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendardVariable.variable} antialiased`}>
        <Toaster />
        <ViewTransition>{children}</ViewTransition>
      </body>
    </html>
  );
}
