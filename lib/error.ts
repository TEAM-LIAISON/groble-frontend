import { useEffect } from "react";
import { toast } from "sonner";

export function useToastErrorMessage(response: any) {
  useEffect(() => {
    if (response && 500 <= response.status && response.status <= 599) {
      toast(
        response.data?.message ??
          "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
  }, [response]);
}

export function getFieldErrorMessage(response: any, field: string) {
  if (response && 400 <= response.status && response.status <= 499) {
    const defaultMessages = response.data.errors
      ? Array.from(
          response.data.errors
            .filter((error: any) => error.field == field)
            .map((error: any) => error.defaultMessage),
        )
      : [response.data.message];

    if (defaultMessages.length >= 1) return defaultMessages.join(" ");
  }
}
