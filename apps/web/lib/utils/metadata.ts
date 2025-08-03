import {
  BASE_SITE_DESCRIPTION,
  BASE_SITE_TITLE,
  BASE_SITE_URL,
} from '@/lib/utils/seo';
// src/lib/utils/metadata.ts
import type { Metadata } from 'next';

interface Params {
  title: string;
  description?: string;
  path?: string;
  images?: { url: string; alt: string }[];
}

export const createMetadata = ({
  title,
  description = BASE_SITE_DESCRIPTION,
  path = '',
  images = [{ url: `${BASE_SITE_URL}/og-image.png`, alt: BASE_SITE_TITLE }],
}: Params): Metadata => {
  const url = `${BASE_SITE_URL}${path}`;

  return {
    metadataBase: BASE_SITE_URL ? new URL(BASE_SITE_URL) : undefined,
    title: {
      default: title,
      template: `%s | ${BASE_SITE_TITLE}`,
    },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BASE_SITE_TITLE,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    robots: { index: true, follow: true },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };
};
