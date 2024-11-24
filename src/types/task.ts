import type { TRepeatCycle } from "~/enums/repeatCycle";
import type { TTaskStatus } from "~/enums/taskStatus";

export type Task = {
  id: string;
  points: number;
  description: string;
  repeatCycle: TRepeatCycle;
  status: TTaskStatus;
  deadline: Date;
  assignedBy: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export type NewTask = Omit<Task, "id" | "createdAt" | "updatedAt" | "deletedAt">;
