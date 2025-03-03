import { useRef } from "react";
import type { TMoveEvent } from "./types";

export const useTouchControls = (moveCallbacks: Record<TMoveEvent, () => void>) => {
  const startPositionRef = useRef({ x: 0, y: 0 });
  const executeMoveRef = useRef<(() => void) | null>(null);

  return {
    onTouchStart: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) {
        console.error("No touch event found");
        return;
      }

      startPositionRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    },
    onTouchMove: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) {
        console.error("No touch event found");
        return;
      }

      const deltaX = touch.clientX - startPositionRef.current.x;
      const deltaY = touch.clientY - startPositionRef.current.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        const { onMoveRight, onMoveLeft } = moveCallbacks;
        executeMoveRef.current = deltaX > 0 ? onMoveRight : onMoveLeft;
      } else {
        const { onMoveDown, onMoveUp } = moveCallbacks;
        executeMoveRef.current = deltaY > 0 ? onMoveDown : onMoveUp;
      }
    },
    onTouchEnd: () => {
      if (typeof executeMoveRef.current === "function") {
        executeMoveRef.current();
      }
    },
  } satisfies Partial<React.HTMLAttributes<HTMLDivElement>>;
};
