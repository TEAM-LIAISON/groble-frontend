import { create } from "zustand";

interface CoachingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  coachingPeriod: string;
  documentProvision: string;
  coachingType: string;
  coachingTypeDescription: string;
}

interface DocumentOption {
  id: string;
  name: string;
  description: string;
  price: number;
  contentDeliveryMethod: string;
}

interface NewProductState {
  contentId?: number;
  title: string;
  contentType: string;
  categoryId?: number;
  thumbnailUrl: string;
  coachingOptions: CoachingOption[];
  documentOptions: DocumentOption[];
  contentIntroduction: string;
  serviceTarget: string;
  serviceProcess: string;
  makerIntro: string;
  contentDetailImageUrls: string[];
}

interface NewProductActions {
  setThumbnailUrl: (url: string) => void;
  resetThumbnailUrl: () => void;
  setTitle: (title: string) => void;
  setContentType: (type: string) => void;
  setCategoryId: (id: number) => void;
  setContentId: (id: number) => void;
  setCoachingOptions: (options: CoachingOption[]) => void;
  setDocumentOptions: (options: DocumentOption[]) => void;
  resetState: () => void;
}

const initialState: NewProductState = {
  title: "",
  contentType: "COACHING",
  thumbnailUrl: "",
  coachingOptions: [],
  documentOptions: [],
  contentIntroduction: "",
  serviceTarget: "",
  serviceProcess: "",
  makerIntro: "",
  contentDetailImageUrls: [],
};

export const useNewProductStore = create<NewProductState & NewProductActions>(
  (set) => ({
    ...initialState,
    setThumbnailUrl: (url) => set({ thumbnailUrl: url }),
    resetThumbnailUrl: () => set({ thumbnailUrl: "" }),
    setTitle: (title) => set({ title }),
    setContentType: (type) => set({ contentType: type }),
    setCategoryId: (id) => set({ categoryId: id }),
    setContentId: (id) => set({ contentId: id }),
    setCoachingOptions: (options) => set({ coachingOptions: options }),
    setDocumentOptions: (options) => set({ documentOptions: options }),
    resetState: () => set(initialState),
  }),
);
