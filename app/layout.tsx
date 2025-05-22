import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import Footer from "@/components/footer/index";
import { Providers } from "./providers";
import "./globals.css";
import WebHeader from "@/components/header/index";

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
          <WebHeader />
          <main className="min-h-[calc(100vh-66px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
