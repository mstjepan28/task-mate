export type TGameBoard = Array<number | undefined>[];

export type TMoveEvent = "onMoveUp" | "onMoveDown" | "onMoveLeft" | "onMoveRight";
type TEventHandlerCallback = (gameBoard: TGameBoard) => void;

export type TMoveEventHandler = Record<TMoveEvent, TEventHandlerCallback>;
