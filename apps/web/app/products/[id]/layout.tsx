'use client';

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <style jsx global>{``}</style>
      {children}
    </>
  );
}
