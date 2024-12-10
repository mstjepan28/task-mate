export type TGameBoard = number[][];

export type TMoveEvents = {
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
};
