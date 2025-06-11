"use client";

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
