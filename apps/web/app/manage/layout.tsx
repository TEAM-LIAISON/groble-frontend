import { createMetadata } from '@/lib/utils/metadata';
import { getTitleForRoute } from '@/lib/utils/page-titles';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const searchParams = headersList.get('x-search-params');

  let parsedSearchParams: Record<string, string | string[] | undefined> = {};
  if (searchParams) {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}${pathname}?${searchParams}`);
      parsedSearchParams = Object.fromEntries(url.searchParams.entries());
    } catch (error) {
      console.error('Error parsing search params:', error);
    }
  }

  const title = getTitleForRoute(pathname, parsedSearchParams);

  return createMetadata({
    title,
    path: pathname,
    useTemplate: false,
  });
}

export default function ManageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
