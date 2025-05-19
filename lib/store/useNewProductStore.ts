import { create } from "zustand";

interface CoachingOption {
  optionId: string | number;
  name: string;
  description: string;
  price: number;
  coachingPeriod: "ONE_DAY" | "TWO_TO_SIX_DAYS" | "MORE_THAN_ONE_WEEK";
  documentProvision: "PROVIDED" | "NOT_PROVIDED";
  coachingType: "ONLINE" | "OFFLINE";
  coachingTypeDescription: string;
}

interface DocumentOption {
  optionId: string | number;
  name: string;
  description: string;
  price: number;
  contentDeliveryMethod: string | null;
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
  setContentIntroduction: (text: string) => void;
  setServiceTarget: (text: string) => void;
  setServiceProcess: (text: string) => void;
  setMakerIntro: (text: string) => void;
  setContentDetailImageUrls: (urls: string[]) => void;
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
    setContentIntroduction: (text) => set({ contentIntroduction: text }),
    setServiceTarget: (text) => set({ serviceTarget: text }),
    setServiceProcess: (text) => set({ serviceProcess: text }),
    setMakerIntro: (text) => set({ makerIntro: text }),
    setContentDetailImageUrls: (urls) => set({ contentDetailImageUrls: urls }),
    resetState: () => set(initialState),
  }),
);
