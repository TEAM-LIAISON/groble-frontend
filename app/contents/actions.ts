"use server";

import {
  registerContent,
  registerContentResponse,
  saveDraft,
  saveDraftResponse,
  uploadContentThumbnail,
} from "@/lib/api";
import { contentCookie } from "@/lib/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function saveDraftAction(
  _: saveDraftResponse | null,
  formData: FormData,
) {
  const cookieStore = await cookies();
  const contentId =
    (formData.get("content-id") as string | null) ??
    cookieStore.get("Content-ID")?.value;
  const title =
    (formData.get("title") as string | null) ??
    cookieStore.get("Content-Title")?.value;
  const contentType =
    (formData.get("content-type") as string | null) ??
    cookieStore.get("Content-Type")?.value;
  const categoryId =
    (formData.get("category-id") as string | null) ??
    cookieStore.get("Content-Category-ID")?.value;
  const thumbnailUrl =
    (formData.get("thumbnail-url") as string | null) ??
    cookieStore.get("Content-Thumbnail-URL")?.value;
  const coachingOptions =
    (formData.get("coaching-options") as string | null) ??
    cookieStore.get("Content-Coaching-Options")?.value;
  const documentOptions =
    (formData.get("document-options") as string | null) ??
    cookieStore.get("Content-Document-Options")?.value;
  const serviceTarget =
    (formData.get("service-target") as string | null) ??
    cookieStore.get("Content-Service-Target")?.value;
  const serviceProcess =
    (formData.get("service-process") as string | null) ??
    cookieStore.get("Content-Service-Process")?.value;
  const makerIntro =
    (formData.get("maker-intro") as string | null) ??
    cookieStore.get("Content-Maker-Intro")?.value;
  const response = await saveDraft({
    contentId: contentId ? Number(contentId) : undefined,
    title,
    contentType,
    categoryId: categoryId ? Number(categoryId) : undefined,
    thumbnailUrl,
    coachingOptions: coachingOptions ? JSON.parse(coachingOptions) : undefined,
    documentOptions: documentOptions ? JSON.parse(documentOptions) : undefined,
    serviceTarget,
    serviceProcess,
    makerIntro,
  });

  return response;
}

export async function saveThumbnailAction(formData: FormData) {
  (await cookies()).set(
    "Content-Thumbnail-URL",
    formData.get("thumbnail-url") as string,
    contentCookie,
  );

  redirect("/contents?form=basic-information");
}

export async function saveBasicInformationAction(formData: FormData) {
  (await cookies()).set(
    "Content-Title",
    formData.get("title") as string,
    contentCookie,
  );
  (await cookies()).set(
    "Content-Type",
    formData.get("content-type") as string,
    contentCookie,
  );
  (await cookies()).set(
    "Content-Category-ID",
    formData.get("category-id") as string,
    contentCookie,
  );

  redirect("/contents?form=pricing-settings");
}

export async function savePricingSettingsAction(formData: FormData) {
  (await cookies()).set(
    "Sign-Up-Password",
    formData.get("password") as string,
    contentCookie,
  );

  redirect("/contents?form=service-introduction");
}

export async function saveServiceIntroductionAction(formData: FormData) {
  (await cookies()).set(
    "Sign-Up-Password",
    formData.get("password") as string,
    contentCookie,
  );

  redirect("/contents?form=detailed-descriptions");
}

export async function saveDetailedDescriptionsAction(formData: FormData) {
  (await cookies()).set(
    "Sign-Up-Password",
    formData.get("password") as string,
    contentCookie,
  );

  redirect("/contents?form=review-process-information");
}

export async function registerContentAction(
  _: registerContentResponse | null,
  formData: FormData,
) {
  const cookieStore = await cookies();
  const response = await registerContent({
    title: cookieStore.get("Content-Title")?.value!,
    contentType: cookieStore.get("Content-Type")?.value!,
    categoryId: Number(cookieStore.get("Content-Category-ID")?.value!),
    thumbnailUrl: cookieStore.get("Content-Thumbnail-URL")?.value!,
    coachingOptions: JSON.parse(
      cookieStore.get("Content-Coaching-Options")?.value!,
    ),
    documentOptions: JSON.parse(
      cookieStore.get("Content-Document-Options")?.value!,
    ),
    serviceTarget: cookieStore.get("Content-Service-Target")?.value!,
    serviceProcess: cookieStore.get("Content-Service-Process")?.value!,
    makerIntro: cookieStore.get("Content-Maker-Intro")?.value!,
  });

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
