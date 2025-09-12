import { createMetadata } from '@/lib/utils/metadata';
import { generatePageTitle } from '@/lib/utils/page-titles';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  const title = generatePageTitle(pathname);

  return createMetadata({
    title,
    path: pathname,
    useTemplate: false,
  });
}

export default function SettlementsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
