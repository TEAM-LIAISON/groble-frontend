import { useEffect, useState } from 'react';

export function useVirtualKeyboardOpen() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let listener = null;

    if ('virtualKeyboard' in navigator) {
      // @ts-expect-error
      navigator.virtualKeyboard.overlaysContent = true;

      listener = (event: Event) => {
        // @ts-expect-error
        const { width, height } = event.target.boundingRect;

        setOpen(width > 0 && height > 0);
      };
      // @ts-expect-error
      navigator.virtualKeyboard.addEventListener('geometrychange', listener);
    }

    return () => {
      if (listener)
        // @ts-expect-error
        navigator.virtualKeyboard.removeEventListener(
          'geometrychange',
          listener
        );
    };
  }, []);

  return open;
}
