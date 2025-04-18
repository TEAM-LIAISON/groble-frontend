import { useEffect, useState } from "react";

export function useVirtualKeyboardOpen() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if ("virtualKeyboard" in navigator) {
      // @ts-expect-error
      navigator.virtualKeyboard.overlaysContent = true;

      // @ts-expect-error
      navigator.virtualKeyboard.addEventListener("geometrychange", (event) => {
        const { width, height } = event.target.boundingRect;

        setOpen(width > 0 && height > 0);
      });
    }
  }, []);

  return open;
}
