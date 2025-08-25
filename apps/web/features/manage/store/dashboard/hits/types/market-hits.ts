import { PageInfo } from '@/lib/api';

export interface MarketHits {
  totalMarketViews: number;
  totalContentViews: number;
}

export interface MarketHitsContentList {
  items: MarketHitsContent[];
  pageInfo: PageInfo;
}

export interface MarketHitsContent {
  contentId: string;
  contentTitle: string;
  totalViews: number;
}
