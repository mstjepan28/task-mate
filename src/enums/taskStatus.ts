export const TaskStatus = {
  PENDING: "PENDING",
  STARTED: "STARTED",
  CANCELED: "CANCELED",
  DONE: "DONE",
  FAILED: "FAILED",
} as const;

export type TTaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
