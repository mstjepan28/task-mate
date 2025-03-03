import type { TMoveEvent } from "./types";

export const useKeyboardControls = (moveCallbacks: Record<TMoveEvent, () => void>) => {
  return {
    tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          moveCallbacks.onMoveUp();
          break;
        case "ArrowDown":
          moveCallbacks.onMoveDown();
          break;
        case "ArrowLeft":
          moveCallbacks.onMoveLeft();
          break;
        case "ArrowRight":
          moveCallbacks.onMoveRight();
          break;
        default:
          break;
      }
    },
  } satisfies Partial<React.HTMLAttributes<HTMLDivElement>>;
};
