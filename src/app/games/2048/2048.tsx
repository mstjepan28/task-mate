"use client";

import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { createArray } from "~/lib/utils";
import { type TGameBoard, createGameBoard, createNewTile } from "./helpers";
import { useTouchControls } from "./useTouchControls";

export const Game2048 = () => {
  const [board, setBoard] = useState<TGameBoard>([[]]);
  const touchControls = useTouchControls({
    onMoveUp: () => console.log("onMoveUp"),
    onMoveDown: () => console.log("onMoveDown"),
    onMoveLeft: () => console.log("onMoveLeft"),
    onMoveRight: () => console.log("onMoveRight"),
  });

  const onBoardMount = useCallback(() => {
    const gameBoard = createGameBoard(4);
    const updatedGameBoard = createNewTile(gameBoard);

    setBoard(updatedGameBoard);
  }, []);

  return (
    <div
      ref={onBoardMount}
      {...touchControls}
      className="grid grid-cols-4 grid-rows-4 gap-2 rounded-lg border bg-primary p-2"
    >
      {createArray(4).map((_, i) => {
        return createArray(4).map((_, j) => {
          const key = `${i}-${j}`;
          const value = board[i]?.[j] ?? 0;
          return <Tile key={key} value={value} />;
        });
      })}
    </div>
  );
};

const Tile = ({ value }: { value: number }) => {
  const bgColor = {
    2: "bg-pink-400",
    4: "bg-purple-400",
    8: "bg-blue-400",
    16: "bg-green-400",
    32: "bg-yellow-400",
    64: "bg-orange-400",
    128: "bg-red-400",
    256: "bg-teal-400",
    512: "bg-indigo-400",
    1024: "bg-pink-400",
    2048: "bg-purple-400",
  }[value];

  return (
    <div
      className={twMerge(
        `flex aspect-square size-20 items-center justify-center rounded-lg bg-primary-foreground`,
        bgColor,
      )}
    >
      <span className="text-2xl font-bold text-white">{value || ""}</span>
    </div>
  );
};
