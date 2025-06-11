// File: src/features/products/register/types/store-types.ts

import type {
  ProductContentType,
  ProductOptionType,
} from "@/entities/product/model/product-types";

/** 신규 상품 등록 전체 상태 */
export interface NewProductState {
  contentId?: number;
  title: string;
  contentType: ProductContentType;
  categoryId?: string;
  thumbnailUrl: string;
  coachingOptions: ProductOptionType[];
  documentOptions: ProductOptionType[];
  contentIntroduction: string;
  serviceTarget: string;
  serviceProcess: string;
  makerIntro: string;
  contentDetailImageUrls: string[];
}

/** NewProductState 를 변경하는 액션들 */
export interface NewProductActions {
  setContentId: (id: number) => void;
  setTitle: (title: string) => void;
  setContentType: (type: ProductContentType) => void;
  setCategoryId: (id: string) => void;
  setThumbnailUrl: (url: string) => void;
  setCoachingOptions: (opts: ProductOptionType[]) => void;
  setDocumentOptions: (opts: ProductOptionType[]) => void;
  setContentIntroduction: (text: string) => void;
  setServiceTarget: (text: string) => void;
  setServiceProcess: (text: string) => void;
  setMakerIntro: (text: string) => void;
  setContentDetailImageUrls: (urls: string[]) => void;
  reset: () => void;
}
