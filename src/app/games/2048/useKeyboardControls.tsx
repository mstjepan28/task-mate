import type { TMoveEvents } from "./types";

export const useKeyboardControls = (moveCallbacks: TMoveEvents) => {
  return {
    tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      const { onMoveUp, onMoveDown, onMoveLeft, onMoveRight } = moveCallbacks;
      switch (e.key) {
        case "ArrowUp":
          onMoveUp();
          break;
        case "ArrowDown":
          onMoveDown();
          break;
        case "ArrowLeft":
          onMoveLeft();
          break;
        case "ArrowRight":
          onMoveRight();
          break;
        default:
          break;
      }
    },
  } satisfies Partial<React.HTMLAttributes<HTMLDivElement>>;
};
