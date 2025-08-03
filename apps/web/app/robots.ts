import { BASE_SITE_URL } from '@/lib/utils/seo';
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/login'] }],
    sitemap: `${BASE_SITE_URL}/sitemap.xml`,
    host: BASE_SITE_URL,
  };
}
