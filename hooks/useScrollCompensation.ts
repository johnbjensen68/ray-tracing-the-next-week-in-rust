import { useRef } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useScrollCompensation() {
  const compensateScrollCallback = useRef<(() => void) | undefined>(undefined);

  const pinnedElement = useRef<HTMLElement | undefined>(undefined);

  const pinElementToViewport = (element: HTMLElement) => {
    const top = element.getBoundingClientRect().top;
    pinnedElement.current = element;

    compensateScrollCallback.current = () => {
      const newTop = pinnedElement.current!.getBoundingClientRect().top;
      pinnedElement.current = undefined;
      compensateScrollCallback.current = undefined;

      const diff = newTop - top;
      if (diff) {
        window.scrollBy({ left: 0, top: diff });
      }
    };
  };

  useIsomorphicLayoutEffect(() => {
    if (compensateScrollCallback.current) {
      queueMicrotask(() => compensateScrollCallback.current!());
    }
  });

  return pinElementToViewport;
}
