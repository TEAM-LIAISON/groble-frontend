"use client";

import { Button } from "@groble/ui";
import { useToastErrorMessage } from "@/lib/error";
import { useActionState } from "react";
import { saveDraftAction } from "./actions";

export const formId = "form";

export default function Draft({
  setDraftId,
}: {
  setDraftId?: (draftId: string) => void;
}) {
  const [response, formAction, isPending] = useActionState(
    saveDraftAction,
    null,
  );
  useToastErrorMessage(response);

  return (
    <Button group="text" size="x-small" form={formId} formAction={formAction}>
      {isPending ? "⏳" : "임시 저장"}
    </Button>
  );
}
