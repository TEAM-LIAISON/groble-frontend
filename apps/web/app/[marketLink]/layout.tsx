import { createMetadata } from '@/lib/utils/metadata';
import { generatePageTitle } from '@/lib/utils/page-titles';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { marketLink: string };
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  const title = generatePageTitle(pathname, {
    marketName: params.marketLink,
  });

  return createMetadata({
    title,
    path: pathname,
    useTemplate: false,
  });
}

export default function MarketLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
