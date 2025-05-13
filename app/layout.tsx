import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import Header from "@/components/header/index";
import { Providers } from "./providers";
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
        <Providers>
          <Toaster />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
