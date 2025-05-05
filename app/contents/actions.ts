"use server";

import { registerContent, saveDraft } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function saveDraftAction(_: void | null, formData: FormData) {
  const cookieStore = await cookies();
  const contentId = cookieStore.get("Content-ID")?.value;
  const title = cookieStore.get("Content-Title")?.value;
  const contentType = cookieStore.get("Content-Type")?.value;
  const categoryId = cookieStore.get("Content-Category-ID")?.value;
  const thumbnailUrl = cookieStore.get("Content-Thumbnail-URL")?.value;
  const coachingOptions = cookieStore.get("Content-Coaching-Options")?.value;
  const documentOptions = cookieStore.get("Content-Document-Options")?.value;
  const response = await saveDraft({
    contentId: contentId ? Number(contentId) : undefined,
    title,
    contentType,
    categoryId: categoryId ? Number(categoryId) : undefined,
    thumbnailUrl,
    coachingOptions: coachingOptions ? JSON.parse(coachingOptions) : undefined,
    documentOptions: documentOptions ? JSON.parse(documentOptions) : undefined,
  });

  if (response.status != 200)
    redirect(`/error?error=${JSON.stringify(response)}`);
}

export async function saveDetailsAction(formData: FormData) {
  redirect("/contents?form=guidance");
}

export async function registerContentAction(formData: FormData) {
  const response = await registerContent({
    title: "",
    contentType: "",
    categoryId: 0,
    thumbnailUrl: "",
  });

  if (response.status != 200)
    redirect(`/contents?form=guidance&error=${JSON.stringify(response)}`);
  else redirect("/contents");
}
