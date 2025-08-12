// src/shared/constants/seo.ts
export const BASE_SITE_TITLE = '그로블(groble)';
export const BASE_SITE_DESCRIPTION =
  '전자 문서 노하우 마켓, 다양한 템플릿·서비스을 제공합니다.';
export const BASE_SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL;

export const DEFAULT_KEYWORDS = [
  '그로블',
  'groble',
  '전자문서',
  '템플릿',
  '서비스',
  '마켓',
];

export const AUTHOR_NAME = '리에종';
export const STATIC_PAGES = ['/', '/category/document', '/category/coach'];
