import { createArray, getRandomArrayElement } from "~/lib/utils";

export type TGameBoard = number[][];

export const getRandomEmptyTile = (gameBoard: TGameBoard) => {
  const emptyTiles: [number, number][] = [];

  gameBoard.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) {
        emptyTiles.push([i, j]);
      }
    });
  });

  return emptyTiles.length > 0 ? getRandomArrayElement(emptyTiles) : null;
};

export const createNewTile = (gameBoard: TGameBoard) => {
  const emptyTile = getRandomEmptyTile(gameBoard);
  if (!emptyTile) {
    throw new Error("Something went wrong - no init empty tiles");
  }

  const [x, y] = emptyTile;

  if (gameBoard[x]?.[y] !== undefined) {
    /**
     * number 2 - 75%
     * number 4 - 25%
     */
    gameBoard[x][y] = getRandomArrayElement([2, 2, 2, 4]);
    return gameBoard;
  }

  throw new Error("Something went wrong - empty tile is not empty");
};

export const createGameBoard = (size: number): TGameBoard => {
  return createArray(size).map(() => createArray(size).map(() => 0));
};
