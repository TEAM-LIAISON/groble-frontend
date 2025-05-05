"use client";

import Button from "@/components/button";
import { useActionState } from "react";
import { saveDraftAction } from "./actions";

export const draftFormId = "draft-form";

export default function Draft() {
  const [, formAction, isPending] = useActionState(saveDraftAction, null);

  return (
    <Button
      group="text"
      size="x-small"
      buttonType="button"
      form={draftFormId}
      formAction={formAction}
    >
      {isPending ? "⏳" : "임시 저장"}
    </Button>
  );
}
