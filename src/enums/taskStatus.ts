export const TaskStatus = {
  PENDING: "pending",
  STARTED: "started",
  CANCELED: "canceled",
  DONE: "done",
} as const;

export type TTaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
