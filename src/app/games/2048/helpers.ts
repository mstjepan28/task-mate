import { createArray, getRandomArrayElement } from "~/lib/utils";
import type { TGameBoard, TMoveEventHandler } from "./types";

const EMPTY = undefined;

// const gameBoard: TGameBoard = [
//   [EMPTY, EMPTY, EMPTY, EMPTY],
//   [EMPTY, EMPTY, EMPTY, EMPTY],
//   [EMPTY, EMPTY, EMPTY, EMPTY],
//   [EMPTY, EMPTY, EMPTY, EMPTY],
// ];

export const createGameBoard = (size: number): TGameBoard => {
  const initBoard = createArray(size).map(() => createArray(size).map(() => EMPTY));
  return createNewTile(initBoard);
};

export const getRandomEmptyTile = (gameBoard: TGameBoard) => {
  const emptyTiles: [number, number][] = [];

  gameBoard.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === EMPTY) {
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

  if (gameBoard[x] === undefined) {
    throw new Error("Something went wrong - missing game board row");
  }

  /**
   * number 2 - 75%
   * number 4 - 25%
   */
  gameBoard[x][y] = getRandomArrayElement([2, 2, 2, 4]);
  return gameBoard;
};

const moveGameObjects = (gameBoard: TGameBoard, row: number, col: number, direction: { x: number; y: number }) => {
  const value = gameBoard[row]?.[col];
  if (!value) {
    return;
  }

  console.log(direction);
};

export const moveHandler: TMoveEventHandler = {
  onMoveUp: (gameBoard: TGameBoard) => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        moveGameObjects(gameBoard, row, col, { x: 0, y: -1 });
      }
    }
  },
  onMoveDown: (gameBoard: TGameBoard) => {
    for (let row = 3; row >= 0; row--) {
      for (let col = 3; col >= 0; col--) {
        moveGameObjects(gameBoard, row, col, { x: 0, y: 1 });
      }
    }
  },
  onMoveLeft: (gameBoard: TGameBoard) => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        moveGameObjects(gameBoard, row, col, { x: -1, y: 0 });
      }
    }
  },
  onMoveRight: (gameBoard: TGameBoard) => {
    for (let row = 3; row >= 0; row--) {
      for (let col = 0; col < 4; col++) {
        moveGameObjects(gameBoard, row, col, { x: 1, y: 0 });
      }
    }
  },
};
