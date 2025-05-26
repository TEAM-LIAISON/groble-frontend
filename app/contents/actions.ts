"use server";

import {
  CoachingOptionDraftRequest,
  ContentRegisterRequest,
  DocumentOptionDraftRequest,
  getMySellingContents,
  registerContent,
  registerContentResponse,
  saveDraft,
  saveDraftResponse,
  uploadContentThumbnail,
} from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface DraftRequestCookie {
  contentId?: number;
  title?: string;
  contentType?: string;
  categoryId?: number;
  thumbnailUrl?: string;
  coachingOptions?: CoachingOptionDraftRequest[];
  documentOptions?: DocumentOptionDraftRequest[];
  contentIntroduction?: string;
  contentDetailImageUrls?: string[];
  serviceTarget?: string;
  serviceProcess?: string;
  makerIntro?: string;
}

export async function getDraft() {
  return JSON.parse(
    (await cookies()).get("Draft")?.value ?? "{}",
  ) as DraftRequestCookie;
}

export async function setDraft(requestCookie: DraftRequestCookie) {
  (await cookies()).set("Draft", JSON.stringify(requestCookie), {
    secure: true,
    httpOnly: false,
    sameSite: "none",
    maxAge: 60 * 60 * 24,
  });
}

export async function updateDraft(requestCookie: DraftRequestCookie) {
  await setDraft({ ...(await getDraft()), ...requestCookie });
}

export async function deleteDraft() {
  (await cookies()).delete("Draft");
}

export async function saveDraftAction(
  _: saveDraftResponse | null,
  formData: FormData,
) {
  const draft = await getDraft();
  const contentId =
    typeof formData.get("content-id") == "string"
      ? Number(formData.get("content-id"))
      : draft.contentId;
  const title = (formData.get("title") as string | null) ?? draft.title;
  const contentType =
    (formData.get("content-type") as string | null) ?? draft.contentType;
  const categoryId =
    (formData.get("category-id") as string | null) ?? draft.contentId;
  const thumbnailUrl =
    (formData.get("thumbnail-url") as string | null) ?? draft.thumbnailUrl;
  const coachingOptions =
    (formData.get("coaching-options") as string | null) ??
    draft.coachingOptions;
  const documentOptions =
    (formData.get("document-options") as string | null) ??
    draft.documentOptions;
  const serviceTarget =
    (formData.get("service-target") as string | null) ?? draft.serviceTarget;
  const serviceProcess =
    (formData.get("service-process") as string | null) ?? draft.serviceProcess;
  const makerIntro =
    (formData.get("maker-intro") as string | null) ?? draft.makerIntro;
  const response = await saveDraft({
    contentId: contentId,
    title,
    contentType,
    categoryId: categoryId ? Number(categoryId) : undefined,
    thumbnailUrl,
    // coachingOptions: coachingOptions,
    // documentOptions: documentOptions,
    serviceTarget,
    serviceProcess,
    makerIntro,
  });

  return response;
}

export async function saveThumbnailAction(formData: FormData) {
  // (await cookies()).set(
  //   "Content-Thumbnail-URL",
  //   formData.get("thumbnail-url") as string,
  //   contentCookie,
  // );

  redirect("/contents?form=basic-information");
}

export async function saveBasicInformationAction(formData: FormData) {
  // (await cookies()).set(
  //   "Content-Title",
  //   formData.get("title") as string,
  //   contentCookie,
  // );
  // (await cookies()).set(
  //   "Content-Type",
  //   formData.get("content-type") as string,
  //   contentCookie,
  // );
  // (await cookies()).set(
  //   "Content-Category-ID",
  //   formData.get("category-id") as string,
  //   contentCookie,
  // );

  redirect("/contents?form=pricing-settings");
}

export async function savePricingSettingsAction(formData: FormData) {
  // (await cookies()).set(
  //   "Sign-Up-Password",
  //   formData.get("password") as string,
  //   contentCookie,
  // );

  redirect("/contents?form=service-introduction");
}

export async function saveServiceIntroductionAction(formData: FormData) {
  // (await cookies()).set(
  //   "Sign-Up-Password",
  //   formData.get("password") as string,
  //   contentCookie,
  // );

  redirect("/contents?form=detailed-descriptions");
}

export async function saveDetailedDescriptionsAction(formData: FormData) {
  // (await cookies()).set(
  //   "Sign-Up-Password",
  //   formData.get("password") as string,
  //   contentCookie,
  // );

  redirect("/contents?form=review-process-information");
}

export async function registerContentAction(
  _: registerContentResponse | null,
  formData: FormData,
) {
  const draft = await getDraft();
  const response = await registerContent(draft as ContentRegisterRequest);

  if (response.status != 200) return response;

  redirect("/contents");
}

export async function uploadContentThumbnailAction(file: File) {
  const response = await uploadContentThumbnail(
    { file },
    // @ts-expect-error
    {},
  );

  return response;
}

export async function getMySellingContentsAction({
  cursor,
  size,
  state,
  type,
}: {
  cursor?: string;
  size: number;
  state: string;
  type: string;
}) {
  const response = await getMySellingContents({
    // @ts-expect-error
    cursor,
    size,
    state,
    type,
  });

  return response;
}
