// File: src/lib/store/useNewProductStore.ts
import { create } from 'zustand';

export interface CoachingOption {
  optionId: number;
  name: string;
  description: string;
  price: number;
}

export interface DocumentOption {
  optionId: number;
  name: string;
  description: string;
  price: number;

  documentFileUrl?: string | null;
  documentLinkUrl?: string | null;
}

export interface NewProductState {
  contentId?: number;
  title: string;
  contentType: 'COACHING' | 'DOCUMENT';
  categoryId?: string;
  thumbnailUrl: string;
  coachingOptions: CoachingOption[];
  documentOptions: DocumentOption[];
  contentIntroduction: string;
  serviceTarget: string;
  serviceProcess: string;
  makerIntro: string;
  contentDetailImageUrls: string[];
}

export interface NewProductActions {
  setThumbnailUrl: (url: string) => void;
  resetThumbnailUrl: () => void;
  setTitle: (title: string) => void;
  setContentType: (type: 'COACHING' | 'DOCUMENT') => void;
  setCategoryId: (id: string) => void;
  setContentId: (id: number) => void;
  setCoachingOptions: (options: CoachingOption[]) => void;
  setDocumentOptions: (options: DocumentOption[]) => void;
  setContentIntroduction: (text: string) => void;
  setServiceTarget: (text: string) => void;
  setServiceProcess: (text: string) => void;
  setMakerIntro: (text: string) => void;
  setContentDetailImageUrls: (urls: string[]) => void;
  resetState: () => void;
}

export const initialState: NewProductState = {
  title: '',
  contentType: 'COACHING',
  thumbnailUrl: '',
  coachingOptions: [
    {
      optionId: Date.now(),
      name: '',
      description: '',
      price: 0,
    },
  ],
  documentOptions: [
    {
      optionId: Date.now() + 1,
      name: '',
      description: '',
      price: 0,
      documentFileUrl: null,
      documentLinkUrl: null,
    },
  ],
  contentIntroduction: '',
  serviceTarget: '',
  serviceProcess: '',
  makerIntro: '',
  contentDetailImageUrls: [],
};

export const useNewProductStore = create<NewProductState & NewProductActions>(
  (set) => ({
    ...initialState,
    setThumbnailUrl: (url) => set({ thumbnailUrl: url }),
    resetThumbnailUrl: () => set({ thumbnailUrl: '' }),
    setTitle: (title) => set({ title }),
    setContentType: (type) => set({ contentType: type }),
    setCategoryId: (id) => set({ categoryId: id }),
    setContentId: (id) => set({ contentId: id }),
    setCoachingOptions: (options) => set({ coachingOptions: options }),
    setDocumentOptions: (options) => set({ documentOptions: options }),
    setContentIntroduction: (text) => set({ contentIntroduction: text }),
    setServiceTarget: (text) => set({ serviceTarget: text }),
    setServiceProcess: (text) => set({ serviceProcess: text }),
    setMakerIntro: (text) => set({ makerIntro: text }),
    setContentDetailImageUrls: (urls) => set({ contentDetailImageUrls: urls }),
    resetState: () => set(initialState),
  })
);
